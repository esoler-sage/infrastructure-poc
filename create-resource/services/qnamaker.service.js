/* eslint-disable no-await-in-loop */
const BASE_URL = (region = 'westus') => `https://${region}.api.cognitive.microsoft.com/qnamaker/v4.0`;

const request = require('superagent');

const wait = sec => new Promise(resolve => setTimeout(resolve, sec * 1000));

/**
 * Service that handles the communications against the QnA maker service
 */
class QnAMakerService {
  constructor({ key, region }) {
    this.key = key;
    this.baseUrl = BASE_URL();
    this.region = region;
  }

  /**
   * Waits until operation is done
   * @param {*} operationId Operation id to wait for
   */
  async waitForKnowledgebaseCreation(operationId) {
    let status = '';
    let operationStatus;
    do {
      operationStatus = await request
        .get(`${this.baseUrl}/operations/${operationId}`)
        .set('Ocp-Apim-Subscription-Key', this.key);

      console.info(operationStatus.body);

      status = operationStatus.body.operationState;

      if (status === 'Failed') throw new Error();

      await wait(5);
    } while (status !== 'Succeeded');

    return operationStatus.body;
  }

  /**
   * Creates a Knowledge base in QnA Maker
   * @param {*} name Name of the knowledge base
   * @param {*} samples Samples in the kb
   */
  async createKnowledgeBase(name = 'My new KB', samples = []) {
    const newKb = await request
      .post(`${this.baseUrl}/knowledgebases/create`)
      .send({
        name,
        qnaList: samples,
      })
      .set('Ocp-Apim-Subscription-Key', this.key);

    if (newKb.status !== 202) throw new Error();

    const knowledgebase = await this.waitForKnowledgebaseCreation(newKb.body.operationId);
    const kbId = knowledgebase.resourceLocation.split('/').pop();

    return { id: kbId };
  }
}

module.exports = QnAMakerService;
