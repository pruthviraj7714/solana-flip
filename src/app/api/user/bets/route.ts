import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publicKey = searchParams.get("publicKey");

    if (!publicKey) {
      return NextResponse.json(
        {
          message: "Missing Public Key",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        walletAddress: publicKey,
      },
      include: {
        bets: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found!",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        bets: user.bets,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
