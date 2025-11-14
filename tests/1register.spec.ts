import { test, expect,Page } from '@playwright/test';
import { RegisterPage } from '../pages/register.ts';
import { fa, faker } from '@faker-js/faker';
import { UserModel } from '../models/usermodel.ts';
import { generateRandomNumber,saveJsonData} from '../utils/utils.ts';
import { readLatestEmail } from '../services/Gmail_Data_Read_Services.ts';


let page:Page;

test.beforeAll( async ({ browser }) => {
    page = await browser.newPage();
});
// test.afterAll( async () => {
//     await page.close();
// });

test("Go to register page", async ({ }) => {
    await page.goto("https://dailyfinance.roadtocareer.net/");
    await page.waitForTimeout(2000);
    await page.getByRole("link",{name:"Register"}).click();
    //await page.pause();

});

test("Register new user", async ({ }) => {
    const register=new RegisterPage(page);

    const userModel:UserModel={
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email:`skfamily0304+${generateRandomNumber(1000,9999)}@gmail.com`,
        password:"1234",
        phoneNumber:`01${generateRandomNumber(300000000,999999999)}`,
        address:faker.location.streetAddress()

    }
    await register.userRegister( userModel);
    await page.waitForTimeout(2000);
    saveJsonData(userModel,'resources/users.json');
    await page.waitForTimeout(5000);
     let latestEmail=await readLatestEmail();

     latestEmail=latestEmail.replace("&#39;","'");


    expect(latestEmail.toLowerCase()).toContain("welcome to our platform! we're excited to have you onboard.");
    //await page.pause();
});