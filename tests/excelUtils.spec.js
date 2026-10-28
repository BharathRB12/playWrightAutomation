const { test, expect } = require('@playwright/test');
const ExcelJs = require('exceljs');

async function writeExcelTest(searchText, replaceValue, filePath) {
    const workBook = new ExcelJs.Workbook();
    await workBook.xlsx.readFile(filePath);
    const workSheet = workBook.getWorksheet("Sheet1");
    const output = await readExcel(workSheet, searchText);
    // price is 2 columns ahead of fruit_name in your sheet
    const priceCol = output.column + 2;
    const cell = workSheet.getCell(output.row, priceCol);
    cell.value = replaceValue;
    await workBook.xlsx.writeFile(filePath);
}

async function readExcel(workSheet, searchText) {
    let output = { row: -1, column: -1 };
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
}
//iteExcelTest("Banana",89,"C:/Users/Admin/Downloads/downloadtest.xlsx");

test('@smoke Upload download excel validation' , async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");

    const searchText='Mango';
    const updateValue='450';
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: "Download" }).click();
    const download = await downloadPromise;
    const filePath = await download.path();
    console.log(filePath);

    await writeExcelTest(searchText,updateValue,filePath);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);
    const textLocator=page.getByText(searchText);
    const desireRow=await page.getByRole('row').filter({has:textLocator });
    await expect(desireRow.locator('#cell-4-undefined')).toContainText(updateValue);

}
);