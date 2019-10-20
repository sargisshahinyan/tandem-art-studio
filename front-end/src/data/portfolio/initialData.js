export function getPortfoliosInitialData(portfolios = [], selectedPortfolio = null) {
  return {
    list: Array.isArray(portfolios) ? portfolios : [],
    selected: selectedPortfolio || null,
  };
}
