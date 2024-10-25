export interface Collection {
  id: string;
  name: string;
  description: string;
  floorPrice: number;
  volume: number;
  bannerUrl: string;
  slug: string;
}

export interface NFT {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  traits?: Record<string, string>;
  collection: string;
}

export interface CollectionStats {
  floorPrice: number;
  totalVolume: number;
  listedCount: number;
}

export type ThemeMode = 'light' | 'dark' | 'dusk';
