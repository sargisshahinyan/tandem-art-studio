import PortfolioSvc from '../services/PortfolioSvc';

export const SET_PORTFOLIO_LIST = 'SET_PORTFOLIO_LIST';
export const SET_PORTFOLIO = 'SET_PORTFOLIO';

export const setPortfoliosData = (payload) => ({
  type: SET_PORTFOLIO_LIST,
  payload,
});

export const setPortfolio = (payload) => ({
  type: SET_PORTFOLIO,
  payload,
});

export const loadPortfolios = () => (
  async dispatch => {
    const portfolios = await PortfolioSvc.getPortfolioList();
    dispatch(setPortfoliosData(portfolios));
  }
);

export const loadPortfolio = (id) => (
  async dispatch => {
    const portfolio = await PortfolioSvc.getPortfolio(id);
    dispatch(setPortfolio(portfolio));
  }
);
