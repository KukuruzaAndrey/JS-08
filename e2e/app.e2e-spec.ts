import { JS08AngPage } from './app.po';

describe('js08-ang App', () => {
  let page: JS08AngPage;

  beforeEach(() => {
    page = new JS08AngPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
