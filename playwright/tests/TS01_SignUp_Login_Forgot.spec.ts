import { test, expect } from '../utils/fixtures';
import testData from '../data/local/test-data.json';

test('TC01 - Sign up ( Admin )', async ({ signUpPage, page }) => {
    await signUpPage.SignUp(testData.users.admin.credentials.username, testData.users.admin.credentials.password, testData.users.admin.credentials.password);
    await signUpPage.AssertWorkspaceCreated();
});
