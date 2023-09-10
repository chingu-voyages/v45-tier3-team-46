export interface Picture {
  id: number
  url: string
  altText?: string
  item: Item
  itemId: number
}

export interface User {
  id: number
  name?: string
  username?: string
  password?: string
  email: string
  emailVerified: string
  itemsForSale: Item[]
  // itemsSold     query itemsForSale where sold: true
  itemsPurchased: Item[]
  // userAddresses   UserAddress[]
  addresses: Address[]
  image?: string
  accounts: Account[]
  sessions: Session[]
}
export interface Account {
  id: string
  user: User
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string
  access_token?: string
  expires_at?: number
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string
}

export interface Address {
  id: number
  street1: string
  street2: string
  city: string
  state: string
  zip: string
  addressType: string
  users: User[]
}

export interface Session {
  id: string
  sessionToken: string
  user: User
  userId: number
  expires: string
}

export interface Item {
  id: number
  title: string
  buyNowPrice?: number
  startingBid: number
  currentBid?: number
  description: string
  pictures: Picture[]
  seller: User
  sellerId: number
  sold: boolean
  purchasedBy?: User
  purchasedById?: number
  catergory: string
  condition: string
  createdAt: string
  updatedAt: string
  expiresAt: string
}


