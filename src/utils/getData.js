const puppeteer = require("puppeteer")

async function starter(documentNumber) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(process.env.PROVIDER_PAGE)

  //open page in website

  await page.type("input[name='j_id_45:txtNIFNumber']", documentNumber)

  //filling the input

  const button = await page.$x("//*[@id='j_id_45:j_id_4c']")
  await button[0].click()

  //pressed button search

  await page.waitForSelector(".panel-default-header")

  //reference local for indicates returns of data

  const content = await page.evaluate(() => {
    const getElement = document.querySelectorAll("label")

    //get every label from html like nodeList

    const fromElementToArray = [...getElement]

    //transform in array JS

    const data = []
    fromElementToArray.map((value) => data.push(value.textContent))
    // transform in array with only content of labels

    const responseData = [data[2], data[4], data[6], data[8]]
    //select my data for return

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
