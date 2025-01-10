const NFTCard = ({ id, title, price, imageUrl, traits, collection }) => {
  return (
    <div className="overflow-hidden transition-transform duration-300 hover:-translate-y-1">
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
      <div className="p-4">
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
      </div>
    </div>
  );
};

export {NFTCard}