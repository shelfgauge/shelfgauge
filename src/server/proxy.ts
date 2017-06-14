import { Context } from 'koa'
import * as http from 'http'
const httpProxy = require('http-proxy')
const HttpsProxyAgent = require('https-proxy-agent')

import ENV from 'config/env'

const PROXY = httpProxy.createProxyServer({
  target: ENV.apiUrl,
  changeOrigin: true,
  agent: (() => {
    if (ENV.apiUrl.startsWith('https://') && ENV.httpsProxy) {
      return new HttpsProxyAgent(ENV.httpsProxy)
    }

    if (ENV.apiUrl.startsWith('http://') && ENV.httpProxy) {
      return new HttpsProxyAgent(ENV.httpProxy)
    }
  })()
})

export default async function (ctx: Context, next: () => Promise<any>): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    PROXY.web(ctx.req, ctx.res, (err: any) => {
      console.log('ERROR', err)
      ctx.status = 502
      resolve()
    })

    ctx.res.on('finish', () => {
      console.log('SUCCESS')
      resolve()
    })
  })
}
