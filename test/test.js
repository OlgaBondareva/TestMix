let chai = require('chai')
let chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()
let wd = require('wd')
let serverConfig = require('../helpers/appium').local
let desiredCaps = require('../helpers/caps').capabilities
let credentials = require('../config/credentials')

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness

describe('[mocha]', () => {

  describe('MyShows', () => {
    let driver

    before(() => {
      driver = wd.promiseChainRemote(serverConfig)
      return driver
        .sleep(20000)
        .init(desiredCaps)
        .setImplicitWaitTimeout(5000)
    })

    after(() => {
      return driver
        .quit()
    })

    it('should have right title', () => {
      return driver
        .elementByXPath('//android.widget.ScrollView/android.widget.LinearLayout/android.widget.TextView')
        .text()
        .then((title) => {
          title.should.equal('my shows', `title should be 'my shows'`)
        })
    })

    it('should sign in with good credentials', () => {
      return driver
        .elementById('ru.myshows.activity:id/login_field')
        .type(credentials.login)
        .elementById('ru.myshows.activity:id/password_field')
        .type(credentials.pass)
        .elementById('ru.myshows.activity:id/login_button')
        .click()
        .element('accessibility id', 'Open navigation drawer')
        .then((element) => {
          element.should.not.equal(null, 'navigation drawer button should appear after successful sign in')
        })
    })
  })

})
