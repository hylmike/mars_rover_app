import rl from './stdio/readTerminal.js';
import Plateau from './rover/Plateau.js';
import Rover from './rover/Rover.js';
import checkInput from './stdio/dataValidation.js';

//Wrap readline.question with Promise, then later we can use await to call them sequentially
const askQuestion = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => resolve(answer))
  });
}

//Main fucntion of app
const main = async () => {
  const initial_msg = 'Welcome to Mar Rover App! With this app you can deploy rovers on the Mar and steer them around\n';
  const instruction = '\n\nPress c to continue steering Rover\nPress q to quit the App'
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
    let commands = await askQuestion(`${roverList[i].info.name} Instructions: `);
    while (!checkInput.roverCommands(
      commands,
      [roverList[i].info.position.x, roverList[i].info.position.y, roverList[i].info.compassPoint],
      [landPlateau.size.length, landPlateau.size.width])) {
      commands = await askQuestion(invalidMsg);
    }
    const commandList = commands.split('');
    commandList.forEach((command) => {
      if (command === 'M') {
        roverList[i].move();
      } else {
        roverList[i].steer(command);
      }
    })
  }

  roverList.forEach((item) => console.log(`${item.name}: ${item.info.position.x} ${item.info.position.y} ${item.info.compassPoint}`));

  rl.close();
  console.log('App closed, Bye!');
  process.exit(0);
}

main();

export default main;