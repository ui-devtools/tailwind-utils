import chalk from 'chalk';
import type { Reporter, TaskState, File } from 'vitest';

const StateMap: { [key in TaskState]: string } = {
  pass: chalk.green('▎'),
  fail: chalk.red('▎'),
  skip: chalk.yellow('▎'),
  todo: chalk.gray('▎'),
  run: '', // not in final result
  only: '' // probably never see this
};

const printResults = (results) => {
  const name = results.name;

  const printableResult = results.testResults.map((state: TaskState) => {
    return StateMap[state];
  });

  const perLine = process.stdout.columns - 32 || 100;
  let resultLines: string[] = [];

  if (results.testResults.length < perLine) {
    resultLines.push(`│ ${name} │ ${printableResult.join('')}│`);
  } else {
    const totalRows = Math.ceil(printableResult.length / perLine);

    // first line with name
    resultLines.push(`│ ${name} │ ${printableResult.slice(0, perLine).join('')}│`);

    // not the first and last row
    for (let i = 1; i < totalRows - 1; i++) {
      // blank line
      resultLines.push(`│ ${Array(name.length).fill(' ').join('')} │ ${Array(perLine).fill(' ').join('')}│`);

      resultLines.push(
        `│ ${Array(name.length).fill(' ').join('')} │ ${printableResult
          .slice(i * perLine, i * perLine + perLine)
          .join('')}│`
      );
    }

    // last line
    // blank line
    resultLines.push(`│ ${Array(name.length).fill(' ').join('')} │ ${Array(perLine).fill(' ').join('')}│`);

    // fill last line with spaces with extra spaces to make box
    resultLines.push(
      `│ ${Array(name.length).fill(' ').join('')} │ ${printableResult
        .slice((totalRows - 1) * perLine, printableResult.length)
        .join('')} ${Array(perLine - 1 - (printableResult.length % perLine))
        .fill(' ')
        .join('')}│`
    );
  }

  const header = `┌${Array(name.length + 2)
    .fill('─')
    .join('')}┬${Array(Math.min(printableResult.length, perLine) + 1)
    .fill('─')
    .join('')}┐`;

  const footer = `└${Array(name.length + 2)
    .fill('─')
    .join('')}┴${Array(Math.min(printableResult.length, perLine) + 1)
    .fill('─')
    .join('')}┘`;

  console.log(
    `
${header}
${resultLines.join('\n')}
${footer}
  `.trim()
  );
};

class reporter implements Reporter {
  // looks like collected is fired once per file
  async onCollected(files?: File[]) {
    // console.log('collected', files);
  }

  async onFinished(files: File[] = [], errors?: unknown[]) {
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
  }
}

export default reporter;
