import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { Roles } from '@prisma/client';

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
    const user = await prisma.user.findUnique({
      where: {
        id: params.id as string,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "user not found"
      }, {
        status: 404
      })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return NextResponse.json({
      message: "user not found"
    }, {
      status: 404
    })
  }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role === Roles.WRITER || session.user.role === Roles.USER) {
    return NextResponse.json({
      message: "Unauthorized"
    }, {
      status: 401
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id as string,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "user not found"
      }, {
        status: 404
      })
    }

    await prisma.user.delete({
      where: {
        id: params.id as string,
      },
    });

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return NextResponse.json({
      message: "user not found"
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
    const user = await prisma.user.findUnique({
      where: {
        id: params.id as string,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "user not found"
      }, {
        status: 404
      })
    }

    if (session.user.id !== user.id) {
      return NextResponse.json({
        message: "Unauthorized"
      }, {
        status: 401
      })
    }

    const { name, email } = await req.json();

    await prisma.user.update({
      where: {
        id: params.id as string,
      },
      data: {
        name,
        email,
      },
    });

    return NextResponse.json({
      message: "user updated"
    }, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "user not found"
    }, {
      status: 404
    })
  }
}

