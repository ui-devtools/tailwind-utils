// copied from https://github.com/vitest-dev/vitest/blob/main/packages/vitest/src/node/reporters/base.ts

import chalk from 'chalk';
import type { Vitest, File, Task, ErrorWithDiff } from 'vitest';

export async function printTaskErrors(tasks: Task[], ctx: Vitest) {
  const errorsQueue: [error: ErrorWithDiff | undefined, tests: Task[]][] = [];

  for (const task of tasks) {
    // merge identical errors
    const error = task.result?.error;
    const errorItem = error?.stackStr && errorsQueue.find((i) => i[0]?.stackStr === error.stackStr);
    if (errorItem) errorItem[1].push(task);
    else errorsQueue.push([error, [task]]);
  }

  for (const [error, tasks] of errorsQueue) {
    for (const task of tasks) {
      const filepath = (task as File)?.filepath || '';
      let name = getFullName(task);

      if (filepath) name = `${name} ${chalk.dim(`[ ${this.relative(filepath)} ]`)}`;
      ctx.logger.error(chalk.red(name));
      ctx.logger.error();
      // ctx.logger.error(`${chalk.red(chalk.bold(chalk.inverse(' FAIL ')))} ${name}`);
    }

    await ctx.logger.printError(error);

    // error divider
    const divider = '⎯'.repeat(process.stdout.columns || 100);
    ctx.logger.error(chalk.red(chalk.dim(divider)) + '\n');

    await Promise.resolve();
  }
}

export function getFullName(task: Task) {
  return getNames(task).join(chalk.dim(' > '));
}

export function getNames(task: Task) {
  const names = [task.name];
  let current: Task | undefined = task;

  while (current?.suite || current?.file) {
    current = current.suite || current.file;
    if (current?.name) names.unshift(current.name);
  }

  return names;
}
