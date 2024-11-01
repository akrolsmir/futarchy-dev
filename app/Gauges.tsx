'use client'

import { PredictionPair } from '@/types'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

// const hurdleRate = 0.0541 // 5% annualized after fees
const hurdleRate = 0.058 // 10% annualized after fees
const pTrump = 0.61 // todo grab programmatically

// Component to render a single gauge
function GaugeChart({ pair }: { pair: PredictionPair }) {
  const harrisPct = Math.round((pair.harrisData?.probability || 0) * 100)
  const trumpPct = Math.round((pair.trumpData?.probability || 0) * 100)
  const difference = Math.abs(harrisPct - trumpPct)
  const isHarrisHigher = harrisPct > trumpPct

  const harrisAngleFinal = (harrisPct / 100) * 180
  const trumpAngleFinal = (trumpPct / 100) * 180
  const midpoint = (harrisAngleFinal + trumpAngleFinal) / 2
  // probabilities
  const harrisUpperBound = Math.min(
    1,
    (pair.harrisData?.probability ?? 0) +
      (hurdleRate * (pair.harrisData?.probability ?? 0)) / (1 - pTrump)
  )
  const harrisLowerBound = Math.max(
    0,
    (pair.harrisData?.probability ?? 0) -
      (hurdleRate * (1 - (pair.harrisData?.probability ?? 0))) / (1 - pTrump)
  )
  const trumpUpperBound = Math.min(
    1,
    (pair.trumpData?.probability ?? 0) +
      (hurdleRate * (pair.trumpData?.probability ?? 0)) / pTrump
  )
  const trumpLowerBound = Math.max(
    0,
    (pair.trumpData?.probability ?? 0) -
      (hurdleRate * (1 - (pair.trumpData?.probability ?? 0))) / pTrump
  )

  const [harrisAngle, setHarrisAngle] = useState(midpoint)
  const [trumpAngle, setTrumpAngle] = useState(midpoint)
  const [harrisUpperBoundAngle, setHarrisUpperBoundAngle] = useState(midpoint)
  const [harrisLowerBoundAngle, setHarrisLowerBoundAngle] = useState(midpoint)
  const [trumpUpperBoundAngle, setTrumpUpperBoundAngle] = useState(midpoint)
  const [trumpLowerBoundAngle, setTrumpLowerBoundAngle] = useState(midpoint)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHarrisAngle(harrisAngleFinal)
      setTrumpAngle(trumpAngleFinal)
      setHarrisUpperBoundAngle(harrisUpperBound * 180)
      setHarrisLowerBoundAngle(harrisLowerBound * 180)
      setTrumpUpperBoundAngle(trumpUpperBound * 180)
      setTrumpLowerBoundAngle(trumpLowerBound * 180)
    }, 100)

    return () => clearTimeout(timer)
  }, [
    harrisAngleFinal,
    trumpAngleFinal,
    harrisUpperBoundAngle,
    harrisLowerBoundAngle,
    trumpUpperBoundAngle,
    trumpLowerBoundAngle,
  ])

  return (
    <div className="flex flex-col bg-foreground rounded-lg p-4 text-white min-w-[280px]">
      <h3 className="mb-1 leading-tight font-bold text-lg">{pair.title}</h3>
      <p className="text-xs text-gray-400 font-light leading-snug h-6">
        {pair.description}
      </p>
      <div className="relative w-48 h-24 mx-auto mt-12">
        {/* Harris confidence interval arc */}
        <div
          className="absolute bottom-1 left-1/2 w-40 h-40 -ml-20 -mb-20"
          style={{
            background: `conic-gradient(
              transparent ${harrisLowerBoundAngle}deg,
              rgba(59, 130, 246, 0.4) ${harrisLowerBoundAngle}deg,
              rgba(59, 130, 246, 0.4) ${harrisUpperBoundAngle}deg,
              transparent ${harrisUpperBoundAngle}deg
            )`,
            borderRadius: '50%',
            transform: 'rotate(-90deg)',
          }}
        />

        {/* Trump confidence interval arc */}
        <div
          className="absolute bottom-1 left-1/2 w-40 h-40 -ml-20 -mb-20"
          style={{
            background: `conic-gradient(
              transparent ${trumpLowerBoundAngle}deg,
              rgba(239, 68, 68, 0.3) ${trumpLowerBoundAngle}deg,
              rgba(239, 68, 68, 0.3) ${trumpUpperBoundAngle}deg,
              transparent ${trumpUpperBoundAngle}deg
            )`,
            borderRadius: '50%',
            transform: 'rotate(-90deg)',
          }}
        />

        {/* put a full-opacity trump needle first, then a half-opacity one on top; so it looks normal when not overlapping, but don't fully cover Harris when it does overlap */}
        <div
          className="absolute bottom-1 left-1/2 w-1 h-20 bg-red-500 origin-bottom transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(-50%, 0) rotate(${trumpAngle - 90}deg)`,
          }}
        />

        {/* Harris needle (blue) */}
        <div
          className="absolute bottom-1 left-1/2 w-1 h-20 bg-blue-500 origin-bottom transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(-50%, 0) rotate(${harrisAngle - 90}deg)`,
          }}
        />

        {/* Trump needle (red) */}
        <div
          className="absolute bottom-1 left-1/2 w-1 h-20 bg-red-500/50 origin-bottom transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(-50%, 0) rotate(${trumpAngle - 90}deg)`,
          }}
        />

        {/* Gauge background */}
        <div
          className="absolute w-full h-full rounded-t-full border-4 border-gray-700"
          style={{ marginTop: '-2px' }}
        />

        {/* Percentage difference */}
        <div
          className={`flex flex-row items-center gap-1 absolute -top-10 left-1/2 -translate-x-1/2 font-bold ${
            isHarrisHigher ? 'text-blue-300' : 'text-red-300'
          }`}
        >
          <div className="text-2xl">+{difference}%</div>
          <div className="text-xs whitespace-nowrap">
            chance if {isHarrisHigher ? 'Harris' : 'Trump'}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-between mt-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-1" />
          <Link
            href={pair.harrisData?.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="underline decoration-dotted underline-offset-2 hover:decoration-solid">
              Harris {harrisPct}%
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-1" />
          <Link
            href={pair.trumpData?.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="underline decoration-dotted underline-offset-2 hover:decoration-solid">
              Trump {trumpPct}%
            </span>
          </Link>
        </div>
      </div>

      {/* Market stats */}
      <div className="mt-2 text-xs text-gray-400 flex justify-between">
        <span>
          $
          {Math.round(
            (pair.harrisData?.volume || 0) +
              (pair.harrisManaData?.volume || 0) / 100 +
              (pair.trumpManaData?.volume || 0) / 100 +
              (pair.trumpData?.volume || 0)
          )}{' '}
          traded
        </span>
        <span>
          {(pair.harrisData?.uniqueBettorCount || 0) +
            (pair.harrisManaData?.uniqueBettorCount || 0) +
            (pair.trumpManaData?.uniqueBettorCount || 0) +
            (pair.trumpData?.uniqueBettorCount || 0)}{' '}
          traders
        </span>
      </div>
    </div>
  )
}

export default function Gauges({ markets }: { markets: PredictionPair[] }) {
  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-6 justify-center">
        {markets.map((pair, i) => (
          <div key={i} className="animate-fadeIn grow basis-80 max-w-md">
            <GaugeChart pair={pair} />
          </div>
        ))}
      </div>
    </div>
  )
}
