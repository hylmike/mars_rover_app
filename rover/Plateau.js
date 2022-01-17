//Plateau class encapsulated with basic properities and methods
class Plateau {
  constructor(point_X, point_Y) {
    this._length = point_X;
    this._width = point_Y;
  }

  get size() {
    return {length: this._length, width: this._width};
  }
}

export default Plateau;