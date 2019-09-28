export function getPagesInitialData(pagesList = []) {
  return {
    pagesList: Array.isArray(pagesList) ? pagesList : [],
    goToPage: () => {},
    activePage: 1,
    scrolling: false,
  };
}
