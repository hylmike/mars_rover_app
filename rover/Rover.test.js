import Rover from './Rover';

describe('the Rover class', () => {
  describe('constructor method', () => {
    const rover = new Rover('example');

    it('it should create new Rover instance', () => {
      expect(rover).toBeInstanceOf(Rover);
    })
  })

  describe('getter of info', () => {
    const rover = new Rover('example');

    it('it should get current information of rover', () => {
      expect(rover.info.name).toBe('example');
      expect(rover.info.position).toEqual({ x: 0, y: 0 });
      expect(rover.info.compassPoint).toEqual('E');
    })
  })

  describe('landing method', () => {
    const rover = new Rover('example');
    rover.landing(20, 10, 'N');

    it('it should set landing position and compass point of rover', () => {
      expect(rover.info.position).toEqual({ x: 20, y: 10 });
      expect(rover.info.compassPoint).toEqual('N');
    })
  })

  describe('move method', () => {
    const direction = ['E', 'S', 'W', 'N'];
    const roverList = [];
    for (let i=1; i<=4; i++) {
      const rover = new Rover(`example${i}`);
      rover.landing(20, 10, direction[i-1]);
      rover.move();
      roverList.push(rover);
    }

    it('it should set landing position and compass point of rover', () => {
      expect(roverList[0].info.position).toEqual({ x: 21, y: 10 });
      expect(roverList[1].info.position).toEqual({ x: 20, y: 9 });
      expect(roverList[2].info.position).toEqual({ x: 19, y: 10 });
      expect(roverList[3].info.position).toEqual({ x: 20, y: 11 });
    })
  })

  describe('steer method', () => {
    const rover1 = new Rover('example1');
    const rover2 = new Rover('example2');
    rover1.landing(20, 10, 'N');
    rover1.steer('L');
    rover2.landing(20, 10, 'S');
    rover2.steer('R');

    it('it should set landing position and compass point of rover', () => {
      expect(rover1.info.compassPoint).toEqual('W');
      expect(rover2.info.compassPoint).toEqual('W');
    })
  })
})