'use client'

import { PredictionPair } from '@/types'
import Link from 'next/link'
import React from 'react'

// Component to render a single gauge
function GaugeChart({ pair }: { pair: PredictionPair }) {
  const harrisPct = Math.round((pair.harrisData?.probability || 0) * 100)
  const trumpPct = Math.round((pair.trumpData?.probability || 0) * 100)
  const difference = Math.abs(harrisPct - trumpPct)
  const isHarrisHigher = harrisPct > trumpPct

  // Calculate angles for gauge needles (180 degrees = 100%)
  const harrisAngle = (harrisPct / 100) * 180
  const trumpAngle = (trumpPct / 100) * 180

  return (
    <div className="flex flex-col bg-gray-900 rounded-lg p-4 text-white">
      <h3 className="text-sm mb-6 h-12 leading-tight">{pair.title}</h3>
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
        <div
          className={`flex flex-row items-center gap-2 absolute -top-8 left-1/2 -translate-x-1/2 font-bold ${
            isHarrisHigher ? 'text-blue-300' : 'text-red-300'
          }`}
        >
          <div className="text-2xl">+{difference}%</div>
          <div className="text-xs whitespace-nowrap">
            if {isHarrisHigher ? 'Harris' : 'Trump'}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-between mt-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-1" />
          <Link
            href={pair.harrisData?.url || '#'}
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Harris {harrisPct}%</span>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-1" />
          <Link
            href={pair.trumpData?.url || '#'}
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Trump {trumpPct}%</span>
          </Link>
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
          {(pair.harrisData?.uniqueBettorCount || 0) +
            (pair.trumpData?.uniqueBettorCount || 0)}{' '}
          bettors
        </span>
      </div>
    </div>
  )
}

export default function Gauges({ markets }: { markets: PredictionPair[] }) {
  return (
    <div className="min-h-screen bg-black p-8">
      {/* Grid layout: 2 columns on mobile, 4 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {markets.map((pair, i) => (
          <GaugeChart key={i} pair={pair} />
        ))}
      </div>
    </div>
  )
}
