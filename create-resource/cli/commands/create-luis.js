const program = require('yargs');

const { LuisService } = require('../../services/luis.service');

module.exports = program
  .command(['create-luis-app', 'kl'], 'Creates LUIS application',
    // Build Command
    (yargs) => {
      yargs
        .option('name', { alias: 'n' })
        .option('key', { alias: 'k', description: 'LUIS.ai programmatic key' })
        .option('region', { alias: 'r' })
        .option('description', { alias: 'd' })
        .option('account-name', { alias: 'an' })
        // .option('azure-key', { alias: 'ak', description: 'Azure key' })
        .demandOption(['name', 'key']);
    },
    // Execute command
    async (argv) => {
      const {
        name,
        key,
        region,
        ...moreParams
      } = argv;

      console.log(`Creating LUIS app "${name}"`);

      const service = new LuisService({ key, region });
      await service.createLuisApp({ name, ...moreParams });
    });
