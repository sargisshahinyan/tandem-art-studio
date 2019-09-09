import base from './base';

class PagesSvc {
  static async getPagesData() {
    const { data } = await base.get('pages');
    return data;
  }
}

export default PagesSvc;
