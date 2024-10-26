'use client'

import React, { useEffect, useState } from 'react'

// Types for our prediction market data
type Market = {
  probability: number
  uniqueBettorCount: number
  volume: number
}

type PredictionPair = {
  title: string
  harrisSlug: string
  trumpSlug: string
  harrisData?: Market
  trumpData?: Market
}

// Market data array
const MARKETS: PredictionPair[] = [
  {
    title: 'Will undocumented immigration at the southern border go down?',
    harrisSlug: 'if-harris-wins-will-undocumented-im',
    trumpSlug: 'if-trump-wins-will-immigration-go-d',
  },
  {
    title: 'Will the president appoint another SCOTUS Justice before 2027?',
    harrisSlug: 'if-harris-wins-will-she-appoint-ano',
    trumpSlug: 'if-trump-wins-will-he-appoint-anoth',
  },
  {
    title: 'Will marijuana be federally rescheduled from Schedule 1 drug?',
    harrisSlug: 'if-harris-wins-will-marijuana-be-fe',
    trumpSlug: 'if-trump-wins-will-marijuana-be-fed',
  },
  {
    title: 'Will there be a ceasefire in Ukraine before the 2026 midterms?',
    harrisSlug: 'if-harris-is-elected-will-there-be-1bw27ghde1',
    trumpSlug: 'if-trump-is-elected-will-there-be-a-40ca39e5dcec',
  },
  {
    title:
      'Will there be an executive order or legislation focused on AI before the 2026 midterms?',
    harrisSlug: 'if-harris-is-elected-will-there-be-uve99bjbbo',
    trumpSlug: 'if-trump-is-elected-will-there-be-a-01a15c4aa239',
  },
  {
    title: 'Will gas prices stay under $4 a gallon before the midterms?',
    harrisSlug: 'if-harris-becomes-president-will-ga-rpkm0uqss8',
    trumpSlug: 'if-trump-becomes-president-will-gas',
  },
  {
    title: 'Will the inflation rate in 2025 be below 2.5%? (Current 3.2%)',
    harrisSlug: 'if-harris-wins-the-election-will-th',
    trumpSlug: 'if-trump-wins-the-election-will-the',
  },
  {
    title:
      'Will the US enter a recession before 2027? (as measured by Sahm rule)',
    harrisSlug: 'if-harris-wins-will-the-us-enter-a',
    trumpSlug: 'if-trump-wins-will-the-us-enter-a-r',
  },
  {
    title: 'Gallup satisfaction poll greater than Obama',
    harrisSlug: 'if-harris-becomes-president-will-sh',
    trumpSlug: 'if-trump-becomes-president-will-he',
  },
  {
    title: 'Will annual US CO2 emissions be below 4.5 billion tons in 2030?',
    harrisSlug: 'carbon-brief-forecast-if-harris-win',
    trumpSlug: 'carbon-brief-forecast-if-trump-wins',
  },
  {
    title: 'Will Donald Trump serve time in 2025?',
    harrisSlug: 'if-donald-trump-loses-the-election',
    trumpSlug: 'if-donald-trump-wins-the-election-w',
  },
]

// Component to render a single gauge
function GaugeChart({ pair }: { pair: PredictionPair }) {
  const harrisPct = Math.round((pair.harrisData?.probability || 0) * 100)
  const trumpPct = Math.round((pair.trumpData?.probability || 0) * 100)
  const difference = Math.abs(harrisPct - trumpPct)

  // Calculate angles for gauge needles (180 degrees = 100%)
  const harrisAngle = (harrisPct / 100) * 180
  const trumpAngle = (trumpPct / 100) * 180

  return (
    <div className="flex flex-col bg-gray-900 rounded-lg p-4 text-white">
      <h3 className="text-sm mb-4 h-12 leading-tight">{pair.title}</h3>
      <div className="relative w-48 h-24 mx-auto">
        {/* Gauge background */}
        <div className="absolute w-full h-full rounded-t-full border-4 border-gray-700" />

        {/* Harris needle (blue) */}
        <div
          className="absolute bottom-0 left-1/2 w-1 h-20 bg-blue-500 origin-bottom"
          style={{ transform: `rotate(${harrisAngle - 90}deg)` }}
        />

        {/* Trump needle (red) */}
        <div
          className="absolute bottom-0 left-1/2 w-1 h-20 bg-red-500 origin-bottom"
          style={{ transform: `rotate(${trumpAngle - 90}deg)` }}
        />

        {/* Percentage difference */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-2xl font-bold">
          {difference}%
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-between mt-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-1" />
          <span>Harris {harrisPct}%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-1" />
          <span>Trump {trumpPct}%</span>
        </div>
      </div>

      {/* Market stats */}
      <div className="mt-2 text-xs text-gray-400 flex justify-between">
        <span>
          Vol: $
          {Math.round(
            (pair.harrisData?.volume || 0) + (pair.trumpData?.volume || 0)
          )}
        </span>
        <span>
          Bettors:{' '}
          {Math.max(
            pair.harrisData?.uniqueBettorCount || 0,
            pair.trumpData?.uniqueBettorCount || 0
          )}
        </span>
      </div>
    </div>
  )
}

export default function Component() {
  const [markets, setMarkets] = useState<PredictionPair[]>(MARKETS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Fetch all market data in parallel
        const marketPromises = markets.flatMap((market) => [
          fetch(`https://api.manifold.markets/v0/slug/${market.harrisSlug}`),
          fetch(`https://api.manifold.markets/v0/slug/${market.trumpSlug}`),
        ])

        const responses = await Promise.all(marketPromises)
        const data = await Promise.all(responses.map((r) => r.json()))

        // Update markets with fetched data
        const updatedMarkets = [...markets]
        for (let i = 0; i < markets.length; i++) {
          updatedMarkets[i] = {
            ...markets[i],
            harrisData: data[i * 2],
            trumpData: data[i * 2 + 1],
          }
        }

        setMarkets(updatedMarkets)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch market data')
        setLoading(false)
      }
    }

    fetchMarketData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-2xl font-bold text-white mb-8">
        Futarchy Gauge: 2024 Election Predictions
      </h1>

      {/* Grid layout: 4-3-4 pattern */}
      <div className="grid gap-6">
        {/* First row */}
        <div className="grid grid-cols-4 gap-6">
          {markets.slice(0, 4).map((pair, i) => (
            <GaugeChart key={i} pair={pair} />
          ))}
        </div>

        {/* Middle row */}
        <div className="grid grid-cols-3 gap-6 mx-auto w-3/4">
          {markets.slice(4, 7).map((pair, i) => (
            <GaugeChart key={i} pair={pair} />
          ))}
        </div>

        {/* Last row */}
        <div className="grid grid-cols-4 gap-6">
          {markets.slice(7, 11).map((pair, i) => (
            <GaugeChart key={i} pair={pair} />
          ))}
        </div>
      </div>
    </div>
  )
}
