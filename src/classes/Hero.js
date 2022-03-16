/**
 * Class representing a hero.
 * @class
 * @constructor
 * @public
 *
 * @param {number} id The hero's ID
 * @param {string} name The hero's name
 * @param {string} description The hero's description
 * @param {number} comics The number of comics where the hero is involved
 * @param {number} stories The number of stories where the hero is involved
 * @param {number} series The number of series where the hero is involved
 * @param {number} events The number of events where the hero is involved
 * @param {string} image The link of the hero's illustration
 * @param {boolean} favorite The favorite status of the hero
 */
export default class Hero {
  constructor(
    id,
    name,
    description,
    comics,
    stories,
    series,
    events,
    image,
    favorite = false
  ) {
    this.id = id;
    this.name = name;
    description == ''
      ? (this.description = 'No description for this character.')
      : (this.description = description);
    this.comics = comics;
    this.stories = stories;
    this.series = series;
    this.events = events;
    this.image = image;
    this.favorite = favorite;
  }

  /**
   * Make a short presentation of the hero.
   *
   * @return {string} A string of this presentation
   */
  toString() {
    return 'ID : ' + this.id + '\nName : ' + this.name;
  }
}
