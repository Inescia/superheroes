import axios from 'axios';

/**
 * This function retrieves X heroes according to the query.
 * If the request is not the last one, the function returns 100 heroes.
 *
 * @param {number} request the request number (used to calculate the offset)
 * @returns {Promise<array>} the array of heroes resulting from the query
 */
export async function fetchHeroesAPI(request) {
  let results = null;
  await axios
    .get('https://gateway.marvel.com:443/v1/public/characters', {
      params: {
        apikey: '63d88a90e7b60aab17a222dfb0cc1c2d',
        hash: '903eb3762b126f0030eca4a24bd41ff0',
        limit: 100,
        offset: 100 * request,
        ts: '1',
      },
    })
    .then((response) => {
      results = response.data.data.results;
    })
    .catch((e) => {
      console.log(e);
    });
  return results;
}

/**
 * This function retrieves a hero according to its ID.
 *
 * @param {number} id the ID of the hero researched
 * @returns {Promise<array>} an array with the corresponding hero or an empty array
 */
export async function fetchHeroByIdAPI(id) {
  let results = null;
  await axios
    .get('https://gateway.marvel.com:443/v1/public/characters', {
      params: {
        apikey: '63d88a90e7b60aab17a222dfb0cc1c2d',
        hash: '903eb3762b126f0030eca4a24bd41ff0',
        id: id,
        ts: '1',
      },
    })
    .then((response) => {
      results = response.data.data.results;
    })
    .catch((e) => {
      console.log(e);
    });
  return results;
}
