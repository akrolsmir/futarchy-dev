import { fetchMarketData } from '@/app/PredictionMarkets'

// Write out the data to a file like markets-2024-10-31T12-00-00Z.json, via Bun
const markets = await fetchMarketData()
const timestamp = new Date().toISOString()
const filename = `data/markets-${timestamp}.ts`
const content = `export const data = ${JSON.stringify(markets, null, 2)}`
await Bun.write(filename, content)
console.log(`Wrote ${markets.length} markets to ${filename}`)
// Also overwrite "data/markets-latest.ts"
await Bun.write('data/markets-latest.ts', content)
