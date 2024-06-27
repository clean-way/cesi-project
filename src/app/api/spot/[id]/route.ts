import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { Roles, User } from '@prisma/client';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      message: "Unauthorized"
    }, {
      status: 401
    })
  }
  try {

    const spot = await prisma.spot.findUnique({
      where: {
        id: params.id as string,
      },
      include: {
        spotTrash: {
            include: {
                trash: true
            }
        }
      }
    });

    if (!spot) {
      return NextResponse.json({
        message: "spot not found"
      }, {
        status: 404
      })
    }

    return NextResponse.json({
        spot
    });

  } catch (error) {
    return NextResponse.json({
      message: "spot not found"
    }, {
      status: 404
    })
  }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      message: "Unauthorized"
    }, {
      status: 401
    })
  }

  try {
    const spot = await prisma.spot.findUnique({
      where: {
        id: params.id as string,
      },
    });

    if (!spot) {
      return NextResponse.json({
        message: "spot not found"
      }, {
        status: 404
      })
    }

    if (session.user.role === Roles.AMDIN || session.user.id !== spot.authorId || session.user.role === Roles.MODERATOR) {
        return NextResponse.json({
            message: "Unauthorized"
        }, {
            status: 401
        })
        }
        
        const trashIds = await prisma.spotTrash.findMany({
            where: {
                spotId: spot.id
            }
        });
    
        await prisma.spotTrash.deleteMany({
            where: {
                spotId: spot.id
            }
        });

        for (const trashId of trashIds) {
            await prisma.trash.delete({
                where: {
                    id: trashId.trashId
                }
            });
        }

        await prisma.spot.deleteMany({
            where: {
                id: spot.id
            }

        });
    

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return NextResponse.json({
      message: "spot not found"
    }, {
      status: 404
    })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      message: "Unauthorized"
    }, {
      status: 401
    })
  }

  try {
    const spot = await prisma.spot.findUnique({
      where: {
        id: params.id as string,
      },
    });

    if (!spot) {
      return NextResponse.json({
        message: "spot not found"
      }, {
        status: 404
      })
    }

    if (session.user.role === Roles.AMDIN || session.user.id !== spot.authorId || session.user.role === Roles.MODERATOR) {
        return NextResponse.json({
            message: "Unauthorized"
        }, {
            status: 401
        })
        }

    const { description, access } = await req.json();

    await prisma.spot.update({
      where: {
        id: params.id as string,
      },
      data: {
        description,
        access,
      },
    });

    return NextResponse.json({
      message: "spot updated"
    }, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "spot not found"
    }, {
      status: 404
    })
  }
}

