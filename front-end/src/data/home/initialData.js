export function getPagesInitialData(pagesList = []) {
  return {
    pagesList: Array.isArray(pagesList) ? pagesList : [],
    scrolling: false,
    goToPage: () => {},
    activePage: 1,
  };
}
