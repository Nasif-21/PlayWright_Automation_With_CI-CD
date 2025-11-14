import { Page } from "@playwright/test";
import { UserModel } from "../models/usermodel.ts";
import { th } from "@faker-js/faker";


// firstName: string,lastname: string,email: string,password: string,phoneNumber:string,address:string
export class RegisterPage {
    constructor(private page: Page) {}
    async userRegister(userModel:UserModel){
        
        const index=Math.floor(Math.random()*2);
        await this.page.getByRole("textbox",{name:"First Name"}).fill(userModel.firstName);
        await this.page.getByRole("textbox",{name:"Last Name"}).fill(userModel.lastName);
        await this.page.getByRole("textbox",{name:"Email"}).fill(userModel.email);
        await this.page.getByLabel("Password").fill(userModel.password);
        await this.page.getByRole("textbox",{name:"Phone Number"}).fill(userModel.phoneNumber);
        await this.page.getByRole("textbox",{name:"Address"}).fill(userModel.address);
        await this.page.getByRole("radio").nth(index).check();
        await this.page.getByRole("checkbox").check();
        await this.page.getByRole("button",{name:"REGISTER"}).click();
}
}