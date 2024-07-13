import { test as base } from '@playwright/test';
import { LoginPage } from './pages/login-page';

// Declare the types of your fixtures.
type MyFixtures = {
  loginPage: LoginPage;
};

