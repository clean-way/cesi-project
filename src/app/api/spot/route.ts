import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { Storage } from "@google-cloud/storage";
import { randomUUID } from 'crypto';
import { AccessDifficulties } from '@prisma/client';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({
            message: "Unauthorized"
        }, {
            status: 401
        })
    }
    try {
        const longitude = req.nextUrl.searchParams.get('longitude');
        const latitude = req.nextUrl.searchParams.get('latitude');

        if (!longitude || !latitude) {
            return NextResponse.json({
                message: "Invalid query params"
            }, {
                status: 400
            });
        }

        const longitudeNum = parseFloat(longitude);
        const latitudeNum = parseFloat(latitude);
        const radius = 10; // Rayon en km

        // Requête SQL brute pour trouver les spots dans un rayon de 10 km
        const spots = await prisma.$queryRaw`
        SELECT * FROM (
            SELECT *, 
                (
                    6371 * acos(
                        cos(radians(${latitudeNum})) * 
                        cos(radians(latitude)) * 
                        cos(radians(longitude) - radians(${longitudeNum})) + 
                        sin(radians(${latitudeNum})) * 
                        sin(radians(latitude))
                    )
                ) AS distance 
            FROM "Spot"
        ) AS SpotWithDistance
        WHERE distance <= ${radius}
        ORDER BY distance;
    `;


        return NextResponse.json({
            spots: spots
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Failed to fetch data"
        }, {
            status: 404
        })
    }
}


export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({
            message: "Unauthorized"
        }, {
            status: 401
        });
    }

    // Get file from request
    const formData = await req.formData();

    const name = formData.get('name')?.toString();
    const description = formData.get('description')?.toString();
    const longitude = formData.get('longitude')?.toString();
    const latitude = formData.get('latitude')?.toString();
    const access = formData.get('access')?.toString();
    const file = formData.get('file') as File;
    const trashs = formData.getAll('trashs') as string[];
    console.log(trashs);
    if (!name || !description || !longitude || !latitude || !access || !file || !trashs) {
        console.log(name, description, longitude, latitude, access, file, trashs);
        return NextResponse.json({
            message: "Missing required fields"
        }, {
            status: 400
        });
    }

    const trashsArray = trashs.map((trash) => {
        const trashArray = trash.split(',');
        if (trashArray.length !== 2) {
            return { valid: false, error: "Invalid trashs array format" };
        }
        const quantity = parseInt(trashArray[1]);
        if (isNaN(quantity) || quantity <= 0) {
            return { valid: false, error: "Invalid trash quantity" };
        }
        return {
            valid: true,
            name: trashArray[0],
            quantity: quantity
        };
    });

    for (const trash of trashsArray) {
        if (!trash.valid) {
            return NextResponse.json({
                message: trash.error
            }, {
                status: 400
            });
        }
    }

    if (isNaN(parseFloat(longitude)) || isNaN(parseFloat(latitude)) || parseFloat(longitude) < -180 || parseFloat(longitude) > 180 || parseFloat(latitude) < -90 || parseFloat(latitude) > 90) {
        return NextResponse.json({
            message: "Invalid longitude or latitude"
        }, {
            status: 400
        });
    }

    if (!Object.values(AccessDifficulties).includes(access as AccessDifficulties)) {
        return NextResponse.json({
            message: "Invalid access value"
        }, {
            status: 400
        });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Initialize Google Cloud Storage
    const storage = new Storage({
        keyFilename: "secrets/keyfile.json",
    });
    const filename = randomUUID();

    const bucket = storage.bucket("cleanway-next");
    const blob = bucket.file(`spots/${filename}`);
    
    const stream = blob.createWriteStream({
        resumable: false,
        contentType: file.type,
    });

    stream.on('error', err => {
        console.error('Upload failed:', err);
        return NextResponse.json({
            message: "Failed to upload file"
        }, {
            status: 500
        });
    });

    stream.on('finish', () => {
        console.log('Upload successful');
    });

    stream.end(buffer);

    const spot = await prisma.spot.create({
        data: {
            description,
            longitude: parseFloat(longitude),
            latitude: parseFloat(latitude),
            access : access as AccessDifficulties,
            authorId: session.user.id,
            startPhotoUri: `https://storage.googleapis.com/cleanway-next/spots/${filename}`
        }
    });

    for (const trash of trashsArray) {
            const trashid = await prisma.trash.create({
                data: {
                    name: trash.name!,
                }
            });
            await prisma.spotTrash.create({
                data: {
                    spotId: spot.id,
                    trashId: trashid.id,
                    quantityLeft: trash.quantity!
                }
            });
    }

    return NextResponse.json({
        message: "Spot created and file uploaded",
        spot: spot
    }, {
        status: 201
    });
}