import base from './base';

export class PortfolioSvc {
  static async getPortfolioList() {
    const { data } = await base.get('portfolio');

    return data;
  }
}

export default PortfolioSvc;
