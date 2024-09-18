import HttpClient from './net/httpClient.js';

// BNI API HOSTNAME
const SANDBOX_BASE_URL = 'https://sandbox.bni.co.id';
const DEV_BASE_URL = 'https://newapidev.bni.co.id:8066';
const UAT_BASE_URL = 'https://newapidev.bni.co.id:8065';
const PRODUCTION_BASE_URL = 'https://api.bni.co.id';

class BNIClient {

  /**
   * Initiate with options
   * @param  {Object} options - should have these props:
   * prod, clientId, clientSecret, apiKey
   */
  constructor(options = { env: false, appName, clientId, clientSecret, apiKey, apiSecret }) {
    this.config = options;
    this.httpClient = new HttpClient;
  }

  /**
   * Return config stored
   * @return {Object} object contains prod, clientId, clientSecret
   */
  getConfig() {
    return this.config;
  }

  /**
   * @return {String} api base url
   */
  getBaseUrl() {
    if (this.config.env === 'dev')
      return DEV_BASE_URL;
    else if (this.config.env === 'sandbox')
      return SANDBOX_BASE_URL;
    else if (this.config.env === 'prod')
      return PRODUCTION_BASE_URL;
    else if (this.config.env === 'uat')
      return UAT_BASE_URL;
  }

  async getToken() {
    const token = await this.httpClient.tokenRequest({
      url: `${this.getBaseUrl()}/api/oauth/token`,
      username: this.config.clientId,
      password: this.config.clientSecret
    });

    return token.access_token;
  }

}

export default BNIClient;
