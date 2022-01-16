import { spawn } from 'child_process';

const output = (fn) => {
  return new Promise((resolve, reject) => {
    fn.stdout.on('data', data => resolve(data));
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
    const input = ['2\r', 'Rover1\r', 'Rover2\r', '30 20\r', '10 5 E\r', 'RMMMMLMM\r', '20 10 N\r', 'RMMMLMMMM\r'];
    await output(app);
    for (let i = 0; i < input.length; i++) {
      await output(app);
      app.stdin.write(input[i]);
    }
    const finalOutput1 = (await output(app)).toString();
    const finalOutput2 = (await output(app)).toString();
    expect(finalOutput1).toContain('Rover1: 12 1 E');
    expect(finalOutput2).toContain('Rover2: 23 14 N');
    app.stdin.write('q\n');
    app.kill();
  })
})