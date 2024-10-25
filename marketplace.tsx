import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

// Featured Collection Card Component
const CollectionCard = ({ name, description, floorPrice, volume, bannerUrl }) => (
  <Card className="w-full shrink-0 snap-center">
    <div className="relative h-48 overflow-hidden rounded-t-lg">
      <img 
        src={bannerUrl || "/api/placeholder/400/200"} 
        alt={name} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{name}</h3>
    </div>
    <CardContent className="p-4">
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{description}</p>
      <div className="flex justify-between text-sm">
        <div>
          <p className="text-gray-500">Floor Price</p>
          <p className="font-bold text-pink-500">{floorPrice} $UWU</p>
        </div>
        <div>
          <p className="text-gray-500">24h Volume</p>
          <p className="font-bold text-pink-500">{volume} $UWU</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Collection Grid for individual collection pages
const CollectionGrid = ({ collectionName, items }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <ChevronLeft 
        className="h-8 w-8 cursor-pointer hover:text-pink-500" 
        onClick={() => window.history.back()}
      />
      <h2 className="text-3xl font-bold">{collectionName}</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(item => (
        <NFTCard key={item.id} {...item} />
      ))}
    </div>
  </div>
);

// NFT Card Component (enhanced)
const NFTCard = ({ id, title, price, imageUrl, traits, collection }) => {
  return (
    <Card className="overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="relative pt-[100%]">
        <img 
          src={imageUrl} 
          alt={title} 
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded-full">
          <p className="text-xs text-white">{collection}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        {traits && (
          <div className="flex flex-wrap gap-2 mb-3">
            {Object.entries(traits).slice(0, 3).map(([key, value]) => (
              <span key={key} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                {key}: {value}
              </span>
            ))}
          </div>
        )}
        <p className="text-pink-500 text-xl mb-3">{price} $UWU</p>
        <button className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-200">
          Buy Now
        </button>
      </CardContent>
    </Card>
  );
};

// Main Marketplace Component
const NFTMarketplace = () => {
  const [mode, setMode] = useState('light');
  const [activeCollection, setActiveCollection] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(0);

  // Sample collections data
  const collections = [
    {
      id: 1,
      name: "UwU Punks",
      description: "10,000 uniquely generated punk characters with proof of ownership on Solana blockchain",
      floorPrice: 45,
      volume: 12500,
      bannerUrl: "/api/placeholder/400/200"
    },
    {
      id: 2,
      name: "Magical Cats",
      description: "A collection of 5,000 magical cats with unique powers and traits",
      floorPrice: 30,
      volume: 8900,
      bannerUrl: "/api/placeholder/400/200"
    },
    {
      id: 3,
      name: "UniPuppets",
      description: "Adorable puppet characters living on the blockchain",
      floorPrice: 25,
      volume: 6700,
      bannerUrl: "/api/placeholder/400/200"
    }
  ];

  // Sample NFTs data
  const nftsByCollection = {
    "UwU Punks": [
      { id: 1, title: "UwU Punk #123", price: 50, imageUrl: "/api/placeholder/200/200", collection: "UwU Punks", traits: { Background: "Cosmic", Hair: "Purple Mohawk", Eyes: "Laser" } },
      { id: 2, title: "UwU Punk #456", price: 75, imageUrl: "/api/placeholder/200/200", collection: "UwU Punks", traits: { Background: "Neon", Hair: "Pink Spikes", Eyes: "Rainbow" } },
    ],
    "Magical Cats": [
      { id: 3, title: "Magic Cat #789", price: 120, imageUrl: "/api/placeholder/200/200", collection: "Magical Cats", traits: { Magic: "Fire", Fur: "Golden", Accessory: "Wizard Hat" } },
      { id: 4, title: "Magic Cat #101", price: 90, imageUrl: "/api/placeholder/200/200", collection: "Magical Cats", traits: { Magic: "Ice", Fur: "Blue", Accessory: "Crystal" } },
    ]
  };

  const bgColors = {
    light: 'bg-white',
    dark: 'bg-purple-900',
    dusk: 'bg-purple-800'
  };

  const textColors = {
    light: 'text-gray-900',
    dark: 'text-pink-100',
    dusk: 'text-pink-200'
  };

  const slideNext = () => {
    setSliderIndex((prev) => 
      prev === collections.length - 1 ? 0 : prev + 1
    );
  };

  const slidePrev = () => {
    setSliderIndex((prev) => 
      prev === 0 ? collections.length - 1 : prev - 1
    );
  };

  return (
    <div className={`min-h-screen ${bgColors[mode]} ${textColors[mode]} transition-colors duration-300`}>
      <button className="fixed top-4 right-4 bg-pink-100 border-2 border-pink-700 px-4 py-2 rounded-lg font-bold shadow-lg hover:-translate-y-0.5 transition-transform duration-200">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          <span>Connect Wallet</span>
        </div>
      </button>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pink-500 mb-2">$UWU NFT Marketplace</h1>
          <p className="text-lg">✧･ﾟ: *✧･ﾟ:* Trade Magical NFTs *:･ﾟ✧*:･ﾟ✧</p>
        </header>

        {!activeCollection ? (
          <>
            {/* Featured Collections Slider */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>
              <div className="relative">
                <button 
                  onClick={slidePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-out gap-6"
                    style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
                  >
                    {collections.map(collection => (
                      <div key={collection.id} className="w-full md:w-1/2 lg:w-1/3 flex-none">
                        <div 
                          onClick={() => setActiveCollection(collection.name)}
                          className="cursor-pointer"
                        >
                          <CollectionCard {...collection} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={slideNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* All Collections Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6">All Collections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map(collection => (
                  <div 
                    key={collection.id}
                    onClick={() => setActiveCollection(collection.name)}
                    className="cursor-pointer"
                  >
                    <CollectionCard {...collection} />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <CollectionGrid 
            collectionName={activeCollection}
            items={nftsByCollection[activeCollection] || []}
          />
        )}
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white p-2 rounded-full shadow-lg">
        {['light', 'dark', 'dusk'].map(modeOption => (
          <button
            key={modeOption}
            onClick={() => setMode(modeOption)}
            className={`px-4 py-2 rounded-full capitalize ${
              mode === modeOption ? 'bg-pink-100 text-pink-700' : 'hover:bg-gray-100'
            }`}
          >
            {modeOption}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NFTMarketplace;
