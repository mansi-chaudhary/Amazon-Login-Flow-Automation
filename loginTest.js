// import { Builder, By } from "selenium-webdriver";
// import chai from "chai";

// const { expect } = chai;

// describe("Amazon Login Automation", function () {
//   this.timeout(10000);
//   let driver;

//   before(async function () {
//     driver = await new Builder().forBrowser("chrome").build();
//   });

//   it("Should navigate to the Amazon sign-in page", async function () {
//     await driver.get("https://www.amazon.in/");
//     await driver.findElement(By.id("nav-link-accountList")).click();

//     const url = await driver.getCurrentUrl();
//     console.log("Current URL:", url); // 🐛 Debugging help

//     expect(url).to.include("/ap/signin"); // More stable than title
//   });

//   after(async function () {
//     if (driver) await driver.quit();
//   });
// });

import { Builder, By, Key, until } from "selenium-webdriver";
import chai from "chai";

const { expect } = chai;

describe("Amazon Login Test", function () {
  this.timeout(20000); // 20 seconds for the whole test
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Should log in to Amazon successfully", async function () {
    await driver.get("https://www.amazon.in/");

    // Wait and click "Sign in" button
    const signInButton = await driver.wait(
      until.elementLocated(By.id("nav-link-accountList")),
      10000
    );
    await signInButton.click();

    // Wait for the email input to appear
    const emailInput = await driver.wait(
      until.elementLocated(By.id("ap_email")),
      10000
    );
    await emailInput.sendKeys("e21cseu0413@bennett.edu.in");

    const continueBtn = await driver.findElement(By.id("continue"));
    await continueBtn.click();

    // Wait for password field
    const passwordInput = await driver.wait(
      until.elementLocated(By.id("ap_password")),
      10000
    );
    await passwordInput.sendKeys("Mansi022@");

    const signInSubmit = await driver.findElement(By.id("signInSubmit"));
    await signInSubmit.click();

    // Wait until user is signed in (look for greeting text)
    const greeting = await driver.wait(
      until.elementLocated(By.id("nav-link-accountList-nav-line-1")),
      10000
    );

    const greetingText = await greeting.getText();
    expect(greetingText).to.include("Hello");
  });

  after(async function () {
    await driver.quit();
  });
});