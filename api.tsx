import { Collection, NFT, CollectionStats } from '../types';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API URL

export async function fetchWithCache<T>(url: string, cacheKey: string, expirationMinutes = 5): Promise<T> {
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const { timestamp, data } = JSON.parse(cachedData);
    if (Date.now() - timestamp < expirationMinutes * 60 * 1000) {
      return data as T;
    }
  }

  const response = await fetch(url);
  const data = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
  return data as T;
}

export async function fetchCollections(): Promise<Collection[]> {
  return fetchWithCache(`${API_BASE_URL}/collections`, 'collections');
}

export async function fetchCollectionNFTs(collectionSlug: string, page: number): Promise<NFT[]> {
  return fetchWithCache(`${API_BASE_URL}/collections/${collectionSlug}/nfts?page=${page}`, `nfts_${collectionSlug}_${page}`);
}

export async function fetchCollectionStats(collectionSlug: string): Promise<CollectionStats> {
  return fetchWithCache(`${API_BASE_URL}/collections/${collectionSlug}/stats`, `stats_${collectionSlug}`);
}
