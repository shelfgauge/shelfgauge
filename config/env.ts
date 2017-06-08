import { config } from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

config({ path: '.env' })
config({ path: `.env.${process.env.NODE_ENV}` })

const MISSING = [] as string[]

function get<T> (key: string, defawlt: T | undefined, coerce: (str: string) => T): T {
  const value: string = process.env[key]
  if (value != null) {
    return coerce(value)
  }

  if (defawlt != null) {
    return defawlt
  }

  MISSING.push(key)
  return null as any
}

function str (key: string, defawlt?: string): string {
  return get(key, defawlt, String)
}

function num (key: string, defawlt?: number): number {
  return get(key, defawlt, parseInt)
}

function bool (key: string, defawlt?: boolean): boolean {
  return get(key, defawlt, (str) => ('tTyY'.includes(str[0])))
}

export default {
  nodeEnv:    str('NODE_ENV'),

  port:       num('PORT', 23456),
  apiUrl:     str('API_URL'),
  httpProxy:  str('http_proxy', '') || str('HTTP_PROXY' || ''),
  httpsProxy: str('https_proxy', '') || str('HTTPS_PROXY' || ''),
}

if (MISSING.length > 0) {
  throw new Error(`ENV variables not defined: ${MISSING.join(', ')}`)
}
