"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  ArrowUpDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CoinsIcon,
  Filter,
  History,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";

type WON_STATUS = "WON" | "LOST" | "BETTING";
type BET_SIDE = "HEADS" | "TAILS";

interface Bet {
  id: string;
  userId: string;
  betAmount: number;
  resultAmount: number;
  wonStatus: WON_STATUS;
  betSide: BET_SIDE;
  createdAt: string;
  updatedAt: string;
}

export default function HistoryPage() {
  const { publicKey } = useWallet();
  const [bets, setBets] = useState<Bet[]>([]);
  const [filteredBets, setFilteredBets] = useState<Bet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<WON_STATUS | "ALL">("ALL");
  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest" | "highest" | "lowest"
  >("newest");
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchBets = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/user/bets", {
          params: {
            publicKey,
          },
        });

        setBets(res.data.bets);
        setFilteredBets(res.data.bets);
      } catch (error) {
        console.error("Error fetching bet history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBets();
  }, [publicKey]);

  useEffect(() => {
    let filtered = [...bets];

    if (activeFilter !== "ALL") {
      filtered = filtered.filter((bet) => bet.wonStatus === activeFilter);
    }

    switch (sortOrder) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "highest":
        filtered.sort((a, b) => b.betAmount - a.betAmount);
        break;
      case "lowest":
        filtered.sort((a, b) => a.betAmount - b.betAmount);
        break;
    }

    setFilteredBets(filtered);
    setCurrentPage(1);
  }, [bets, activeFilter, sortOrder]);

  const totalPages = Math.ceil(filteredBets.length / itemsPerPage);
  const currentBets = filteredBets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalBets = bets.length;
  const wonBets = bets.filter((bet) => bet.wonStatus === "WON").length;
  const lostBets = bets.filter((bet) => bet.wonStatus === "LOST").length;
  const pendingBets = bets.filter((bet) => bet.wonStatus === "BETTING").length;

  const totalWagered = bets.reduce((sum, bet) => sum + Number(bet.betAmount), 0);
  const totalWon = bets
    .filter((bet) => bet.wonStatus === "WON")
    .reduce((sum, bet) => sum + Number(bet.resultAmount), 0);

  const netProfit = totalWon - totalWagered;
  const winRate = totalBets > 0 ? (wonBets / (wonBets + lostBets)) * 100 : 0;

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="w-full min-h-screen py-12 md:py-16 bg-gradient-to-b from-black via-purple-950 to-black">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button
                variant="outline"
                size="icon"
                className="border-amber-500/30 bg-black/40 hover:bg-black/60"
              >
                <ChevronLeft className="h-5 w-5 text-amber-400" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white font-mono flex items-center gap-2">
              <History className="h-7 w-7 text-amber-400" />
              Betting History
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-amber-500/30 bg-black/40 hover:bg-black/60"
                >
                  <Filter className="h-4 w-4 mr-2 text-amber-400" />
                  <span className="text-amber-100">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-amber-500/30 text-amber-100">
                <DropdownMenuItem
                  onClick={() => setActiveFilter("ALL")}
                  className={
                    activeFilter === "ALL"
                      ? "bg-amber-900/30 text-amber-300"
                      : ""
                  }
                >
                  All Bets
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setActiveFilter("WON")}
                  className={
                    activeFilter === "WON"
                      ? "bg-amber-900/30 text-amber-300"
                      : ""
                  }
                >
                  Wins Only
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setActiveFilter("LOST")}
                  className={
                    activeFilter === "LOST"
                      ? "bg-amber-900/30 text-amber-300"
                      : ""
                  }
                >
                  Losses Only
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setActiveFilter("BETTING")}
                  className={
                    activeFilter === "BETTING"
                      ? "bg-amber-900/30 text-amber-300"
                      : ""
                  }
                >
                  Pending Bets
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-amber-500/30 bg-black/40 hover:bg-black/60"
                >
                  <ArrowUpDown className="h-4 w-4 mr-2 text-amber-400" />
                  <span className="text-amber-100">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-amber-500/30 text-amber-100">
                <DropdownMenuItem
                  onClick={() => setSortOrder("newest")}
                  className={
                    sortOrder === "newest"
                      ? "bg-amber-900/30 text-amber-300"
                      : ""
                  }
                >
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOrder("oldest")}
                  className={
                    sortOrder === "oldest"
                      ? "bg-amber-900/30 text-amber-300"
                      : ""
                  }
                >
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOrder("highest")}
                  className={
                    sortOrder === "highest"
                      ? "bg-amber-900/30 text-amber-300"
                      : ""
                  }
                >
                  Highest Amount
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOrder("lowest")}
                  className={
                    sortOrder === "lowest"
                      ? "bg-amber-900/30 text-amber-300"
                      : ""
                  }
                >
                  Lowest Amount
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="bg-black/40 border-amber-500/30 backdrop-blur-sm shadow-[0_0_15px_rgba(234,179,8,0.1)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-400 text-lg">
                  Total Bets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{totalBets}</div>
                <div className="text-xs text-amber-200/70 mt-1">
                  <span className="text-green-400">{wonBets} wins</span> •{" "}
                  <span className="text-red-400">{lostBets} losses</span> •{" "}
                  <span className="text-blue-400">{pendingBets} pending</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="bg-black/40 border-amber-500/30 backdrop-blur-sm shadow-[0_0_15px_rgba(234,179,8,0.1)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-400 text-lg">
                  Win Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {winRate.toFixed(1)}%
                </div>
                <div className="text-xs text-amber-200/70 mt-1">
                  Based on {wonBets + lostBets} completed bets
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="bg-black/40 border-amber-500/30 backdrop-blur-sm shadow-[0_0_15px_rgba(234,179,8,0.1)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-400 text-lg">
                  Total Wagered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {Number(totalWagered) > 0
                    ? Number(totalWagered).toFixed(2)
                    : "0"}{" "}
                  SOL
                </div>
                <div className="text-xs text-amber-200/70 mt-1">
                Average bet: {(Number(totalWagered) / (totalBets || 1)).toFixed(2)} SOL
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card
              className={cn(
                "bg-black/40 border-amber-500/30 backdrop-blur-sm shadow-[0_0_15px_rgba(234,179,8,0.1)]",
                netProfit > 0
                  ? "border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                  : netProfit < 0
                  ? "border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                  : ""
              )}
            >
              <CardHeader className="pb-2">
                <CardTitle
                  className={cn(
                    "text-lg",
                    netProfit > 0
                      ? "text-green-400"
                      : netProfit < 0
                      ? "text-red-400"
                      : "text-amber-400"
                  )}
                >
                  Net Profit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    "text-3xl font-bold",
                    netProfit > 0
                      ? "text-green-400"
                      : netProfit < 0
                      ? "text-red-400"
                      : "text-white"
                  )}
                >
                  {netProfit > 0 ? "+" : ""}
                  {netProfit.toFixed(2)} SOL
                </div>
                <div className="text-xs text-amber-200/70 mt-1">
                  Total won: {totalWon.toFixed(2)} SOL
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/40 border border-amber-500/30 rounded-xl backdrop-blur-sm shadow-[0_0_30px_rgba(234,179,8,0.1)] overflow-hidden"
        >
          <div className="p-4 border-b border-amber-500/20">
            <h2 className="text-xl font-bold text-amber-400 font-mono">
              Bet History
            </h2>
            <p className="text-amber-200/70 text-sm">
              {activeFilter === "ALL"
                ? "All bets"
                : activeFilter === "WON"
                ? "Winning bets"
                : activeFilter === "LOST"
                ? "Losing bets"
                : "Pending bets"}{" "}
              ({filteredBets.length})
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 text-amber-400 animate-spin" />
            </div>
          ) : filteredBets.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-16 text-center">
              <CoinsIcon className="h-12 w-12 text-amber-500/30 mb-4" />
              <h3 className="text-xl font-bold text-amber-200">
                No bets found
              </h3>
              <p className="text-amber-200/50 max-w-md mt-2">
                {activeFilter !== "ALL"
                  ? `You don't have any ${activeFilter.toLowerCase()} bets yet.`
                  : "You haven't placed any bets yet. Start flipping coins to see your history!"}
              </p>
              {activeFilter !== "ALL" && (
                <Button
                  variant="outline"
                  className="mt-4 border-amber-500/30 text-amber-400 hover:bg-amber-950/30"
                  onClick={() => setActiveFilter("ALL")}
                >
                  Show All Bets
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-amber-500/20 bg-amber-950/20">
                      <th className="px-4 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">
                        Side
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">
                        Result
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-500/10">
                    {currentBets.map((bet) => (
                      <motion.tr
                        key={bet.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-amber-950/20"
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="text-sm font-medium text-amber-100">
                              {format(new Date(bet.createdAt), "MMM d, yyyy")}
                            </div>
                            <div className="text-xs text-amber-300/50 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatTimeAgo(bet.createdAt)}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div
                            className={cn(
                              "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                              bet.betSide === "HEADS"
                                ? "bg-yellow-950/30 text-yellow-400"
                                : "bg-amber-950/30 text-amber-400"
                            )}
                          >
                            {bet.betSide === "HEADS" ? "HEADS" : "TAILS"}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-amber-100 font-mono">
                          {Number(bet.betAmount).toFixed(2)} SOL
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {bet.wonStatus === "BETTING" ? (
                            <span className="text-blue-400 font-mono text-sm">
                              Pending
                            </span>
                          ) : bet.wonStatus === "WON" ? (
                            <span className="text-green-400 font-mono text-sm">
                              +{Number(bet.resultAmount).toFixed(2)} SOL
                            </span>
                          ) : (
                            <span className="text-red-400 font-mono text-sm">
                              -{Number(bet.betAmount).toFixed(2)} SOL
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Badge
                            className={cn(
                              "font-mono",
                              bet.wonStatus === "WON"
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30"
                                : bet.wonStatus === "LOST"
                                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30"
                                : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/30"
                            )}
                          >
                            {bet.wonStatus}
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-amber-500/20 px-4 py-3">
                  <div className="text-sm text-amber-300/70">
                    Showing{" "}
                    <span className="font-medium text-amber-300">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-amber-300">
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredBets.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-amber-300">
                      {filteredBets.length}
                    </span>{" "}
                    results
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="border-amber-500/30 text-amber-400 hover:bg-amber-950/30 hover:text-white disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                        className={cn(
                          currentPage === i + 1
                            ? "bg-amber-600 hover:bg-amber-700 text-white"
                            : "border-amber-500/30 text-amber-400 hover:bg-amber-950/30 hover:text-white"
                        )}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="border-amber-500/30 text-amber-400 hover:bg-amber-950/30 hover:text-white disabled:opacity-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
