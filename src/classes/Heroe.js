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
    description == ""
      ? (this.description = "No description for this character.")
      : (this.description = description);
    this.comics = comics;
    this.stories = stories;
    this.series = series;
    this.events = events;
    this.image = image;
    this.favorie = favorie;
  }

  toggleFavorie() {
    this.favorie = !this.favorie;
  }

  toString() {
    var ch = "ID : " + this.id;
    ch += "\nName : " + this.name;

    return ch;
  }
}
