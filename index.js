const puppeteer = require('puppeteer')
;(async () => {
  // launch and create a new page
  const browser = await puppeteer.launch({
    headless: 'new',
    // defaultViewport: null,
    // args: ['--window-size=1920,1080'],
  })

  const page = await browser.newPage()
  // await page.setViewport({
  //   width: 1920,
  //   height: 1080,
  //   deviceScaleFactor: 1,
  //   isLandscape: true,
  // })

  // go to page in printonly mode, wait for any network events to settle
  await page.goto('http://localhost:3000?printonly=true', {
    waitUntil: 'networkidle2',
  })

  await page.emulateMediaType('screen')
  // output to a local file

  const version = new Date().getTime()

  await page.pdf({
    path: `output/resume-v${version}.pdf`,
    // format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  })

  // close
  await browser.close()
})()
