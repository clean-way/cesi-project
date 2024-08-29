import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { Roles } from '@prisma/client';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const article = await prisma.articles.findUnique({
      where: {
        id: params.id as string,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true
          }
        }
      }
    });

    if (!article) {
      return NextResponse.json({
        message: "article not found"
      }, {
        status: 404
      })
    }

    return NextResponse.json({
      article: {
        ...article
      },
    });
  } catch (error) {
    return NextResponse.json({
      message: "article not found"
    }, {
      status: 404
    })
  }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== Roles.MODERATOR && session.user.role !== Roles.AMDIN && session.user.role !== Roles.WRITER)) {
    return NextResponse.json({
      message: "Unauthorized"
    }, {
      status: 401
    })
  }

  try {
    const article = await prisma.articles.findUnique({
      where: {
        id: params.id as string,
      },
    });

    if (!article) {
      return NextResponse.json({
        message: "article not found"
      }, {
        status: 404
      })
    }

    if (session.user.role === Roles.WRITER && session.user.id !== article.authorId) {
      return NextResponse.json({
        message: "Unauthorized"
      }, {
        status: 401
      })
    }


    await prisma.articles.delete({
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

  if (!session || (session.user.role !== Roles.MODERATOR && session.user.role !== Roles.AMDIN && session.user.role !== Roles.WRITER)) {
    return NextResponse.json({
      message: "Unauthorized"
    }, {
      status: 401
    })
  }

  try {
    const article = await prisma.articles.findUnique({
      where: {
        id: params.id as string,
      },
    });

    if (!article) {
      return NextResponse.json({
        message: "article not found"
      }, {
        status: 404
      })
    }

    if (session.user.role === Roles.WRITER && session.user.id !== article.authorId) {
      return NextResponse.json({
        message: "Unauthorized"
      }, {
        status: 401
      })
    }

    const { title, body } = await req.json();

    await prisma.articles.update({
      where: {
        id: params.id as string,
      },
      data: {
        title,
        body,
      },
    });

    return NextResponse.json({
      message: "article updated"
    }, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "article not found"
    }, {
      status: 404
    })
  }
}

