import PortfolioSvc from '../services/PortfolioSvc';

export const SET_PORTFOLIO_LIST = 'SET_PORTFOLIO_LIST';

export const setPortfoliosData = (payload) => ({
  type: SET_PORTFOLIO_LIST,
  payload,
});

export const loadPortfolios = () => (
  async dispatch => {
    const portfolios = await PortfolioSvc.getPortfolioList();
    dispatch(setPortfoliosData(portfolios));
  }
);
