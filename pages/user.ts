import { expect, Page } from "@playwright/test";
import path from "path";

export class UserPage {
    constructor(private page: Page) {}
    
    async clickAddCostButton(){
        await this.page.getByRole("button",{name:"Add Cost"}).click();
    }


    async clickLogout(){
        await this.page.getByRole("button",{name:"account of current user"}).click();
        await this.page.waitForTimeout(3000);
        await this.page.getByRole("menuitem",{name:"Logout"}).click();

    }
    
    // Check row and table data
    async getTableData(){
        
        //const table=await this.page.locator("table");

  const table = this.page.getByRole("table");
    const rows = table.getByRole("row");

    

    await rows.nth(1).getByRole("cell").first().waitFor();   // important

    // const row2Cells = await rows.nth(1).getByRole("cell").allInnerTexts();
    // const row3Cells = await rows.nth(2).getByRole("cell").allInnerTexts();

    // console.log("Row2:", row2Cells);
    // console.log("Row3:", row3Cells);

    const rowCount=await rows.count();
    const tableData:string[][]=[];
    for(let i=1;i<rowCount;i++){
        const cells=await rows.nth(i).getByRole("cell").allInnerTexts();
        tableData.push(cells);  
   
    }
    //console.log("Table Data:",tableData);
    return tableData;
}
async clickResePasswordLink(){

    await this.page.getByRole("link",{name:"Reset it here"}).click();
}

async sendResetEmail(email:string)
{
    await this.page.getByRole("textbox",{name:"Email"}).fill(email);
    await this.page.getByRole("button",{name:"SEND RESET LINK"}).click();
}


async enterNewPassword(password:string)
{
    await this.page.getByRole("textbox",{name:"New Password"}).fill(password);
    await this.page.getByRole("textbox",{name:"Confirm Password"}).fill(password);
    await this.page.getByRole("button",{name:"RESET PASSWORD"}).click();
}

 async clickProfile(){
        await this.page.getByRole("button",{name:"account of current user"}).click();
        await this.page.getByRole("menuitem",{name:"Profile"}).click();
    }

async addProfileImage(imagePath:string){
        await this.page.getByRole("button",{name:"EDIT"}).click();
        const filePath = path.join(__dirname, "..", "resources", imagePath);
        const fileInput=await this.page.locator('input[type="file"]');
        await fileInput.setInputFiles(filePath);
        await this.page.getByRole("button",{name:"UPLOAD IMAGE"}).click();
        await this.page.waitForTimeout(3000);
        await this.page.getByRole("button",{name:"UPDATE"}).click();

}

async verifyProfileImageUploaded(){
    const profileImage= this.page.locator('img.profile-image');
    //await this.page.waitForSelector('img.profile-image', { state: 'attached', timeout: 15000 });
    //await profileImage.first().waitFor({ state: 'visible', timeout: 10000 });
    const imgSrc=await profileImage.getAttribute('src');

    expect(imgSrc).toContain('profileImage');
    console.log("Profile image uploaded successfully:");
}
// async clickLogout2(){
//         await this.page.getByRole("button",{name:"Profile"}).click();
//         await this.page.waitForTimeout(3000);
//         await this.page.getByRole("menuitem",{name:"Logout"}).click();

//     }

}

