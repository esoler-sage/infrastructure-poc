const request = require('superagent');
const kbService = require('./services/qnamaker.service');

const samples = require('./samples/qna-seed');

(async () => {
  const newKb = kbService.createKnowledgeBase('', samples);

  const operationStatus = kbService.checkKnowledgeBaseStatus(newKb.operationId);

  const kbId = operationStatus.resourceLocation.split('/').pop();
})();
