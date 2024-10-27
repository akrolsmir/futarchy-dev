import PredictionMarkets from './PredictionMarkets'

export const revalidate = 60 // Revalidate every 60 seconds (1 minute)

export default function Page() {
  return <PredictionMarkets />
}
