import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

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

        const cleanWalk = await prisma.cleanWalk.findUnique({
            where: {
                id: params.id as string,
            },
        
        });
        
        if (!cleanWalk) {
            return NextResponse.json({
                message: "cleanwalk not found"
            }, {
                status: 404
            })
        }

        //add user in cleanwalkParticipants

        await prisma.cleanWalkParticipant.create({
            data: {
                cleanWalkId: cleanWalk.id,
                userId: session.user.id
            }
        });

        return NextResponse.json({
            message: "User joined cleanwalk"
        });
    } catch (error) {
        return NextResponse.json({
            message: "Failed to create cleanWalk"
        }, {
            status: 404
        });
    }
}