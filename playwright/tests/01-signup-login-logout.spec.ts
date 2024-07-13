import { test, expect, Page, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test.describe('Sign Up / Login / Logout --', () => {

  let page: Page;
  let context: BrowserContext;
  let loginPage: LoginPage;

  /* Set serial execution to make the tests run one after another */
  test.describe.configure({ mode: 'serial' });


  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({recordVideo: {dir: './report/videos/', size: {width: 1920, height: 890}}, viewport: {width: 1920, height: 890} });
    page = await context.newPage();
    loginPage = new LoginPage(page);
  });

  test.afterAll(async ({ browser }) => {
    await context.close();
  });


  /* Load lowcoder login page */
  test('Load main login page', async () => {
    loginPage.loadPage();

    await expect(page.locator('div').filter({ hasText: /^Sign In$/ })).toBeVisible();
    await expect(page.getByPlaceholder(/^Please enter your email$/)).toBeVisible();
    await expect(page.getByPlaceholder(/^Please enter your password$/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign Up' })).toBeVisible();
  });

  /* Test login with non-existing user */
  test('Login with non-existing user must fail', async() => {
    await loginPage.logIn('nonexisting@must.fail', 'nopassword');
    await expect(page.getByText('Invalid email or password.', { exact: true })).toBeVisible();
  });

  /* Test to load signup page */
  test('Load main signup page', async() => {
    await loginPage.clickSignUpLink()

    await expect(page.locator('div').filter({ hasText: /^Sign Up$/ })).toBeVisible();
    await expect(page.getByPlaceholder(/^Please enter your email$/)).toBeVisible();
    await expect(page.getByPlaceholder(/^Please Enter Password$/)).toBeVisible();
    await expect(page.getByPlaceholder(/^Please Confirm Password$/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
  });

  /** Sign up with a non-existing user */
  test('Sign up with non-existing user with valid credentials must succeed', async() => {
    await loginPage.signUp('someuser5@some.email', 'somepassword123', 'somepassword123');

    await expect(page.getByRole('heading', { name: 'Your Apps' })).toBeVisible();

    /* check these for default organization homepage for workspace admin */
    //await expect(page.getByRole('heading', { name: 'Organization Homepage' })).toBeVisible();
    //await expect(page.getByRole('heading', { name: 'someuser@some.email\'s workspace' })).toBeVisible();
    //await expect(page.getByText('Apps Shared with You')).toBeVisible();
  });

  /* Logout user */
  test('Logout user', async() => {
    await loginPage.logOut('someuser5@some.email');

    await expect(page.locator('div').filter({ hasText: /^Sign In$/ })).toBeVisible();
  });

  /* Login with existing user */
  test('Login with existing user must succeed', async() => {
    await loginPage.logIn('someuser5@some.email', 'somepassword123');

    await expect(page.getByRole('heading', { name: 'Your Apps' })).toBeVisible();
  });

});
