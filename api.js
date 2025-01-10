
/**
 * 
 * @param {string} slug of collection to get prices for
 * @example uwupunk
 * @returns 
 * 
 * {
	"data": {
		"instrumentTV2": {
			"statsV2": {
				"currency": null,
				"buyNowPrice": "186000000",
				"sellNowPrice": "145000001",
				"numListed": 48,
				"numMints": 555,
				"floor1h": 0,
				"floor24h": 0.0641,
				"floor7d": 0.0629,
				"sales1h": 1,
				"sales24h": 15,
				"sales7d": 20,
				"salesAll": 600,
				"volume1h": "249000000",
				"volume24h": "11195466668",
				"volume7d": "11953632749",
				"volumeAll": "129644922305",
				"pctListed": 8.64864864864865,
				"marketCap": "103230000000"
			}
		}
	}
}
 */
  const getNftPrices = async (slug) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: '{\n  "query": "query Instrument($slug: String!) {\n  instrumentTV2(slug: $slug) {\n    ...ReducedInstrument\n    __typename\n  }\n}\n\nfragment ReducedInstrument on InstrumentTV2 {\n\n  statsV2 {\n    ...CollectionStatsV2\n  }\n\n}\n\nfragment CollectionStatsV2 on CollectionStatsV2 {\n  currency\n  buyNowPrice\n  sellNowPrice\n  numListed\n  numMints\n  floor1h\n  floor24h\n  floor7d\n  sales1h\n  sales24h\n  sales7d\n  salesAll\n  volume1h\n  volume24h\n  volume7d\n  volumeAll\n  pctListed\n  marketCap\n}",\n  "operationName": "Instrument",\n  "variables": {\n    "slug": "${slug}"\n  }\n}'
      };
      
    const result =  await fetch('https://graphql.tensor.trade/graphql', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

    return result
  }

  export {getNftPrices}