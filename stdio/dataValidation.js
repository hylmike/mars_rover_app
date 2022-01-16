//Seperat data validation object to make data input validation configurable
const checkInput = {
  numRover: (input) => !!Number(input),
  roverName: (input) => !!input.trim(),
  plateauSize: (input) => {
    const pattern = /^\d+ \d+$/;
    return pattern.test(input);
  },
  landPara: (input, plot = [0, 0]) => {
    const pattern = /^\d+ \d+ [ESWN]$/;
    const para = input.split(' ');
    if (pattern.test(input)) {
      if ((plot[0] === 0 || Number(para[0]) <= plot[0]) ||
        (plot[1] === 0 || Number(para[1]) <= plot[1])) {
        return true;
      }
    }
    return false;
  },
  roverCommands: (input, roverPosition = [0, 0, 'E'], plot = [0, 0]) => {
    const commandList = input.split('');
    const pattern = /^[RLM]+$/;
    if (pattern.test(input)) {
      if (plot[0] + plot[1] > 0) {
        if (!validCommand(commandList, roverPosition, plot)) {
          return false;
        }
      }
      return true;
    };
    return false;
  }
}

const validCommand = (commandList, curPos, plot) => {
  let direction = ['E', 'S', 'W', 'N', 'E'];
  let x = curPos[0], y = curPos[1], dir = curPos[2];
  let outOfPlot = false;
  for (let i = 0; i < commandList.length; i++) {
    switch (commandList[i]) {
      case 'M':
        switch (dir) {
          case 'E':
            x += 1;
            break;
          case 'S':
            y -= 1;
            break;
          case 'W':
            x -= 1;
            break;
          case 'N':
            y += 1;
            break;
        }
        if (x > plot[0] || y > plot[1]) {
          console.log('Warning: Currrent command will move rover out of plateau');
          return false;
        }
        break;
      case 'L':
        dir = direction[direction.lastIndexOf(dir) - 1];
        break;
      case 'R':
        dir = direction[direction.indexOf(dir) + 1];
        break;
    }
  };
  return true;
}

export default checkInput;