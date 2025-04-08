"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CoinsIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const BET_AMOUNTS = [0.01, 0.02, 0.05, 0.1, 0.2, 0.25, 0.5, 1, 2];

export default function Home() {
  const [selectedSide, setSelectedSide] = useState<"heads" | "tails" | null>(
    null
  );
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleFlip = () => {
    if (!selectedSide || selectedAmount === null) return;

    setIsFlipping(true);

    setTimeout(() => {
      setIsFlipping(false);
    }, 3000);
  };

  return (
    <div className="w-full min-h-screen py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-black via-purple-950 to-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-500/10"
          />
        ))}
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
                onClick={() => setSelectedSide("heads")}
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
                onClick={() => setSelectedSide("tails")}
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
                  onClick={() => setSelectedAmount(amount)}
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
    </div>
  );
}
