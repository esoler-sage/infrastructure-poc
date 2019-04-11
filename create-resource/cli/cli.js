#!/usr/bin/env node

/**
 * Module dependencies.
 */

const program = require('yargs');
const pkgInfo = require('../package.json');

program
  .usage('Usage: $0 <command> [options]')
  .commandDir('commands')
  .count('verbose')
  .count('verbose')
  .option('version')
  .alias('v', 'verbose')
  // .help()
  .argv;

program.argv;

// .option('-p, --peppers', 'Add peppers')
// .option('-P, --pineapple', 'Add pineapple')
// .option('-b, --bbq-sauce', 'Add bbq sauce')
// .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')

// program
//   .command('create-qna-kb')
//   .alias('create-kb')
//   .description('Creates QnA Maker Knowledge Base')
//   .option('-K, --key <subscription-key>', 'Subscription key which provides access to this API.');

// program
//   .command('create-luis')
//   .description('Creates LUIS Application')
//   .option('-K, --key <subscription-key>', 'Subscription key which provides access to this API.');

// program.parse(process.argv);

// console.log(program);

// const [command] = program.args;

// switch (command) {
//   case 'create-qna-kb':
//   case 'create-kb':

//     break;
//   case 'create-luis':

//     break;
//   default:
//     console.log('Unknown option selected. Use --help to know the usage.');
// }
