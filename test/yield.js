let chai = require('chai')
chai.should()
let wd = require('wd')
let serverConfig = require('../helpers/appium').local
let capabilities = require('../helpers/caps').capabilities
let creds = require('../helpers/credentials')

//todo: need to fix this test
describe('[yield]', () => {
    it('MyShows should have right title and login', function * () {
        wd.remote(serverConfig, function * () {
          yield this.init(capabilities)
          yield this.setImplicitWaitTimeout(5000)
          let title = yield this.elementByXPath('//android.widget.ScrollView/android.widget.LinearLayout/android.widget.TextView')
          let titleText = yield title.text()
          titleText.should.equal('my shows')
          let loginFiled = yield this.elementById('ru.myshows.activity:id/login_field')
          yield this.type(loginFiled, creds.login)
          let passField = this.elementById('ru.myshows.activity:id/password_field')
          yield this.type(passField, creds.pass)
          let submitBtn = yield this.elementById('ru.myshows.activity:id/login_button')
          yield this.clickElement(submitBtn)
          let navDrawer = yield this.element('accessibility id', 'Open navigation drawer')
          navDrawer.should.not.equal(undefined, `Can't login :(`)
          yield this.quit()
        })
      }
    )
  }
)

