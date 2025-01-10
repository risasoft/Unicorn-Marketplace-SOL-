import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getNftPrices, getCollections } from "../api.js";
import { NFTCard } from "./NFTCard.js";

const CollectionPage = () => {
  const { collectionSlug } = useParams();
  const [nfts, setNFTs] = useState([]);
  const [stats, setStats] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCollections(collectionSlug, page).then(setNFTs);
    getNftPrices(collectionSlug).then(setStats);
  }, [collectionSlug, page]);

  return (
    <div className={`min-h-screen dark`}>
      <Link
        to="/"
        className={`fixed top-4 left-4 px-4 py-2 rounded-lg font-bold shadow-lg 
        dark `}
      >
        Back to Marketplace
      </Link>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-2 `}>
            {collectionSlug}
          </h1>
          {stats && (
            <div
              className={`flex justify-center gap-8 `}
            >
              <div>Floor Price: {stats.floorPrice} SOL</div>
              <div>Total Volume: {stats.totalVolume} SOL</div>
              <div>Listed: {stats.listedCount}</div>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className={`px-4 py-2 rounded-lg font-bold shadow-lg 
             `}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export { CollectionPage };
