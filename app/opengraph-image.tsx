import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  // Font
  const geistSans = fetch(
    new URL('./fonts/Geist-Medium.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  const harrisAngle = 50
  const trumpAngle = 66

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        tw="w-full h-full flex flex-col items-center justify-center"
        style={{
          background: '#1E293B',
        }}
      >
        <div tw="text-white text-7xl font-bold text-center mb-6 tracking-tight">
          Policy Predictions
        </div>
        <div tw="flex text-gray-400 text-4xl text-center">
          See what the markets say about a
        </div>
        <div tw="flex flex-row text-gray-400 text-4xl text-center">
          <span tw="text-blue-500 mx-2">Harris</span>
          <span> vs </span>
          <span tw="text-red-500 mx-2">Trump</span>
          <span>presidency</span>
        </div>
        <div tw="relative w-96 h-48 mx-auto mt-16 flex">
          {/* put a full-opacity trump needle first, then a half-opacity one on top; so it looks normal when not overlapping, but don't fully cover Harris when it does overlap */}
          <div
            tw="absolute bottom-2 left-1/2 w-2 h-40 bg-red-500"
            style={{
              transformOrigin: 'bottom',
              transform: `translate(-50%, 0) rotate(${trumpAngle - 90}deg)`,
            }}
          />

          {/* Harris needle (blue) */}
          <div
            tw="absolute bottom-3 left-1/2 w-2 h-40 bg-blue-500"
            style={{
              transformOrigin: 'bottom',
              transform: `translate(-50%, 0) rotate(${harrisAngle - 90}deg)`,
            }}
          />

          {/* Trump needle (red) */}
          <div
            tw="absolute bottom-2 left-1/2 w-2 h-40 bg-red-500/50"
            style={{
              transformOrigin: 'bottom',
              transform: `translate(-50%, 0) rotate(${trumpAngle - 90}deg)`,
            }}
          />

          {/* Gauge background */}
          <div
            tw="absolute w-full h-full rounded-t-full border-8 border-gray-700"
            style={{ marginTop: '-4px' }}
          />

          {/* Percentage difference */}
          {/* <div
            tw={`flex flex-row items-center gap-1 absolute -top-10 left-1/2 -translate-x-1/2 font-bold ${
              isHarrisHigher ? 'text-blue-300' : 'text-red-300'
            }`}
          >
            <div tw="text-2xl">+{difference}%</div>
            <div tw="text-xs whitespace-nowrap">
              if {isHarrisHigher ? 'Harris' : 'Trump'}
            </div>
          </div> */}
        </div>

        <div tw="text-gray-600 text-4xl font-light text-center">
          policypredictions.com
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'Geist',
          data: await geistSans,
          style: 'normal',
          weight: 500,
        },
      ],
    }
  )
}
