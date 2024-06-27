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

    const cleanWalk = await prisma.cleanWalk.findUnique({
      where: {
        id: params.id as string,
      },
      include: {
        cleanWalkParticipant: {
          include: {
            user: true
          }
        }
      }
    });

    if (!cleanWalk) {
      return NextResponse.json({
        message: "cleanwalk not found"
      }, {
        status: 404
      })
    }

    const removeSensitiveFields = (user: any) => {
      const { email, password, longitude, latitude, role, emailVerified, createdAt, updatedAt, ...safeUser } = user;
      return safeUser;
    };

    cleanWalk.cleanWalkParticipant = cleanWalk.cleanWalkParticipant.map(participant => {
      participant.user = removeSensitiveFields(participant.user);
      return participant;
    });

    return NextResponse.json({
      cleanWalk: {
        ...cleanWalk
      },
    });
  } catch (error) {
    return NextResponse.json({
      message: "cleanwalk not found"
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
    const cleanwalk = await prisma.cleanWalk.findUnique({
      where: {
        id: params.id as string,
      },
    });

    if (!cleanwalk) {
      return NextResponse.json({
        message: "article not found"
      }, {
        status: 404
      })
    }

    if (session.user.role === Roles.AMDIN || session.user.id !== cleanwalk.authorId) {
      return NextResponse.json({
        message: "Unauthorized"
      }, {
        status: 401
      })
    }

    await prisma.cleanWalkParticipant.deleteMany({
      where: {
        cleanWalkId: cleanwalk.id
      }

    });

    await prisma.cleanWalk.delete({
      where: {
        id: params.id as string,
      },
    });

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return NextResponse.json({
      message: "cleanwalk not found"
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
    const cleanwalk = await prisma.cleanWalk.findUnique({
      where: {
        id: params.id as string,
      },
    });

    if (!cleanwalk) {
      return NextResponse.json({
        message: "article not found"
      }, {
        status: 404
      })
    }

    if (session.user.role === Roles.AMDIN || session.user.id !== cleanwalk.authorId || session.user.role === Roles.MODERATOR) {
      return NextResponse.json({
        message: "Unauthorized"
      }, {
        status: 401
      })
    }

    const { description, longitude, latitude, name, startAt, endAt, bannerImage } = await req.json();

    await prisma.cleanWalk.update({
      where: {
        id: params.id as string,
      },
      data: {
        description,
        longitude,
        latitude,
        startAt,
        endAt,
        name,
        bannerImage,
      },
    });

    return NextResponse.json({
      message: "cleanwalk updated"
    }, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "cleanwalk not found"
    }, {
      status: 404
    })
  }
}

