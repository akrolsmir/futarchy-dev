'use client'

import { PredictionPair } from '@/types'
import React from 'react'

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

export default function Gauges({ markets }: { markets: PredictionPair[] }) {
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
