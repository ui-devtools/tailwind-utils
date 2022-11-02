// 1. [x] show which test is failing
// 2. create table first before result, switch them on as they come
// 3. watch mode everything again. clear before re-render
// 4. maybe restructure tests for better results on 2 and 3

import chalk from 'chalk';
import type { Vitest, Reporter, TaskState, File } from 'vitest';
import { printTaskErrors } from './print-task-error';

const StateMap: { [key in TaskState]: string } = {
  pass: chalk.green('▎'),
  fail: chalk.redBright('▎'),
  skip: chalk.yellow('▎'),
  todo: chalk.gray('▎'),
  run: chalk.gray('▎'),
  only: '' // probably never see this
};

const printResults = (results) => {
  const printableResult = results.testResults.map((state: TaskState) => {
    return StateMap[state];
  });

  let testColor = chalk.gray;

  if (results.state === 'pass') testColor = chalk.green;
  else if (results.state === 'fail') testColor = chalk.redBright;
  const line = chalk.gray('│');

  const perLine = process.stdout.columns - 36 || 100;
  let resultLines: string[] = [];

  let nameColumnText = `${testColor(results.name)}`;
  if (results.duration) nameColumnText += ` ${chalk.gray(results.duration + 'ms')}`;

  // pad name to fill column
  const thisNameColumnSize = results.name.length + (results.duration + 'ms').length + 3;
  const nameColumnSize = 25;

  if (thisNameColumnSize < nameColumnSize) {
    const padding = Array(nameColumnSize - thisNameColumnSize - 1)
      .fill(' ')
      .join('');
    nameColumnText = `${testColor(results.name)} ${padding} ${chalk.gray(results.duration + 'ms')}`;
  }

  if (results.testResults.length < perLine) {
    resultLines.push(`${line} ${nameColumnText} ${line} ${printableResult.join('')}${line}`);
  } else {
    const totalRows = Math.ceil(printableResult.length / perLine);

    // first line with name
    resultLines.push(`${line} ${nameColumnText} ${line} ${printableResult.slice(0, perLine).join('')}${line}`);

    // not the first and last row
    for (let i = 1; i < totalRows - 1; i++) {
      // blank line
      resultLines.push(
        `${line}${Array(nameColumnSize - 1)
          .fill(' ')
          .join('')} ${line} ${Array(perLine).fill(' ').join('')}${line}`
      );

      resultLines.push(
        `${line} ${Array(nameColumnSize - 2)
          .fill(' ')
          .join('')} ${line} ${printableResult.slice(i * perLine, i * perLine + perLine).join('')}${line}`
      );
    }

    // last line
    // blank line
    resultLines.push(
      `${line} ${Array(nameColumnSize - 2)
        .fill(' ')
        .join('')} ${line} ${Array(perLine).fill(' ').join('')}${line}`
    );

    // fill last line with spaces with extra spaces to make box
    resultLines.push(
      `${line} ${Array(nameColumnSize - 2)
        .fill(' ')
        .join('')} ${line} ${printableResult.slice((totalRows - 1) * perLine, printableResult.length).join('')} ${Array(
        perLine - 1 - (printableResult.length % perLine)
      )
        .fill(' ')
        .join('')}${line}`
    );
  }

  const header = `┌${Array(nameColumnSize).fill('─').join('')}┬${Array(Math.min(printableResult.length, perLine) + 1)
    .fill('─')
    .join('')}┐`;

  const footer = `└${Array(nameColumnSize).fill('─').join('')}┴${Array(Math.min(printableResult.length, perLine) + 1)
    .fill('─')
    .join('')}┘`;

  console.log(
    `
${chalk.gray(header)}
${resultLines.join('\n')}
${chalk.gray(footer)}
  `.trim()
  );
};

class reporter implements Reporter {
  onInit(ctx: Vitest) {
    this.ctx = ctx;
    if (!process.env.CI) clear(100);
  }

  // onCollected is called for every file
  async onCollected(files?: File[]) {
    if (process.env.CI) return;

    files.forEach((file) => {
      const results = {
        name: file.name,
        state: 'run',
        duration: 0,
        testResults: []
      };

      results.state = 'run'; // 'pass' | 'fail' | 'run' | 'skip' | 'only' | 'todo'

      // each describe is it's own suite
      const suites = file.tasks;
      suites.forEach((suite) => {
        suite.tasks.forEach((task) => {
          if (task.mode !== 'run') results.testResults.push(task.mode);
          else results.testResults.push('run');
        });
      });

      printResults(results);
    });
  }

  async onTaskUpdate() {
    clear(100);
  }

  // onFinished is called once at the end
  async onFinished(files: File[] = [], errors?: unknown[]) {
    if (!process.env.CI) clear(100);

    files.forEach((file) => {
      const results = {
        name: file.name,
        state: 'run',
        duration: 0,
        testResults: []
      };

      results.state = file.result!.state; // 'pass' | 'fail' | 'run' | 'skip' | 'only' | 'todo'
      results.duration = file.result!.duration;

      // each describe is it's own suite
      const suites = file.tasks;
      suites.forEach((suite) => {
        suite.tasks.forEach((task) => {
          if (task.mode !== 'run') results.testResults.push(task.mode);
          else results.testResults.push(task.result.state);
        });
      });

      printResults(results);
    });

    let failedTasks = files
      .filter((file) => file.result.state === 'fail')
      .map((file) => file.tasks)
      .flat()
      .filter((suite) => suite.result.state === 'fail')
      .map((suite) => suite.tasks)
      .flat()
      .filter((task) => task.result.state === 'fail');

    console.log('\n');
    printTaskErrors(failedTasks, this.ctx);
  }
}

export default reporter;

const clear = (linesToClear) => {
  const stream = process.stdout;
  stream.cursorTo(0);

  for (let index = 0; index < linesToClear; index++) {
    if (index > 0) stream.moveCursor(0, -1);

    stream.clearLine(1);
  }
};
