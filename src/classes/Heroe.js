export class Heroe {
  constructor(id, name, description, comics, stories, series, events, image) {
    this.id = id;
    this.name = name;
    this.description == ""
      ? (this.description = "No description for this character.")
      : (this.description = description);
    this.comics = comics;
    this.stories = stories;
    this.series = series;
    this.events = events;
    this.image = image;
    this.favorie = false;
    console.log("okkkk");
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
