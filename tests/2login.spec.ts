import { test, expect,Page } from '@playwright/test';
import { getLastUser } from '../utils/utils.ts';
import { LoginPage } from '../pages/login.ts';
import { setAuth } from '../utils/authHelper.ts';
import fs from 'fs';


const localStoragePath = 'resources/localstorage.json';
test("Login", async ({ page }) => {
    await page.goto("https://dailyfinance.roadtocareer.net/login");
    const login=new LoginPage(page);
    const userData=getLastUser('resources/users.json');
    await login.userLogin(userData.email,userData.password);
    await page.waitForTimeout(3000);

    expect(page.url()).toBe("https://dailyfinance.roadtocareer.net/user");
    await page.waitForTimeout(3000);
     const authToken = await page.evaluate(() => localStorage.getItem("authToken"));
    const authTokenData = await page.evaluate(() => localStorage.getItem("authTokenData"));

    fs.writeFileSync(localStoragePath, JSON.stringify({ authToken, authTokenData }));

    //await page.pause();   

});