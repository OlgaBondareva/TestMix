let chai = require('chai')
chai.should()
let wd = require('wd')
let serverConfig = require('../helpers/appium').local
let capabilities = require('../helpers/caps').capabilities
let creds = require('../config/credentials')

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
                  driver.elementById('ru.myshows.activity:id/login_field', (error, loginField) => {
                    driver.type(loginField, creds.login, () => {
                      driver.elementById('ru.myshows.activity:id/password_field', (error, passField) => {
                        driver.type(passField, creds.pass, () => {
                          driver.elementById('ru.myshows.activity:id/login_button', (error, submit) => {
                            driver.clickElement(submit, () => {
                              driver.element('accessibility id', 'Open navigation drawer', (error, navDrawer) => {
                                navDrawer.should.not.equal(undefined, `Can't login :(`)
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
    })

  })

})
