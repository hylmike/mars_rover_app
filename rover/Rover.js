//Rover class encapsulated with basic properities and methods
class Rover {
  constructor(name) {
    this.name = name;
    this.position = { x: 0, y: 0 };
    this.compassPoint = 'E';
  }

  landing(coordinX, coordinY, compassPoint) {
    this.position = { x: coordinX, y: coordinY };
    this.compassPoint = compassPoint;
  }

  move() {
    switch (this.compassPoint) {
      case 'N':
        this.position.y += 1;
        break;
      case 'E':
        this.position.x += 1;
        break;
      case 'S':
        this.position.y -= 1;
        break;
      case 'W':
        this.position.x -= 1;
    }
  }

  steer(direction) {
    const direct = ['E', 'S', 'W', 'N', 'E'];

    if (direction === 'L') {
      const index = direct.lastIndexOf(this.compassPoint);
      this.compassPoint = direct[index - 1];
    } else if (direction === 'R') {
      const index = direct.indexOf(this.compassPoint);
      this.compassPoint = direct[index + 1];
    } else {
      console.log('Wrong input for rover steering');
    }
  }

  get info() {
    return { name: this.name, position: this.position, compassPoint: this.compassPoint };
  }
}

export default Rover;