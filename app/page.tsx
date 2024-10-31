import PredictionMarkets from './PredictionMarkets'

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
            className="text-blue-400 hover: underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Better than most pundits
            {/* edit to "Very" if we get enough activity/liquidity to believe that */}
          </a>.
        </p>
        <p className="text-sm">
          Either these predictions are correct or you can make a lot of money.<br />
          <span className="text-slate-400">
            (Not financial advice, do your own research; you only make money if you're right)
          </span>
        </p>
        <p className="text-sm text-slate-400 mt-12">
          made with 🇺🇸 by{' '}
          <a
            href="https://npfoss.com"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nate Foss
          </a>
          {' '}and{' '}
          <a
            href="https://x.com/akrolsmir"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Austin Chen
          </a>
        </p>
      </div>
    </>
  )
}
