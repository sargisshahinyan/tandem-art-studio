import base from './base';

export class PortfolioSvc {
  static async getPortfolioList() {
    const { data } = await base.get('portfolios');

    return data;
  }
  static async getPortfolio(id) {
    const { data } = await base.get(`portfolios/${id}`);

    return data;
  }
}

export default PortfolioSvc;
