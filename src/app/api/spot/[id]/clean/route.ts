import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/db";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";


export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({
            message: "Unauthorized"
        }, {
            status: 401
        })
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({
                message: "No file found"
            }, {
                status: 400
            });
        }

        //find the spot
        const spot = await prisma.spot.findUnique({
            where: {
                id: params.id as string,
            },
        });

        if (!spot) {
            return NextResponse.json({
                message: "Spot not found"
            }, {
                status: 404
            });
        }

        if (!spot.completeCleaningAt !== null) {
            return NextResponse.json({
                message: "Spot already cleaned"
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

        await prisma.spot.update({
            where: {
                id: spot.id
            },
            data: {
                completeCleaningAt: new Date(),
                endPhotoUri: `https://storage.googleapis.com/cleanway-next/spots/${filename}`
            }
        });


    } catch (error) {
        return NextResponse.json({
            message: "Failed to create cleanWalk"
        }, {
            status: 404
        });
    }
}