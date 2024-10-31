export type PredictionPair = {
  title: string
  harrisSlug: string
  trumpSlug: string
  harrisData?: BinaryMarket
  harrisManaData?: BinaryMarket
  trumpData?: BinaryMarket
  trumpManaData?: BinaryMarket
}

// Most relevant fields are probability, uniqueBettorCount, volume
export type BinaryMarket = {
  id: string
  creatorId: string
  creatorUsername: string
  creatorName: string
  createdTime: number
  creatorAvatarUrl: string
  closeTime: number
  question: string
  slug: string
  url: string
  pool: {
    NO: number
    YES: number
  }
  probability: number
  p: number
  totalLiquidity: number
  outcomeType: string
  mechanism: string
  volume: number
  volume24Hours: number
  isResolved: boolean
  uniqueBettorCount: number
  lastUpdatedTime: number
  lastBetTime: number
  lastCommentTime: number
  marketTier: string
  token: string
  description: any // Assuming this can be any type of object
  groupSlugs: string[]
  textDescription: string
}
