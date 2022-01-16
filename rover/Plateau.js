//Plateau class encapsulated with basic properities and methods
class Plateau {
  constructor(point_X, point_Y) {
    this.length = point_X;
    this.width = point_Y;
  }

  get size() {
    return {length: this.length, width: this.width};
  }
}

export default Plateau;