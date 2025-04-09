import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";
import bs58 from "bs58";
import { prisma } from "@/lib/db";

const connection = new Connection("https://api.devnet.solana.com");

const PLATFORM_WALLET = Keypair.fromSecretKey(
  bs58.decode(process.env.PRIVATE_KEY!)
);

const PLATFORM_FEES = 5;

export async function POST(req: NextRequest) {
  try {
    const { signature, selectedSide } = await req.json();

    let txDetails = null;
    for (let i = 0; i < 5; i++) {
      txDetails = await connection.getTransaction(signature, {
        commitment: "confirmed",
      });
      if (txDetails) break;
      await new Promise((res) => setTimeout(res, 1000));
    }
    if (!txDetails) {
      return NextResponse.json(
        {
          message: "Transaction Not found!",
        },
        { status: 400 }
      );
    }

    //@ts-ignore
    const from = txDetails.transaction.message.accountKeys[0].toBase58();
    const lamports =
      txDetails?.meta?.preBalances[0]! - txDetails?.meta?.postBalances[0]!;

    const finalAmountAfterPlatformFee =
      lamports - (lamports * PLATFORM_FEES) / 100;

    let flipResult = Math.random() > 0.5 ? "heads" : "tails";
    const user = await prisma.user.findUnique({
      where: { walletAddress: from },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found!",
        },
        { status: 400 }
      );
    }
    if (flipResult !== selectedSide) {
      await prisma.bet.create({
        data: {
          betAmount: lamports / LAMPORTS_PER_SOL,
          wonStatus: "LOST",
          betSide: selectedSide === "heads" ? "HEADS" : "TAILS",
          resultAmount: 0,
          userId: user.id,
        },
      });

      return NextResponse.json({
        message: "You Lose",
        success: false,
        side: flipResult,
      });
    } else {
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: PLATFORM_WALLET.publicKey,
          toPubkey: new PublicKey(from),
          lamports: finalAmountAfterPlatformFee,
        })
      );

      await connection.sendTransaction(tx, [PLATFORM_WALLET]);

      await prisma.bet.create({
        data: {
          betAmount: lamports / LAMPORTS_PER_SOL,
          wonStatus: "WON",
          betSide: selectedSide === "heads" ? "HEADS" : "TAILS",
          resultAmount: finalAmountAfterPlatformFee / LAMPORTS_PER_SOL,
          userId: user.id,
        },
      });

      return NextResponse.json({
        message: "You Won",
        success: true,
        side: flipResult,
      });
    }
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
