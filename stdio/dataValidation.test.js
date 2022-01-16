import checkInput from "./dataValidation";

describe('the dataValidation object', () => {
  describe('numRover input validate function', () => {
    it('should return true/false with valid/invalid inputs', () => {
      expect(checkInput.numRover(fakeInputs.rover_quantity_valid)).toEqual(true);
      expect(checkInput.numRover(fakeInputs.rover_quantity_invalid)).toEqual(false);
    });
  });

  describe('roverName input validate function', () => {
    it('should return true/false with valid/invalid inputs', () => {
      expect(checkInput.roverName(fakeInputs.rover_name_valid)).toEqual(true);
      expect(checkInput.roverName(fakeInputs.rover_name_invalid)).toEqual(false);
    });
  });

  describe('plateauSize input validate function', () => {
    it('should return true/false with valid/invalid inputs', () => {
      expect(checkInput.plateauSize(fakeInputs.plateau_size_valid)).toEqual(true);
      expect(checkInput.plateauSize(fakeInputs.plateau_size_invalid1)).toEqual(false);
      expect(checkInput.plateauSize(fakeInputs.plateau_size_invalid2)).toEqual(false);
    });
  });

  describe('landPara input validate function', () => {
    it('should return true/false with valid/invalid inputs', () => {
      expect(checkInput.landPara(fakeInputs.landing_para_valid)).toEqual(true);
      expect(checkInput.landPara(fakeInputs.landing_para_invalid1)).toEqual(false);
      expect(checkInput.landPara(fakeInputs.landing_para_invalid2)).toEqual(false);
      expect(checkInput.landPara(fakeInputs.landing_para_invalid3)).toEqual(false);
      expect(checkInput.landPara(fakeInputs.landing_para_invalid4)).toEqual(false);
    });
  });

  describe('roverCommands input validate function', () => {
    const roverLandPara = [20, 10, 'N'];
    const plateauSize = [30, 20];

    it('should return true/false with valid/invalid inputs', () => {
      expect(checkInput.roverCommands(
        fakeInputs.rover_commands_valid,
        roverLandPara, plateauSize)
      ).toEqual(true);
      expect(checkInput.roverCommands(
        fakeInputs.rover_commands_invalid1,
        roverLandPara, plateauSize)
      ).toEqual(false);
      expect(checkInput.roverCommands(
        fakeInputs.rover_commands_invalid2,
        roverLandPara, plateauSize)
      ).toEqual(false);
    });
  });
})

const fakeInputs = {
  rover_quantity_valid: '2',
  rover_quantity_invalid: 'a',
  rover_name_valid: 'rover1',
  rover_name_invalid: ' ',
  plateau_size_valid: '100 100',
  plateau_size_invalid1: '100 100 30',
  plateau_size_invalid2: '100a 100',
  landing_para_valid: '20 10 N',
  landing_para_invalid1: '20 10 N R',
  landing_para_invalid2: '20 10 K',
  landing_para_invalid3: '20 10 NE',
  landing_para_invalid4: '20a 10 S',
  rover_commands_valid: 'RMMMMLMM',
  rover_commands_invalid1: "RMMKMM",
  rover_commands_invalid2: "RMRMMLMMMMMMMMMM",
}