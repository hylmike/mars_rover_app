import rl from './stdio/readTerminal.js';
import Plateau from './rover/Plateau.js';
import Rover from './rover/Rover.js';
import checkInput from './stdio/dataValidation.js';
import url from 'url';

//Wrap readline.question with Promise, then later we can use await to call them sequentially
const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer))
  });
}

//Wrap readline.on with Promise, to simplify the code structure
const onLineInput = () => {
  return new Promise((resolve) => {
    rl.on('line', (input) => resolve(input));
  })
}

//Function for rover steering, also check if steering command is safe or not
const steerRover = async (rover, [platLength, platWidth]) => {
  let commands = await askQuestion(`${rover.info.name} Instructions: `);
  while (!checkInput.roverCommands(
    commands,
    [rover.info.position.x, rover.info.position.y, rover.info.compassPoint],
    [platLength, platWidth])) {
    commands = await askQuestion('Invalid input, please input again: ');
  }
  const commandList = commands.split('');
  commandList.forEach((command) => {
    if (command === 'M') {
      rover.move();
    } else {
      rover.steer(command);
    }
  })
}

//Main fucntion of app
const main = async () => {
  const initial_msg = 'Welcome to Mar Rover App! With this app you can deploy rovers on the Mar and steer them around\n';
  const instruction = '\n\nPress "c" to continue steering Rover, "q" to quit the App: '
  const invalidMsg = 'Invalid input, please input again: ';
  const roverList = [];

  rl.setPrompt(initial_msg);
  rl.prompt();

  let numRover = await askQuestion('How many rovers will be deployed on Mar: ');
  while (!checkInput.numRover(numRover)) {
    numRover = await askQuestion(invalidMsg);
  }
  for (let i = 1; i <= Number(numRover); i++) {
    let roverName = await askQuestion(`Please input name of No.${i} rover: `);
    while (!checkInput.roverName(roverName)) {
      roverName = await askQuestion(invalidMsg);
    }
    roverList.push(new Rover(roverName));
  }
  let plateauSize = await askQuestion('Plateau Input: ');
  while (!checkInput.plateauSize(plateauSize)) {
    plateauSize = await askQuestion(invalidMsg);
  }
  const [platLength, platWidth] = plateauSize.split(' ');
  const landPlateau = new Plateau(Number(platLength), Number(platWidth));

  for (let i = 0; i < roverList.length; i++) {
    let landingInfo = await askQuestion(`${roverList[i].info.name} landing: `);
    while (!checkInput.landPara(landingInfo, [landPlateau.size.length, landPlateau.size.width])) {
      landingInfo = await askQuestion(invalidMsg);
    }
    const [x, y, compassPoint] = landingInfo.split(' ');
    roverList[i].landing(Number(x), Number(y), compassPoint);
    await steerRover(roverList[i], [landPlateau.size.length, landPlateau.size.width]);
  }

  roverList.forEach((item) => console.log(`${item.info.name}: ${item.info.position.x} ${item.info.position.y} ${item.info.compassPoint}`));

  let contInd = true;
  while (contInd) {
    rl.setPrompt(instruction);
    rl.prompt();

    const input = await onLineInput();
    if (input === 'q') {
      contInd = false;
    } else if (input === 'c') {
      for (let i = 0; i < roverList.length; i++) {
        await steerRover(roverList[i], [landPlateau.size.length, landPlateau.size.width]);
      }
      roverList.forEach((item) => console.log(`${item.info.name}: ${item.info.position.x} ${item.info.position.y} ${item.info.compassPoint}`));
    }
  }

  rl.close();
  console.log('App closed, Bye!');
  process.exit(0);
}

if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
  main();
}

export default main;