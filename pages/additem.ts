import { Page } from "@playwright/test";
import { ItemModel } from "../models/itemModel.ts";


export class addItemPage {
    constructor(private page: Page) {} 

    async addItemWithCost(itemModel:ItemModel)
    {

        const randomClick=Math.floor(Math.random()*10)+1;
        await this.page.getByRole("textbox",{name:"Item Name"}).fill(itemModel.itemName);
        for(let i=0;i<randomClick;i++){
        await this.page.getByRole("button",{name:"+"}).click();
        }
        await this.page.getByRole("spinbutton",{name:"Amount"}).fill(itemModel.itemCost.toString());
        await this.page.getByLabel("Purchase Date").fill(itemModel.purchaeseDate);
        await this.page.getByRole("combobox",{name:"Month"}).selectOption("November");
        await this.page.getByRole('textbox',{name:"Remarks"}).fill(itemModel.remarks);
        await this.page.getByRole("button",{name:"Submit"}).click();

    }


}