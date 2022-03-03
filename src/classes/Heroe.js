/**
 * Class representing a heroe.
 * @class
 * @constructor
 * @public
 *
 * @param {number} id The heroe's ID
 * @param {string} name The heroe's name
 * @param {string} description The heroe's description
 * @param {number} comics The number of comics where the hero is involved
 * @param {number} stories The number of stories where the hero is involved
 * @param {number} series The number of series where the hero is involved
 * @param {number} events The number of events where the hero is involved
 * @param {string} image The link of the heroe's illustration
 * @param {boolean} favorie The favorie status of the heroe
 */
export default class Heroe {
  constructor(
    id,
    name,
    description,
    comics,
    stories,
    series,
    events,
    image,
    favorie = false
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
    this.favorie = favorie;
  }

  /**
   * Make a short presentation of the heroe.
   *
   * @return {string} A string of this presentation
   */
  toString() {
    var ch = 'ID : ' + this.id;
    ch += '\nName : ' + this.name;
    return ch;
  }
}
