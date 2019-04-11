const program = require('yargs');

const QnaMakerService = require('../../services/qnamaker.service');
const samples = require('../../samples/qna-seed');

module.exports = program
  .command(['create-qna-kb', 'kb'], 'Creates QnA Maker Knowledge Base',
    // Build Command
    (yargs) => {
      yargs
        .option('name', { alias: 'n' })
        .option('key', { alias: 'k' })
        .option('region', { alias: 'r' })
        .demandOption(['name', 'key']);
    },
    // Execute command
    async (argv) => {
      const { name, key, region } = argv;

      console.log(`Creating Knowledgebase "${name}"`);

      const service = new QnaMakerService({ key, region });
      await service.createKnowledgeBase(name, samples);
    });
