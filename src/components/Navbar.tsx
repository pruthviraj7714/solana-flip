"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { CoinsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Navbar() {
  const { disconnect, disconnecting } = useWallet();

  const router = useRouter();
  return (
    <div className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-zinc-800">
      <div
        onClick={() => router.push("/home")}
        className="flex items-center gap-2"
      >
        <CoinsIcon className="h-6 w-6 text-yellow-500" />
        <span className="font-bold text-xl">Solana Flip</span>
      </div>

      <div>
        <Button
          onClick={() => {
            disconnect();
            router.push("/");
          }}
          className="cursor-pointer"
          variant={"destructive"}
        >
          {disconnecting ? "Disconnecting" : "Disconnect"}
        </Button>
      </div>
    </div>
  );
}
