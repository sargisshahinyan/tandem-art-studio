module.exports = {
  TOKEN_COOKIE_KEY: 'token',
  TOKEN_EXPIRATION_TIME: 1000 * 60 * 60 * 24 * 30, // 30 days

  NAV_TABS: [
    {
      title: 'Home',
      path: 'home',
    },
    {
      title: 'About us',
      path: 'about',
    },
    {
      title: 'Our Team',
      path: 'team',
    },
    {
      title: 'Our Services',
      path: 'services',
    },
    {
      title: 'Our Clients',
      path: 'clients',
    },
    {
      title: 'Portfolio',
      path: 'portfolio',
    },
  ],

  PORTFOLIO_IMAGES_PATH: '/img/portfolio/',
  HOME_SLIDE_PATH: '/img/main/slide/',
  STATIC_FILES_DIRECTORY: '/assets/',
};
