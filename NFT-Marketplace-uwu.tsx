import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Collection } from '../types';
import { themeConfig } from '../utils/theme';
import { fetchCollections } from '../utils/api';
import CollectionCard from './CollectionCard';
import ThemeToggle from './ThemeToggle';

const NFTMarketplace: React.FC = () => {
  const { mode } = useTheme();
  const [sliderIndex, setSliderIndex] = useState(0);
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    fetchCollections().then(setCollections);
  }, []);

  const slidePrev = useCallback(() => {
    setSliderIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : collections.length - 1));
  }, [collections.length]);

  const slideNext = useCallback(() => {
    setSliderIndex((prevIndex) => (prevIndex < collections.length - 1 ? prevIndex + 1 : 0));
  }, [collections.length]);

  return (
    <div className={`min-h-screen ${themeConfig[mode].background}`}>
      {/* Connect Wallet Button */}
      <button className={`fixed top-4 right-4 px-4 py-2 rounded-lg font-bold shadow-lg 
        ${themeConfig[mode].buttonBg} ${themeConfig[mode].buttonText}`}>
        <Wallet className="w-5 h-5 inline-block mr-2" />
        Connect Wallet
      </button>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-2 ${themeConfig[mode].accent}`}>
            {themeConfig[mode].icon} $UWU NFT Marketplace
          </h1>
          <p className={`text-lg ${themeConfig[mode].text}`}>
            ✧･ﾟ: *✧･ﾟ:* Trade Magical NFTs *:･ﾟ✧*:･ﾟ✧
          </p>
        </header>

        {/* Featured Collections Slider */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-6 ${themeConfig[mode].text}`}>
            Featured Collections
          </h2>
          <div className="relative">
            <button onClick={slidePrev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg">
              <ChevronLeft className={`w-6 h-6 ${themeConfig[mode].text}`} />
            </button>
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out gap-6"
                style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
              >
                {collections.map(collection => (
                  <div key={collection.id} className="w-full md:w-1/2 lg:w-1/3 flex-none">
                    <Link to={`/collections/${collection.slug}`}>
                      <CollectionCard collection={collection} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={slideNext} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg">
              <ChevronRight className={`w-6 h-6 ${themeConfig[mode].text}`} />
            </button>
          </div>
        </div>

        {/* All Collections Grid */}
        <div>
          <h2 className={`text-2xl font-bold mb-6 ${themeConfig[mode].text}`}>
            All Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map(collection => (
              <Link 
                key={collection.id}
                to={`/collections/${collection.slug}`}
                className="focus:outline-none focus:ring-2 focus:ring-current rounded-lg"
              >
                <CollectionCard collection={collection} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ThemeToggle />
    </div>
  );
};

export default NFTMarketplace;
