import dayjs from 'dayjs'

export interface LoggerBase {
  log(msg: string): void
  error(msg: string): void
}

class Logger implements LoggerBase {
  private format(msg: string, pattern = 'YYYY/MM/DD HH:mm:ss') {
    const now = dayjs().format(pattern)
    return `[${now}]：${msg}`
  }
  log(msg: string): void {
    console.log(this.format(msg))
  }
  error(msg: string): void {
    console.error(this.format(msg))
  }
}

export const logger = new Logger()
