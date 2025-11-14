# Daily Finance Automation using PlayWright and creating a CI-CD pipeline using Github Actions
## Summary:📃
Automate end-to-end testing for DailyFinance (https://dailyfinance.roadtocareer.net/) using Playwright by registering a new user and verifying the congratulatory email, saving the user info to a JSON file, logging in and asserting that /user persists
in the URL, adding two items and storing the table data in a text file before logging out, resetting the password via email and logging in with the new password, uploading a profile image (≤100kb) and verifying
that the img src contains "profileImage", and finally configuring a CI/CD pipeline with a GitHub Actions cronjob to run the tests every Friday at 11:59 PM.

## Project Details: 📝
The project includes the following workflows:
###  User Registration & Email Verification 📧
1. Navigate to the site and register a new user.
2. Assert that a congratulatory email is received after registration.
3. Save the registered user’s information in a JSON file for reuse.

### Login & User Page Verification 🔐
1. Log in with the newly registered user.
2. Assert that the /user page URL persists after login.

### Add Items & Save Table Data 📊
1. Add two items in the application.
2. Extract the table data and save it into a text file for verification.
3. Log out the user.

### Password Reset 🔑
1. Reset the user’s password using the email verification link.
2. Log in again with the newly set password.
3. Profile Image Upload
4. Upload a profile image (maximum size 100kb).
5. Verify the upload by checking that the img src contains the text "profileImage".
6. If upload fails, manual verification is performed, and the image is used in automation.
   
### Test Data Handling 🧪
1. localstorage.json is created dynamically during CI runs to store authentication tokens.
2. User data and table data are stored in resources/users.json and resources/tableData.txt respectively.

## Technology stack: ⚙️
* PlayWright 
* TypeScript
* Faker
* Github Actions
  

## Attachments
### Screenshot of playwright report: 📸
<img width="1918" height="1021" alt="Playwright report" src="https://github.com/user-attachments/assets/cbd1b292-1461-40e4-a12e-999a11df8eda" />

## Github Action sequence: 🎬
The project run is configured in actions, it will run every Friday at 11:59 PM 




