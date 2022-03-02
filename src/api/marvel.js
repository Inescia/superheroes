import axios from 'axios'

export async function fetchHeroesAPI (request) {
  var results = null
  await axios
    .get('https://gateway.marvel.com:443/v1/public/characters', {
      params: {
        apikey: '63d88a90e7b60aab17a222dfb0cc1c2d',
        hash: '903eb3762b126f0030eca4a24bd41ff0',
        limit: 100,
        // name: "Jean Grey",
        offset: 100 * request,
        ts: '1'
      }
    })
    .then((response) => {
      results = response.data.data.results
    })
    .catch((e) => {
      console.log(e)
    })
  return results
}

// export async function fetchHeroesAPI() {
//   var request = 0,
//     isFinished = true;
//   var results = [];

//   do {
//     await axios
//       .get("https://gateway.marvel.com:443/v1/public/characters", {
//         params: {
//           apikey: "63d88a90e7b60aab17a222dfb0cc1c2d",
//           hash: "903eb3762b126f0030eca4a24bd41ff0",
//           limit: 100,
//           //name: "Jean Grey",

//           offset: 100 * request,
//           ts: "1",
//         },
//       })
//       .then((response) => {
//         results = results.concat(response.data.data.results);
//         response.data.data.results.length == 0
//           ? (isFinished = true)
//           : (isFinished = false);
//         console.log(request);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//     request++;
//   } while (!isFinished);
//   return results;
// }

// exemple
export async function searchHeroeAPI ({ commit }, name) {
  axios
    .get('https://gateway.marvel.com:443/v1/public/characters', {
      params: {
        apikey: '63d88a90e7b60aab17a222dfb0cc1c2d',
        hash: '903eb3762b126f0030eca4a24bd41ff0',
        name: name,
        ts: '1'
      }
    })
    .then((response) => {
      commit('receiveHeroes', { heroes: response.data.data.results })
    })
    .catch((e) => {
      console.log(e)
    })
}
