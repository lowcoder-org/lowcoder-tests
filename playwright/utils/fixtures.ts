import { test as base } from '@playwright/test';
import { SignUpPage } from '../pages/signup-page';

type LowcoderFixtures = {
	signUpPage: SignUpPage;
};

export const test = base.extend<LowcoderFixtures>({
    signUpPage: async ({ page }, use) => {

        // Set up the fixture.
        const signUpPage = new SignUpPage(page);
        await signUpPage.Load();

        // Use the fixture value in the test.
        await use(signUpPage);
   },
});
export { expect } from '@playwright/test';
