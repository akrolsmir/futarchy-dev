import { cache } from 'react'
import Gauges from './Gauges'
import { PredictionPair } from '@/types'

// Market data array
const MARKETS: PredictionPair[] = [
  {
    // title: 'Will 2025 inflation be below 2.5%? (Current\u00A03.2%)',
    title: 'Will inflation in 2025 be below 2.5%?',
    description: 'Currently\u00A02.4%, per Bureau of Labor Statistics',
    harrisSlug: 'if-harris-wins-the-election-will-th',
    trumpSlug: 'if-trump-wins-the-election-will-the',
  },
  // TODO: something about GDP, maybe this one but nonbinary is more annoying, could be worth making a new one https://manifold.markets/Tetraspace/if-donald-trump-is-elected-presiden-ug8yle06z9
  {
    title: 'Will undocumented immigration go down?',
    description: '2025 vs 2024 southwest land border encounters, per US CBP',
    harrisSlug: 'if-harris-wins-will-undocumented-im',
    trumpSlug: 'if-trump-wins-will-immigration-go-d',
  },
  {
    title: 'Will there be a ceasefire in Ukraine?',
    description:
      '30 days with <100 Russian soldier fatalities before Nov 2026, per Ukraine Ministry of Defence',
    harrisSlug: 'if-harris-is-elected-will-there-be-1bw27ghde1',
    trumpSlug: 'if-trump-is-elected-will-there-be-a-40ca39e5dcec',
  },
  // TODO: something about Israel/Gaza/Iran, maybe fatalities by EoY 2025 or something
  /* this one isn't real money yet
  {
    title: 'Gallup satisfaction poll greater than Obama',
    harrisSlug: 'if-harris-becomes-president-will-sh',
    trumpSlug: 'if-trump-becomes-president-will-he',
  },
  */
  // TODO: something about abortion
  /* this one isn't real money yet
  {
    title: 'Will Donald Trump serve time in 2025?',
    harrisSlug: 'if-donald-trump-loses-the-election',
    trumpSlug: 'if-donald-trump-wins-the-election-w',
  },
  */
  {
    title: 'Will gas prices stay under $4 a gallon?',
    description:
      'US monthly average (currently $3.26), per Energy Information Administration',
    harrisSlug: 'if-harris-becomes-president-will-ga-rpkm0uqss8',
    trumpSlug: 'if-trump-becomes-president-will-gas',
  },
  // TODO: something about poverty levels
  // TODO: something about expected federal deficit EoY 2026
  /* this one isn't real money yet
  {
    title: 'Will marijuana be federally rescheduled from Schedule 1 drug?',
    harrisSlug: 'if-harris-wins-will-marijuana-be-fe',
    trumpSlug: 'if-trump-wins-will-marijuana-be-fed',
  },
  */
  // move this one up if we don't end up adding a GDP market
  {
    title: 'Will the US enter a recession before 2027?',
    description: "Per St. Louis Fed's Sahm rule recession indicator",
    harrisSlug: 'if-harris-wins-will-the-us-enter-a',
    trumpSlug: 'if-trump-wins-will-the-us-enter-a-r',
  },
  // TODO: something about electricity prices?
  /* this one isn't real money yet
  {
    title: 'Will the president appoint another SCOTUS Justice before 2027?',
    harrisSlug: 'if-harris-wins-will-she-appoint-ano',
    trumpSlug: 'if-trump-wins-will-he-appoint-anoth',
  },
  */
  {
    title: 'Will there be major federal policy on AI?',
    description: 'Executive order or legislation passed before Nov 2026',
    harrisSlug: 'if-harris-is-elected-will-there-be-uve99bjbbo',
    trumpSlug: 'if-trump-is-elected-will-there-be-a-01a15c4aa239',
  },
  /* this one isn't real money yet
  {
    title: 'Will annual US CO2 emissions be below 4.5 billion tons in 2030?',
    harrisSlug: 'carbon-brief-forecast-if-harris-win',
    trumpSlug: 'carbon-brief-forecast-if-trump-wins',
  },
  */

  /*
  other ideas, from Metaculus
  - china invades taiwan
  - russia expanded territory in ukraine
  - 2nd amendment amended
  - national abortion ban
  - Iran obtains nuclear weapons
  */
]

async function fetchMarketData() {
  const marketPromises = MARKETS.flatMap((market) => [
    fetch(`https://api.manifold.markets/v0/slug/${market.harrisSlug}--cash`),
    fetch(`https://api.manifold.markets/v0/slug/${market.harrisSlug}`),
    fetch(`https://api.manifold.markets/v0/slug/${market.trumpSlug}--cash`),
    fetch(`https://api.manifold.markets/v0/slug/${market.trumpSlug}`),
  ])

  const responses = await Promise.all(marketPromises)
  const data = await Promise.all(responses.map((r) => r.json()))

  return MARKETS.map((market, i) => ({
    ...market,
    harrisData: data[i * 4],
    harrisManaData: data[i * 4 + 1],
    trumpData: data[i * 4 + 2],
    trumpManaData: data[i * 4 + 3],
  }))
}

export default async function PredictionMarkets() {
  const markets = await fetchMarketData()

  return <Gauges markets={markets} />
}
