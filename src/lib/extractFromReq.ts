import { server } from 'decentraland-server'
import { Request } from 'express'

function getString(req: Request, param: string, defaultValue: any = null) {
  try {
    return server.extractFromReq(req, param)
  } catch (error) {
    return defaultValue
  }
}

function getBoolean(
  req: Request,
  param: string,
  defaultValue: boolean = false
) {
  let result = getString(req, param, defaultValue.toString())
  if (result === 'true') {
    return true
  }
  if (result === 'false') {
    return false
  }

  throw new Error(
    `Invalid param "${param}", expected a boolean value but got "${result}"`
  )
}

function getNumber(
  req: Request,
  param: string,
  defaultValue: number = 0,
  min?: number,
  max?: number
) {
  let result = getString(req, param, defaultValue.toString())
  if (isNaN(Number(result))) {
    throw new Error(
      `Invalid param "${param}", expected a numeric value but got "${result}"`
    )
  }
  result = Number(result)
  if (typeof min !== 'undefined') {
    result = Math.max(result, min)
  }
  if (typeof max !== 'undefined') {
    result = Math.min(result, max)
  }
  return result
}

export { getString, getBoolean, getNumber }
