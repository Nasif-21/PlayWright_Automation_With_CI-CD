import { Page } from "@playwright/test";
import  fs from "fs";
import path from "path";

//const localStoragePath = 'resources/localstorage.json';
const localStoragePath = path.join(__dirname, "..", "resources", "localstorage.json");

//const localStoragePath = 'resources/localstorage.json';

export async function setAuth(page: Page) {
    const jsonString=fs.readFileSync(localStoragePath,'utf-8');
    const authObj=JSON.parse(jsonString);

    const authToken=authObj.authToken;
    const authTokenData=authObj.authTokenData;

    await page.addInitScript(([token, tokenData]) => {
      window.localStorage.setItem("authToken", token);
      window.localStorage.setItem("authTokenData", tokenData);
  }, [authToken, authTokenData]);

}

export async function getUserId(){
   const jsonString=fs.readFileSync(localStoragePath,'utf-8');
   const authObj=JSON.parse(jsonString);

   const authTokenDataStr=authObj.authTokenData;
   const authTokenData=JSON.parse(authTokenDataStr);

   return authTokenData._id;
}

