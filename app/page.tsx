import PredictionMarkets from './PredictionMarkets'
import { Github } from 'lucide-react'

export const revalidate = 60 // Revalidate every 60 seconds (1 minute)

function DottedLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className="underline underline-offset-4 hover:decoration-solid decoration-dotted"
    >
      {children}
    </a>
  )
}

export default function Page() {
  return (
    <>
      <h1 className="text-white text-4xl font-bold text-center px-4 py-8 mt-8">
        What will happen under <span className="text-blue-400"> Harris </span>or
        <span className="text-red-400"> Trump</span>?
      </h1>
      <h2 className="text-slate-300 text-lg text-center px-4">
        Talk is cheap — here's what people are betting on{' '}
        <DottedLink href="https://www.astralcodexten.com/p/prediction-market-faq">
          prediction markets
        </DottedLink>
      </h2>

      <PredictionMarkets />

      <div className="text-slate-300 text-center px-4 py-8 mt-8">
        <p className="mb-2">
          How accurate are prediction markets?{' '}
          <DottedLink href="https://manifold.markets/calibration">
            Better than most pundits
            {/* edit to "Very" if we get enough activity/liquidity to believe that */}
          </DottedLink>
          .<br />
          Either they're right, or you can make money betting against them.
          <br />
          Learn more{' '}
          <DottedLink href="https://www.astralcodexten.com/p/prediction-market-faq">
            here
          </DottedLink>
          , or see caveats{' '}
          <DottedLink href="https://dynomight.net/prediction-market-causation/">
            here
          </DottedLink>
          .
        </p>
        {/* <p className="text-sm">
          Either these predictions are correct or you can make a lot of money.
          <br />
          <span className="text-slate-400">
            (Not financial advice, do your own research; you only make money if
            you're right)
          </span>
        </p> */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <p className="text-sm text-slate-400">
            made with 🇺🇸 by{' '}
            <DottedLink href="https://npfoss.com">Nate Foss</DottedLink> and{' '}
            <DottedLink href="https://manifund.org/Austin">
              Austin Chen
            </DottedLink>
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
