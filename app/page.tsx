import PredictionMarkets from './PredictionMarkets'

export const revalidate = 60 // Revalidate every 60 seconds (1 minute)

export default function Page() {
  return (
    <>
      <h1 className="text-white text-4xl font-bold text-center px-4 py-8 mt-8">
        How will the election affect you?
      </h1>
      <h2 className="text-slate-300 text-lg text-center px-4 pb-8">
        Talk is cheap. Here's what people say when there's money on the line.
      </h2>
      <PredictionMarkets />
    </>
  )
}
