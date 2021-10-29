const puppeteer = require("puppeteer")

async function starter(documentNumber) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    "https://portaldocontribuinte.minfin.gov.ao/consultar-nif-do-contribuinte"
  )

  await page.type("input[name='j_id_45:txtNIFNumber']", documentNumber)
  const button = await page.$x("//*[@id='j_id_45:j_id_4c']")
  await button[0].click()

  await page.waitForSelector(".panel-default-header")
  const content = await page.evaluate(() => {
    const getElement = document.querySelectorAll("label")
    const fromElementToArray = [...getElement]
    const data = []
    fromElementToArray.map((value) => data.push(value.textContent))
    const responseData = [data[2], data[4], data[6], data[8]]
    return {
      documentNumber: responseData[0],
      documentFullName: responseData[1],
      documentState: responseData[2],
      documentType: responseData[3],
    }
  })
  const userData = content
  await browser.close()
  return userData
}

module.exports = starter
