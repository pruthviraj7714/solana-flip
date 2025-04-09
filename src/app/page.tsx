import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Coins, CoinsIcon as CoinIcon, TrendingUp, Shield, Users, ExternalLink, Github } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-zinc-800">
        <Link href="/" className="flex items-center gap-2">
          <CoinIcon className="h-6 w-6 text-yellow-500" />
          <span className="font-bold text-xl">Solana Flip</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#how-it-works" className="text-sm font-medium hover:text-yellow-500 transition-colors">
            How It Works
          </Link>
          <Link href="#features" className="text-sm font-medium hover:text-yellow-500 transition-colors">
            Features
          </Link>
          <Link href="#stats" className="text-sm font-medium hover:text-yellow-500 transition-colors">
            Stats
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-yellow-500 transition-colors">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/connect-wallet"
            className="inline-flex h-9 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-yellow-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gradient-to-r hover:from-purple-700 hover:to-yellow-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Launch App
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-black to-purple-950">
          <div className="px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex bg-yellow-500/10 text-yellow-500 border-yellow-500/20 mb-2">
                    Powered by Solana
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-500">
                    Flip a Coin. Win SOL.
                  </h1>
                  <p className="max-w-[600px] text-zinc-400 md:text-xl">
                    A simple, fair, and transparent coin flip game built on Solana. Bet on heads or tails and instantly
                    double your SOL.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/connect-wallet"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-yellow-500 px-8 text-sm font-medium text-black shadow transition-colors hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Start Flipping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-700 bg-black px-8 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-900 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] animate-pulse">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 shadow-[0_0_50px_rgba(234,179,8,0.5)]">
                      <div className="w-full h-full flex items-center justify-center">
                        <CoinIcon className="w-24 h-24 md:w-32 md:h-32 text-black" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Solana Flip is a simple, fair, and transparent coin flip game built on the Solana blockchain.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
                  <Coins className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">1. Connect & Deposit</h3>
                  <p className="text-zinc-400">Connect your Solana wallet and deposit SOL to start playing.</p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
                  <CoinIcon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">2. Place Your Bet</h3>
                  <p className="text-zinc-400">Choose heads or tails and set your bet amount.</p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">3. Win & Withdraw</h3>
                  <p className="text-zinc-400">If you win, your SOL is instantly doubled. Withdraw anytime.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-zinc-950">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Solana Flip</h2>
                <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a secure, transparent, and fun way to flip coins on the blockchain.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
                    <Shield className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Provably Fair</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">
                    All coin flips are verifiable on-chain. Our smart contract ensures complete transparency and
                    fairness.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
                    <Coins className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Low Fees</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">
                    Thanks to Solana's high-performance blockchain, you'll enjoy minimal transaction fees and instant
                    settlements.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Community Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">
                    Active players earn FLIP tokens that can be used for reduced fees, exclusive games, and governance.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Instant Payouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">
                    Winnings are credited to your account immediately. Withdraw to your wallet anytime with no delays.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="stats" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Platform Statistics</h2>
                <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of players already flipping coins on Solana.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center justify-center space-y-2 bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-zinc-400">Total Flips</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm text-zinc-400">Unique Players</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                <div className="text-3xl font-bold">5,000</div>
                <div className="text-sm text-zinc-400">SOL Wagered</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                <div className="text-3xl font-bold">2,500</div>
                <div className="text-sm text-zinc-400">SOL Paid Out</div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to know about Solana Flip.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-2">
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>How does Solana Flip ensure fairness?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">
                    Our smart contract uses verifiable random functions (VRFs) to generate provably fair results. All
                    flips are recorded on the Solana blockchain and can be verified by anyone.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>What are the odds of winning?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">
                    The odds are 50/50, just like a real coin flip. We take a small 3% fee from winnings to maintain the
                    platform.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>What wallets are supported?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">
                    We support Phantom, Solflare, and other Solana-compatible wallets. Simply connect your preferred
                    wallet to get started.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>Is there a minimum or maximum bet?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">
                    The minimum bet is 0.01 SOL. The maximum bet depends on our current liquidity pool size, typically
                    around 10 SOL per flip.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>How quickly are winnings paid out?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">
                    Winnings are credited to your account instantly. You can withdraw to your wallet at any time with no
                    delays.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>What is the FLIP token?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">
                    FLIP is our platform token that rewards active players. You earn FLIP tokens with each bet, which
                    can be used for reduced fees and exclusive features.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-black to-purple-950">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Flip?</h2>
                <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of players already flipping coins on Solana.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/connect-wallet"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-yellow-500 px-8 text-sm font-medium text-black shadow transition-colors hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Launch App
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-700 bg-black px-8 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-900 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-zinc-800">
        <div className="flex items-center gap-2">
          <CoinIcon className="h-5 w-5 text-yellow-500" />
          <p className="text-xs text-zinc-400">&copy; {new Date().getFullYear()} Solana Flip. All rights reserved.</p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs text-zinc-400 hover:text-yellow-500">
            Terms
          </Link>
          <Link href="#" className="text-xs text-zinc-400 hover:text-yellow-500">
            Privacy
          </Link>
          <Link href="#" className="text-xs text-zinc-400 hover:text-yellow-500 flex items-center gap-1">
            <Github className="h-3 w-3" />
            GitHub
          </Link>
          <Link href="#" className="text-xs text-zinc-400 hover:text-yellow-500 flex items-center gap-1">
            <ExternalLink className="h-3 w-3" />
            Docs
          </Link>
        </nav>
      </footer>
    </div>
  )
}

