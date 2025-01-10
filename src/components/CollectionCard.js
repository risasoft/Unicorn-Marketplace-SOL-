const CollectionCard = ({ name, description, floorPrice, volume, bannerUrl }) => (
  <div className="w-full shrink-0 snap-center">
    <div className="relative h-48 overflow-hidden rounded-t-lg">
      <img 
        src={bannerUrl || "/api/placeholder/400/200"} 
        alt={name} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{name}</h3>
    </div>
    <div className="p-4">
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
    </div>
  </div>
);

export {CollectionCard}