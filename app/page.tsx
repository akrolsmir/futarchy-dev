import PredictionMarkets from './PredictionMarkets'
import { Github } from 'lucide-react'

export const revalidate = 60 // Revalidate every 60 seconds (1 minute)

export default function Page() {
  return (
    <>
      <h1 className="text-white text-4xl font-bold text-center px-4 py-8 mt-8">
        How will the election affect you?
      </h1>
      <h2 className="text-slate-300 text-lg text-center px-4">
        Talk is cheap. Here's what people say when there's money on the line.
      </h2>

      <PredictionMarkets />

      <div className="text-slate-300 text-center px-4 py-8 mt-8">
        <p className="mb-2">
          How accurate is this?{' '}
          <a
            href="https://manifold.markets/about"
            className="underline hover:decoration-solid decoration-dotted"
            target="_blank"
            rel="noopener noreferrer"
          >
            Better than most pundits
            {/* edit to "Very" if we get enough activity/liquidity to believe that */}
          </a>
          .
        </p>
        <p className="text-sm">
          Either these predictions are correct or you can make a lot of money.
          <br />
          <span className="text-slate-400">
            (Not financial advice, do your own research; you only make money if
            you're right)
          </span>
        </p>
        <div className="flex justify-center items-center gap-2 mt-12">
          <p className="text-sm text-slate-400">
            made with 🇺🇸 by{' '}
            <a
              href="https://npfoss.com"
              className="underline hover:decoration-solid decoration-dotted"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nate Foss
            </a>{' '}
            and{' '}
            <a
              href="https://manifund.org/Austin"
              className="underline hover:decoration-solid decoration-dotted"
              target="_blank"
              rel="noopener noreferrer"
            >
              Austin Chen
            </a>
          </p>
          <a
            href="https://github.com/akrolsmir/futarchy-dev"
            className="inline-flex items-center hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </>
  )
}
