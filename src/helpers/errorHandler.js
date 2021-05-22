import StackdriverErrorReporter from 'stackdriver-errors-js'

const STACK_DRIVER_KEY = ''
const STACK_DRIVER_APP = ''

export class ErrorHandler {
  start () {
    if (process.env.NODE_ENV !== 'production') {
      return
    }

    this.stackdriver = new StackdriverErrorReporter()
    this.stackdriver.start({
      key: STACK_DRIVER_KEY,
      projectId: STACK_DRIVER_APP,
      service: 'client',
      reportUncaughtExceptions: true,
      reportUnhandledPromiseRejections: true,
    })
  }

  report (error) {
    if (this.stackdriver == null) {
      console.log(error)
    } else {
      this.stackdriver.report(error)
    } 
  }
}

const instance = new ErrorHandler()
export default instance
