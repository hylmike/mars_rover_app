//Rover class encapsulated with basic properities and methods
class Rover {
  constructor(name) {
    this._name = name;
    this._position = { x: 0, y: 0 };
    this._compassPoint = 'E';
  }

  landing(coordinX, coordinY, compassPoint) {
    this._position = { x: coordinX, y: coordinY };
    this._compassPoint = compassPoint;
  }

  move() {
    switch (this._compassPoint) {
      case 'N':
        this._position.y += 1;
        break;
      case 'E':
        this._position.x += 1;
        break;
      case 'S':
        this._position.y -= 1;
        break;
      case 'W':
        this._position.x -= 1;
    }
  }

  steer(direction) {
    const direct = ['E', 'S', 'W', 'N', 'E'];

    if (direction === 'L') {
      const index = direct.lastIndexOf(this._compassPoint);
      this._compassPoint = direct[index - 1];
    } else if (direction === 'R') {
      const index = direct.indexOf(this._compassPoint);
      this._compassPoint = direct[index + 1];
    } else {
      console.log('Wrong input for rover steering');
    }
  }

  get info() {
    return { name: this._name, position: this._position, compassPoint: this._compassPoint };
  }
}

export default Rover;