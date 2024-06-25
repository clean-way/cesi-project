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

        const articles = await prisma.articles.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });

        return NextResponse.json({
            articles: articles
        });
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch data"
        }, {
            status: 404
        })
    }
}