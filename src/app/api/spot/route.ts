import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

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