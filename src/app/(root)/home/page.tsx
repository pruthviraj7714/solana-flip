"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, CoinsIcon, LucideLoader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const BET_AMOUNTS = [0.01, 0.02, 0.05, 0.1, 0.2, 0.25, 0.5, 1, 2];
const PLATFORM_WALLET_PUBLIC_KEY = new PublicKey(
  "6U7HnKP3YVedd1utBRwHdYTFN36heDzKzZ79qUdUsJvA"
);

const connection = new Connection("https://api.devnet.solana.com");

export default function Home() {
  const [selectedSide, setSelectedSide] = useState<"heads" | "tails" | null>(
    null
  );
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [gameResult, setGameResult] = useState<"win" | "lose" | null>(null);
  const [resultSide, setResultSide] = useState<"heads" | "tails" | null>(null);
  const { publicKey, sendTransaction } = useWallet();

  const flipSoundRef = useRef<HTMLAudioElement>(null);
  const winSoundRef = useRef<HTMLAudioElement>(null);
  const loseSoundRef = useRef<HTMLAudioElement>(null);
  const coinSelectSoundRef = useRef<HTMLAudioElement>(null);
  const amountSelectSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    flipSoundRef.current = new Audio("/sounds/coin-flip.mp3");
    winSoundRef.current = new Audio("/sounds/win.mp3");
    loseSoundRef.current = new Audio("/sounds/lose.mp3");
    coinSelectSoundRef.current = new Audio("/sounds/coin-select.mp3");
    amountSelectSoundRef.current = new Audio("/sounds/amount-select.mp3");

    flipSoundRef.current.load();
    winSoundRef.current.load();
    loseSoundRef.current.load();
    coinSelectSoundRef.current.load();
    amountSelectSoundRef.current.load();

    return () => {
      flipSoundRef.current = null;
      winSoundRef.current = null;
      loseSoundRef.current = null;
      coinSelectSoundRef.current = null;
      amountSelectSoundRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isFlipping) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isFlipping]);

  const playSoundEffect = (ref: React.RefObject<HTMLAudioElement>) => {
    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current
        .play()
        .catch((err) => console.error("Audio playback error:", err));
    }
  };

  const handleSideSelect = (side: "heads" | "tails") => {
    setSelectedSide(side);
    playSoundEffect(coinSelectSoundRef as React.RefObject<HTMLAudioElement>);
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    playSoundEffect(amountSelectSoundRef as React.RefObject<HTMLAudioElement>);
  };

  const handleFlip = async () => {
    if (!selectedSide || selectedAmount === null || !publicKey) return;

    setIsFlipping(true);
    playSoundEffect(flipSoundRef as React.RefObject<HTMLAudioElement>);

    try {
      const betAmount = selectedAmount * LAMPORTS_PER_SOL;

      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: PLATFORM_WALLET_PUBLIC_KEY,
          lamports: betAmount,
        })
      );
      const latestBlockhash = await connection.getLatestBlockhash();
      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        "finalized"
      );

      const res = await axios.post("/api/bet", {
        signature,
        selectedSide,
      });

      setTimeout(() => {
        const result = res.data.success ? "win" : "lose";
        setGameResult(result);
        setResultSide(res.data.side || selectedSide);

        if (result === "win") {
          playSoundEffect(winSoundRef as React.RefObject<HTMLAudioElement>);
        } else {
          playSoundEffect(loseSoundRef as React.RefObject<HTMLAudioElement>);
        }

        setShowResultDialog(true);
        setIsFlipping(false);
      }, 3000);
    } catch (error: any) {
      toast.error(error.message);
      setIsFlipping(false);
    }
  };

  const closeResultDialog = () => {
    setShowResultDialog(false);
    setGameResult(null);
  };

  return (
    <div className="w-full min-h-screen py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-black via-purple-950 to-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-yellow-500/10" />
        ))}
      </div>
      <div className="absolute top-16 left-1/2 -translate-x-1/2 text-sm text-amber-300 bg-amber-900/20 px-4 py-2 rounded-full shadow-md font-mono">
        ⚠️ Just for fun on Devnet — play, enjoy, and go wild!
      </div>
      <div className="relative flex items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center rounded-2xl border min-h-[30vh] w-[400px] border-amber-400/50 bg-black/40 backdrop-blur-sm shadow-[0_0_30px_rgba(234,179,8,0.2)]"
        >
          <div className="relative">
            <motion.div
              animate={
                isFlipping
                  ? {
                      rotateY: [0, 1080],
                      scale: [1, 1.2, 1],
                    }
                  : {}
              }
              transition={{ duration: 3, ease: "easeInOut" }}
              className="inset-0 flex mt-6 justify-center"
            >
              <div className="relative w-[100px] h-[100px] rounded-full bg-gradient-to-r from-yellow-500 to-amber-300 shadow-[0_0_50px_rgba(234,179,8,0.5)] flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-yellow-200 to-transparent opacity-70 h-1/2" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-amber-800 to-transparent opacity-20 h-1/2 top-1/2" />
                <CoinsIcon className="w-12 h-12 text-amber-800 relative z-10" />
              </div>
            </motion.div>

            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-yellow-500/20 blur-xl" />
          </div>

          <div className="flex flex-col justify-center items-center my-8">
            <span className="text-xl text-center font-mono text-white mb-4 tracking-wide">
              I Like
            </span>
            <div className="flex items-center justify-between gap-4 px-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSideSelect("heads")}
                className={cn(
                  "relative cursor-pointer transition-all duration-300",
                  selectedSide === "heads" ? "scale-110" : ""
                )}
              >
                <div
                  className={cn(
                    "w-[100px] h-[100px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-300 flex items-center justify-center shadow-lg transition-all duration-300",
                    selectedSide === "heads"
                      ? "shadow-[0_0_20px_rgba(234,179,8,0.6)]"
                      : ""
                  )}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-yellow-200 to-transparent opacity-70 h-1/2" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-amber-700 to-transparent opacity-20 h-1/2 top-1/2" />

                  <span className="text-amber-900 font-bold text-lg z-10 font-mono">
                    Heads
                  </span>

                  {selectedSide === "heads" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSideSelect("tails")}
                className={cn(
                  "relative cursor-pointer transition-all duration-300",
                  selectedSide === "tails" ? "scale-110" : ""
                )}
              >
                <div
                  className={cn(
                    "w-[100px] h-[100px] rounded-full bg-gradient-to-r from-amber-300 to-yellow-400 flex items-center justify-center shadow-lg transition-all duration-300",
                    selectedSide === "tails"
                      ? "shadow-[0_0_20px_rgba(234,179,8,0.6)]"
                      : ""
                  )}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-yellow-200 to-transparent opacity-70 h-1/2" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-amber-700 to-transparent opacity-20 h-1/2 top-1/2" />

                  <span className="text-amber-900 font-bold text-lg z-10 font-mono">
                    Tails
                  </span>

                  {selectedSide === "tails" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center my-8">
            <span className="text-xl text-center font-mono text-white mb-4 tracking-wide">
              For
            </span>
            <div className="grid grid-cols-3 gap-3 px-6">
              {BET_AMOUNTS.map((amount) => (
                <motion.div
                  key={amount}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAmountSelect(amount)}
                  className={cn(
                    "px-3 py-2 text-black font-mono font-bold bg-gradient-to-r from-yellow-300 to-amber-300 rounded-lg cursor-pointer text-center shadow-md transition-all duration-200",
                    selectedAmount === amount
                      ? "shadow-[0_0_15px_rgba(234,179,8,0.6)] scale-105 from-yellow-400 to-amber-400"
                      : ""
                  )}
                >
                  {amount}
                </motion.div>
              ))}
            </div>
          </div>
          <span className="text-center text-sm text-red-500">
            A 5% platform fee will be deducted from your rewards.
          </span>

          <div className="flex justify-center items-center my-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleFlip}
                disabled={
                  !selectedSide || selectedAmount === null || isFlipping
                }
                className={cn(
                  "px-10 py-6 rounded-lg cursor-pointer text-lg font-bold font-mono tracking-wide",
                  isFlipping
                    ? "bg-amber-600 text-white"
                    : "bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600",
                  !selectedSide || selectedAmount === null
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                )}
              >
                {isFlipping ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Flipping...
                  </div>
                ) : (
                  "FLIP"
                )}
              </Button>
            </motion.div>
          </div>

          <div className="text-center text-xs text-amber-300/70 mb-4 px-6">
            {!selectedSide &&
              !selectedAmount &&
              "Select a side and amount to start"}
            {selectedSide && selectedAmount === null && "Now select an amount"}
            {selectedSide &&
              selectedAmount !== null &&
              !isFlipping &&
              "Ready to flip!"}
            {isFlipping && "Good luck!"}
          </div>
        </motion.div>
      </div>

      {isFlipping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[90%] max-w-md backdrop-blur-2xl shadow-2xl border border-gray-700 rounded-2xl px-6 py-8 flex flex-col items-center gap-6">
            <div className="text-white text-lg font-semibold text-center">
              Flipping the coin...
            </div>
            <LucideLoader className="animate-spin text-white w-6 h-6" />
            <div className="flex items-center gap-1 text-sm text-red-400 text-center">
              <AlertTriangleIcon className="w-6 h-6 text-red-500" />
              <span>
                Please don't close or refresh the app. fetching results....
              </span>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {showResultDialog && (
          <Dialog open={showResultDialog} onOpenChange={closeResultDialog}>
            <DialogContent
              className={cn(
                "sm:max-w-md border-2 backdrop-blur-lg bg-black/80",
                gameResult === "win"
                  ? "border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                  : "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]"
              )}
            >
              <DialogHeader>
                <DialogTitle
                  className={cn(
                    "text-center text-2xl font-bold font-mono",
                    gameResult === "win" ? "text-green-400" : "text-red-400"
                  )}
                >
                  {gameResult === "win" ? "YOU WON!" : "YOU LOST!"}
                </DialogTitle>
                <DialogDescription className="text-center text-lg mt-2">
                  The coin landed on{" "}
                  <span className="font-bold text-amber-400">
                    {resultSide?.toUpperCase()}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <div className="flex justify-center my-6">
                <motion.div
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{
                    scale: 1,
                    rotate:
                      gameResult === "win"
                        ? [0, 15, -15, 10, -10, 5, -5, 0]
                        : 0,
                  }}
                  transition={{
                    duration: gameResult === "win" ? 1 : 0.5,
                    ease: "easeOut",
                  }}
                  className={cn(
                    "relative w-[120px] h-[120px] rounded-full flex items-center justify-center",
                    gameResult === "win"
                      ? "bg-gradient-to-r from-green-400 to-emerald-500 shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                      : "bg-gradient-to-r from-red-400 to-rose-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]"
                  )}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-transparent opacity-30 h-1/2" />

                  {gameResult === "win" ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-white text-5xl"
                    >
                      🎉
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-white text-5xl"
                    >
                      😢
                    </motion.div>
                  )}
                </motion.div>
              </div>

              <div className="text-center mb-2">
                {gameResult === "win" ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400 font-mono text-xl"
                  >
                    +{(selectedAmount || 0) * 2} SOL
                  </motion.p>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 font-mono text-xl"
                  >
                    -{selectedAmount} SOL
                  </motion.p>
                )}
              </div>

              <div className="flex justify-center mt-4">
                <Button
                  onClick={closeResultDialog}
                  className={cn(
                    "px-8 py-2 font-mono",
                    gameResult === "win"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                  )}
                >
                  {gameResult === "win" ? "SEE REWARDS IN WALLET" : "TRY AGAIN"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <audio id="flip-sound" src="/sounds/coin-flip.mp3" preload="auto" />
      <audio id="win-sound" src="/sounds/win.mp3" preload="auto" />
      <audio id="lose-sound" src="/sounds/lose.mp3" preload="auto" />
      <audio
        id="coin-select-sound"
        src="/sounds/coin-select.mp3"
        preload="auto"
      />
      <audio
        id="amount-select-sound"
        src="/sounds/amount-select.mp3"
        preload="auto"
      />
    </div>
  );
}
