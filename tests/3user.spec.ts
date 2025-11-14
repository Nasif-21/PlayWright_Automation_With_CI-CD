import { test, expect,Page } from '@playwright/test';
import { setAuth, getUserId } from '../utils/authHelper.ts';
import { UserPage } from '../pages/user.ts';
import { addItemPage } from '../pages/additem.ts';
import { ItemModel } from '../models/itemModel.ts';
import { fa, faker, ro } from '@faker-js/faker';
import { saveToTextFile,getLastUser,updatePassword } from '../utils/utils.ts';
import { LoginPage } from '../pages/login.ts';
import { readLatestEmail } from '../services/Gmail_Data_Read_Services.ts';


let page:Page;

test.beforeAll( async ({ browser }) => {
    page = await browser.newPage();
    await setAuth(page);

});
test("Go add cost page", async () => {

    //await setAuth(page);
    await page.goto("https://dailyfinance.roadtocareer.net/user");
    await page.waitForTimeout(3000);

    const user= new UserPage(page);
    await user.clickAddCostButton();
    //await page.pause();
});

 test("Add item to cost page",async () => {

    //await page.goto("https://dailyfinance.roadtocareer.net/add-cost");
    const addItem=new addItemPage(page);
    const itemModel:ItemModel={
        itemName:faker.commerce.productName(),
        itemCost:faker.number.int({ min: 5, max: 10 }),
        purchaeseDate:"2025-"+faker.number.int({min: 1, max:12}).toString().padStart(2,"0")+"-"+faker.number.int({ min: 1, max: 28 }).toString().padStart(2,"0"),
        remarks:"Test item added via automation" 
    }
    await addItem.addItemWithCost(itemModel);
    await page.waitForTimeout(2000);
    const user= new UserPage(page);
    await user.clickAddCostButton();


    const itemModel2:ItemModel={
        itemName:faker.commerce.productName(),
        itemCost:faker.number.int({ min: 5, max: 10 }),
        purchaeseDate:"2025-"+faker.number.int({min: 1, max:12}).toString().padStart(2,"0")+"-"+faker.number.int({ min: 1, max: 28 }).toString().padStart(2,"0"),
        remarks:"Test item added via automation" 
    }
    await addItem.addItemWithCost(itemModel2);

    
   // await page.pause();

});


test("Read table data", async () => {
      //await page.goto("https://dailyfinance.roadtocareer.net/user")
      const user= new UserPage(page);
      const tableData=await user.getTableData();
      const formattedData=tableData.map(row=>row.join(" | ")).join("\n");
      saveToTextFile("tableData.txt",formattedData);


      //await page.pause();



 });

  test("Logout from application", async () => {
    
    const user= new UserPage(page); 
    user.clickLogout();
    //await page.pause();
  });

  test("Go to reset password page and sent reset email", async () => {

    //await page.goto("https://dailyfinance.roadtocareer.net/");
    const user= new UserPage(page);
    await user.clickResePasswordLink();
   // await page.pause();
    const userData=getLastUser('resources/users.json');
    await user.sendResetEmail(userData.email);
    await page.waitForTimeout(5000);
    //await page.pause();
    
  });

  test("Reset new password from email link", async () => {

    let latestEmail=await readLatestEmail();

    const resetLinkMatch=latestEmail.match(/https?:\/\/[^\s]+/);
    if(!resetLinkMatch) {
        throw new Error("Reset link not found in email");
    }
    const resetLink=resetLinkMatch[0];
    console.log("Reset Link:",resetLink);

    await page.goto(resetLink);
   // await page.pause();
    const user= new UserPage(page);
    user.enterNewPassword("5678");
    const userEmail=getLastUser('resources/users.json');
    await page.waitForTimeout(5000);
    updatePassword(userEmail.email,"5678");
    await page.waitForTimeout(5000);
    //await page.pause();
    //await page.waitForTimeout(3000);
    
    
  });

  test("Login with new password", async () => {
    const loginPage=new LoginPage(page);
    await page.goto("https://dailyfinance.roadtocareer.net/login");
    const userEmail=getLastUser('resources/users.json');
    const userPassword=getLastUser('resources/users.json');
    loginPage.userLogin(userEmail.email,userPassword.password);
    
    await page.waitForTimeout(5000);
   // await page.pause();
  });

  test("Add image to profile", async () => {
    const userPage=new UserPage(page);
    //await page.goto("https://dailyfinance.roadtocareer.net/user");
    await page.waitForTimeout(5000);
    userPage.clickProfile();
    await page.waitForTimeout(5000);
    const filePath="profileImage.png";
    await userPage.addProfileImage(filePath);
    await page.waitForTimeout(5000);
    ///await page.pause();
    await userPage.verifyProfileImageUploaded();
   // await page.pause();
    // userPage.clickLogout2();
    // await page.pause();
  });





    





































// test("Go add cost page", async () => {

//     //await setAuth(page);
//     await page.goto("https://dailyfinance.roadtocareer.net/user");
//     await page.waitForTimeout(3000);

//     const user= new UserPage(page);
//     await user.clickAddCostButton();
//     await page.pause();
// });


// test("Go to add cost page", async () => {

//     await page.goto("https://dailyfinance.roadtocareer.net/user");
//    //await page.pause();
//     await page.waitForTimeout(3000);
// });

// test("Add item to cost page",async () => {

//     //await page.goto("https://dailyfinance.roadtocareer.net/add-cost");
//     const addItem=new addItemPage(page);

//     // for(let i=0;i<2;i++)
//     // {
        
//     //     const itemModel:ItemModel={
//     //     itemName:faker.commerce.productName(),
//     //     itemCost:faker.number.int({ min: 5, max: 10 }),
//     //     purchaeseDate:"2025-"+faker.number.int({min: 1, max:12}).toString().padStart(2,"0")+"-"+faker.number.int({ min: 1, max: 28 }).toString().padStart(2,"0"),
//     //     remarks:"Test item added via automation" 
//     // }


//     const itemModel:ItemModel={
//         itemName:faker.commerce.productName(),
//         itemCost:faker.number.int({ min: 5, max: 10 }),
//         purchaeseDate:"2025-"+faker.number.int({min: 1, max:12}).toString().padStart(2,"0")+"-"+faker.number.int({ min: 1, max: 28 }).toString().padStart(2,"0"),
//         remarks:"Test item added via automation" 
//     }
//     await page.waitForTimeout(2000);
//     await addItem.addItemWithCost(itemModel);
//     await page.pause();
// });

// test("Go add cost page", async () => {

//     //await setAuth(page);
//     await page.goto("https://dailyfinance.roadtocareer.net/user");
//     await page.waitForTimeout(3000);

//     const user= new UserPage(page);
//     await user.clickAddCostButton();
//     await page.pause();
// });


// test("Add item to cost page",async () => {

//     //await page.goto("https://dailyfinance.roadtocareer.net/add-cost");
//     const addItem=new addItemPage(page);

//     // for(let i=0;i<2;i++)
//     // {
        
//     //     const itemModel:ItemModel={
//     //     itemName:faker.commerce.productName(),
//     //     itemCost:faker.number.int({ min: 5, max: 10 }),
//     //     purchaeseDate:"2025-"+faker.number.int({min: 1, max:12}).toString().padStart(2,"0")+"-"+faker.number.int({ min: 1, max: 28 }).toString().padStart(2,"0"),
//     //     remarks:"Test item added via automation" 
//     // }


//     const itemModel:ItemModel={
//         itemName:faker.commerce.productName(),
//         itemCost:faker.number.int({ min: 5, max: 10 }),
//         purchaeseDate:"2025-"+faker.number.int({min: 1, max:12}).toString().padStart(2,"0")+"-"+faker.number.int({ min: 1, max: 28 }).toString().padStart(2,"0"),
//         remarks:"Test item added via automation" 
//     }
//     await page.waitForTimeout(2000);
//     await addItem.addItemWithCost(itemModel);
//     await page.pause();
// });



// test("Read table data", async () => {
//      await page.goto("https://dailyfinance.roadtocareer.net/user")
//      const user= new UserPage(page);


// });

// test("Logout from application", async () => {

//     await page.goto("https://dailyfinance.roadtocareer.net/user")
//     const user= new UserPage(page); 
//     user.clickLogout();
//     await page.pause();
// });

