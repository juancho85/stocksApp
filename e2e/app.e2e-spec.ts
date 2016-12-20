import { StocksAppPage } from './app.po';

describe('stocks-app App', function() {
  let page: StocksAppPage;

  beforeEach(() => {
    page = new StocksAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
