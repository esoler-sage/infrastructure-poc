const request = require('superagent');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const BASE_URL = region => `https://${region}.api.cognitive.microsoft.com/luis/api/v2.0`;

const LuisRegions = {
  WestEurope: 'westeurope',
  WestUS: 'westus',
  AustraliaEast: 'australiaeast',
};

/**
 * Service that handles communication against the LUIS endpoints
 * @see https://westus.dev.cognitive.microsoft.com/docs/services/5890b47c39e2bb17b84a55ff/operations/5890b47c39e2bb052c5b9c2f
 */
class LuisService {
  constructor({ region = LuisRegions.WestUS, key }) {
    this.baseUrl = BASE_URL(region);
    this.key = key;
  }

  /**
   * Creates a LUIS Application
   * @param {*} param0 
   */
  async createLuisApp({ name, description = 'This is my first dummy application', ...moreParams }) {
    const newApp = await request
      .post(`${this.baseUrl}/apps`)
      .send({
        name,
        description,
        culture: 'en-us',
        tokenizerVersion: '1.0.0',
        usageScenario: 'IoT',
        domain: 'Comics',
        initialVersionId: '0.1',
      })
      .set('Ocp-Apim-Subscription-Key', this.key);

    if (newApp.status !== 201) throw new Error('Error happened. Please try again!');

    await this.assignLuisAccount({ appId: newApp.body, ...moreParams });

    return newApp.body;
  }

  /**
   * Assigns Resource to a LUIS app
   * @param {*} appId
   * @see https://docs.microsoft.com/en-us/rest/api/cognitiveservices/luis-programmatic/azureaccounts/assigntoapp
   */
  async assignLuisAccount({ appId, accountName }) {
    // Get ARM Access Token
    const { stdout: token } = await execAsync('az account get-access-token --query accessToken -o tsv');

    // Get accounts available for the user that is doing the request
    const azureAccounts = await request
      .get(`${this.baseUrl}/azureaccounts`)
      .set('Ocp-Apim-Subscription-Key', this.key)
      .set('Authorization', `Bearer ${token.replace('\n', '')}`);

    if (azureAccounts.status !== 200) {
      throw new Error('Unknown error happened.');
    }

    // Select azure cognitive service LUIS account
    const {
      AzureSubscriptionId,
      ResourceGroup,
      AccountName,
    } = azureAccounts.body.filter(x => x.AccountName === accountName)[0] || {};

    if (!AzureSubscriptionId) throw new Error('Invalid account.');

    // Assign resource to luis App
    const result = await request
      .post(`${this.baseUrl}/apps/${appId}/azureaccounts`)
      .send({
        azureSubscriptionId: AzureSubscriptionId,
        resourceGroup: ResourceGroup,
        accountName: AccountName,
      })
      .set('Ocp-Apim-Subscription-Key', this.key)
      .set('Authorization', `Bearer ${token.replace('\n', '')}`);

    if (result.status !== 201) throw new Error('Error happened. Please try again!');

    // Get keys from Azure
    const keysRequest = await request
      .post(`https://management.azure.com/subscriptions/${AzureSubscriptionId}/resourceGroups/${ResourceGroup}/providers/Microsoft.CognitiveServices/accounts/${AccountName}/listKeys?api-version=2016-02-01-preview`)
      .set('Authorization', `Bearer ${token.replace('\n', '')}`);

    if (keysRequest.status !== 200) throw new Error('Unknown error while retrieving keys');

    return keysRequest.body;
  }
}

module.exports = {
  LuisRegions,
  LuisService,
};
