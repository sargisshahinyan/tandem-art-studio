import base from './base';

export class PortfolioSvc {
  static async getPortfolioList() {
    const { data } = await base.get('portfolios');

    return data;
  }
}

export default PortfolioSvc;
