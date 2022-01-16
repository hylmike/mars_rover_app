import { spawn } from 'child_process';

const output = (process) =>{
  return new Promise((resolve, reject)=>{
    process.stdout.on('data', data => resolve(data));
  })
}

describe("Main app function", () => {
  let stdin;

  beforeEach(() => {
    stdin = require('mock-stdin').stdin();
  })

  afterEach(() => {
    jest.unmock('mock-stdin');
  })

  it('should output desired ouputs with valid inputs', async () => {
    const app = spawn('node', ['index.js']);
    const input = ['1\r','Rover1\r','30 20\r','10 5 E\r','RMMMMLMM\r'];
    await output(app);
    for (let i=0; i<input.length; i++) {
      await output(app);
      app.stdin.write(input[i]);
    }
    const finalOutput = (await output(app)).toString();
    expect(finalOutput).toContain('Rover1: 12 1 E'); 
    app.kill();
  })
})