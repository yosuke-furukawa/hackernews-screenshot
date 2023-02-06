import Puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda";
import os, { platform } from "node:os";
let page: Puppeteer.Page | null = null;

async function getBrowserPage() {
    let browser;
    const platform = os.platform();
    if (platform === "darwin") {
        browser = await Puppeteer.launch({
            // args: chrome.args,
            executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            headless: true,
        });
    } else {
        browser = await Puppeteer.launch({
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: true,
        });
    }
    page = await browser.newPage();
    return page;
}

export async function getScreenShot(url: string) {
    const page = await getBrowserPage();
    page.setViewport({ width: 400, height: 240 });
    await page.goto(url);
    const screenshot = await page.screenshot({
        type: "png",
        encoding: "base64"
    });
    return screenshot as string;
}