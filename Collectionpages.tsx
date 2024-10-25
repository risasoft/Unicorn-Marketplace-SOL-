import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { themeConfig } from '../utils/theme';
import { fetchCollectionNFTs, fetchCollectionStats } from '../utils/api';
import { NFT, CollectionStats } from '../types';
import NFTCard from './NFTCard';
import ThemeToggle from './ThemeToggle';

const CollectionPage: React.FC = () => {
  const { collectionSlug } = useParams<{ collectionSlug: string }>();
  const { mode } = useTheme();
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [stats, setStats] = useState<CollectionStats | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCollectionNFTs(collectionSlug, page).then(setNFTs);
    fetchCollectionStats(collectionSlug).then(setStats);
  }, [collectionSlug, page]);

  return (
    <div className={`min-h-screen ${themeConfig[mode].background}`}>
      <Link to="/" className={`fixed top-4 left-4 px-4 py-2 rounded-lg font-bold shadow-lg 
        ${themeConfig[mode].buttonBg} ${themeConfig[mode].buttonText}`}>
        Back to Marketplace
      </Link>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-2 ${themeConfig[mode].accent}`}>
            {collectionSlug}
          </h1>
          {stats && (
            <div className={`flex justify-center gap-8 ${themeConfig[mode].text}`}>
              <div>Floor Price: {stats.floorPrice} SOL</div>
              <div>Total Volume: {stats.totalVolume} SOL</div>
              <div>Listed: {stats.listedCount}</div>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nfts.map(nft => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setPage(prev => prev + 1)}
            className={`px-4 py-2 rounded-lg font-bold shadow-lg 
              ${themeConfig[mode].buttonBg} ${themeConfig[mode].buttonText}`}
          >
            Load More
          </button>
        </div>
      </div>

      <ThemeToggle />
    </div>
  );
};

export default CollectionPage;
