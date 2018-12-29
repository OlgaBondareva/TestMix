let chai = require('chai')
chai.should()
let wd = require('wd')
let serverConfig = require('../helpers/appium').local
let capabilities = require('../helpers/caps').capabilities
let credentials = require('../helpers/credentials')

describe('[callback]', () => {

  describe('MyShows', () => {
    let driver = wd.remote(serverConfig)

    it('should have right title on login activity', () => {
      driver
        .sleep(10000, () => {
          driver.init(capabilities, () => {
            driver.setImplicitWaitTimeout(5000, () => {
              driver.elementByXPath('//android.widget.ScrollView/android.widget.LinearLayout/android.widget.TextView', (error, title) => {
                driver.text(title, (error, titleText) => {
                  titleText.should.equal('my shows')
                  driver.quit()
                })
              })
            })
          })
        })
    })

  })

})
