import { ChevronLeft } from 'lucide-react';
import {NFTCard} from './NFTCard'

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

export {CollectionGrid}