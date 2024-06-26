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
        const limit = req.nextUrl.searchParams.get('limit') ? parseInt(req.nextUrl.searchParams.get('limit') as string) : 10;
        const page = req.nextUrl.searchParams.get('page') ? parseInt(req.nextUrl.searchParams.get('page') as string) : 1;

        if (limit < 1 || page < 1) return NextResponse.json({
            message: "Invalid query params"
        }, {
            status: 400
        })
        if (limit > 100) return NextResponse.json({
            message: "Limit should be less than 100"
        }, {
            status: 400
        })

        const cleanWalks = await prisma.cleanWalk.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });

        return NextResponse.json({
            cleanWalks: cleanWalks
        });
    } catch (error) {
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
        })
    }

    const { name, description, startAt, endAt, longitude, latitude, bannerImage  } = await req.json();

    if (!name || !description || !startAt || !endAt || !longitude || !latitude || !bannerImage) {
        return NextResponse.json({
            message: "Missing required fields"
        }, {
            status: 400
        });
    }

    try {
        const cleanWalk = await prisma.cleanWalk.create({
            data: {
                name,
                description,
                startAt,
                endAt,
                longitude,
                latitude,
                bannerImage,
                authorId: session.user.id
            }
        });

        return NextResponse.json({
            cleanWalk: cleanWalk
        });
    } catch (error) {
        return NextResponse.json({
            message: "Failed to create cleanWalk"
        }, {
            status: 404
        });
    }
}