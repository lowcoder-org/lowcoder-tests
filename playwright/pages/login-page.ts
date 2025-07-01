import type { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly signInButton: Locator;
  private readonly signUpButton: Locator;
  private readonly signInLink: Locator;
  private readonly signUpLink: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.emailInput = this.page.getByPlaceholder(/^Please enter your email$/);
    this.passwordInput = this.page.getByPlaceholder(/^Please enter your password$/);
    this.confirmPasswordInput = this.page.getByPlaceholder(/^Please Confirm Password$/);
    this.signInButton = this.page.getByRole('button', { name: 'Sign In' });
    this.signUpButton = this.page.getByRole('button', { name: 'Sign Up' });
    this.signUpLink = this.page.getByRole('link', { name: 'Sign In' });
    this.signUpLink = this.page.getByRole('link', { name: 'Sign Up' });
  }


  async loadPage() {
    await this.page.goto('/user/auth/login');
  }

  async fillEmail(text: string) {
    await this.emailInput.click();
    await this.emailInput.fill(text);
  }

  async fillPassword(text: string) {
    await this.passwordInput.click();
    await this.passwordInput.fill(text);
  }

  async fillConfirmPassword(text: string) {
    await this.confirmPasswordInput.click();
    await this.confirmPasswordInput.fill(text);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }

  async clickSignUpLink() {
    await this.signUpLink.click();
  }

  async signUp(username: string, password: string, repeatPassword: string) {
    if (await this.signUpLink.isVisible()) {
      await this.clickSignUpLink();
    }
    
    await this.fillEmail(username);

    /* disabled because the placeholder is different between sign in and sign up */
    //await this.fillPassword(password);
    await this.page.getByPlaceholder(/^Please Enter Password$/).click();
    await this.page.getByPlaceholder(/^Please Enter Password$/).fill(password);

    await this.fillConfirmPassword(repeatPassword);
    await this.clickSignUp();
  }

  async logIn(username: string, password: string) {
    await this.loadPage();
    await this.fillEmail(username);
    await this.fillPassword(password);
    await this.clickSignIn();
  }

  async logOut(username: string) {
    await this.page.getByTitle(username, { exact: true }).click();
    await this.page.getByText('Log Out').click({delay: 1000});
  }

}
