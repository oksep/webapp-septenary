import { SeptenaryPage } from './app.po';

describe('septenary App', function() {
  let page: SeptenaryPage;

  beforeEach(() => {
    page = new SeptenaryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
