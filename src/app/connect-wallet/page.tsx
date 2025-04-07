"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConnectWalletPage() {
const { connected } = useWallet();
const router = useRouter();

useEffect(() => {
    if(connected) {
        router.push('/home')
    }
}, [connected])

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-purple-950">
    <div className="border hover:border-slate-900 rounded">
      <WalletMultiButton style={{}}  />
    </div>
  </main>
  );
}