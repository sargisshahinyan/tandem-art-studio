import doAction from './db';

export default class PagesSvc {
  static getPagesData() {
    doAction({
      query: ['SELECT * FROM pages'],
    }).then(console.log.bind(console));
  }
}
