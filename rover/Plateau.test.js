import Plateau from './Plateau';

describe('the Plateau class', () => {
  describe('constructor method', () => {
    const plat = new Plateau(100, 100);

    it('it should create new Plateau instance', () => {
      expect(plat).toBeInstanceOf(Plateau);
    })
  })

  describe('getter of size', () => {
    const plat = new Plateau(100, 100);

    it('it should return size of Plateau', () => {
      expect(plat.size).toEqual({ length: 100, width: 100 });
    })
  })
})