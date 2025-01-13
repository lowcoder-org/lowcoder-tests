import { type Page, type Locator, expect } from '@playwright/test';

export class SignUpPage {
    private txtEmail: Locator;
    private txtPassword: Locator;
    private txtConfirmPassword: Locator;
    private btnSignUp: Locator;
  
    constructor(public page: Page) {
        this.page = page;
        this.txtEmail = this.page.getByPlaceholder(/^Please enter your email$/);
        this.txtPassword = this.page.getByPlaceholder(/^Please Enter Password$/);
        this.txtConfirmPassword = this.page.getByPlaceholder(/^Please Confirm Password$/);
        this.btnSignUp = this.page.getByRole('button', { name: 'Sign Up' });
    }

    async Load() {
        await this.page.goto('/user/auth/register');
    }

    async SignUp(username: string, password: string, repeatPassword: string) {
        /** Check that input descriptions are present and visible */
        await expect(this.page.locator('div').filter({ hasText: /^Sign Up$/ }), 'page header "Sign Up" is displayed').toBeVisible();
        await expect(this.page.getByText('Email:'), '"email" text input is displayed').toBeVisible();
        await expect(this.page.getByText('Password', { exact: true }), '"password" text input is displayed').toBeVisible();
        await expect(this.page.getByText('Confirm Password'), '"confirm password" text input is displayed').toBeVisible();
        await expect(this.page.getByText('I Have Read and Agree to the'), 'agree to ToS checkbox is displayed').toBeVisible();

        // TODO: uncomment and add testId once it's added in frontend
        // await expect(this.page.getByTestId(''), 'agree to ToS checkbox is checked').toBeChecked();
      
        /** Fill inputs and clicn sign up */
        await this.txtEmail.click();
        await this.txtEmail.fill(username);
        await this.txtPassword.click();
        await this.txtPassword.fill(password);
        await this.txtConfirmPassword.click();
        await this.txtConfirmPassword.fill(repeatPassword);
        await this.btnSignUp.click();      
    }

    async AssertWorkspaceCreated() {
        /** Acceptance criteria:
         * - new workspace opens walkthrough demo
         * - new workspace has no applications created yet
         */
        await expect(this.page.getByText('Create App'), 'walkthrough demo title is displayed').toBeVisible();
        await expect(this.page.getByText('Welcome! Click \'App\' and'), 'walkthrough demo description is displayed').toBeVisible();
        await expect(this.page.getByLabel('Skip'), 'walkthrough demo "Skip" option is displayed').toBeVisible();
        await expect(this.page.getByText('You don\'t have any apps yet.'), 'workspace information about no apps is displayed').toBeVisible();

        /**
         * Acceptance criteria:
         * - 'Query Library' link in left side menu is visible
         * - 'Data Sources' link in left side menu is visible
         * - 'Settings' link in left side menu is visible
         * - 'Trash' link in left side menu is visible
         */
        await expect(this.page.getByText('Query Library'), 'Left menu "Query Library" is displayed').toBeVisible();
        await expect(this.page.getByText('Data Sources'), 'Left menu "Data Sources" is displayed').toBeVisible();
        await expect(this.page.getByText('Settings'), 'Left menu "Settings" is displayed').toBeVisible();
        await expect(this.page.getByText('Trash'), 'Left menu "Thrash" is displayed').toBeVisible();
    }

}