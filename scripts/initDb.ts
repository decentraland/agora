#!/usr/bin/env ts-node

import { execSync } from 'child_process'
import { cli } from 'decentraland-server'
import { Log } from 'decentraland-commons'

import { db } from '../src/database'
import { Account } from '../src/Account'
import { DistrictToken } from '../src/Token'
import { loadEnv, runpsql } from './utils'

const log = new Log('init-db')

export async function initializeDatabase() {
  const shouldContinue = await cli.confirm(
    `Careful! this will DROP 'projects' and upsert 'accounts' and a district token.
Do you wish to continue?`
  )
  if (!shouldContinue) return process.exit()

  log.info('Connecting database')
  await db.connect()

  log.info('Initializing state')
  await dropDumps()

  log.info('Restoring district_entries')
  execSync(runpsql('../dumps/districts.20180105.sql'))

  log.info('Upserting district accounts')
  await upsertDistrictAccountsFromContributions()

  log.info('Dropping leftover tables')
  await dropDumps()

  log.info('All done!')
  process.exit()
}

async function dropDumps() {
  return db.query('DROP TABLE IF EXISTS district_entries;')
}

async function upsertDistrictAccountsFromContributions() {
  log.info('Upserting DistrictToken')
  const token = new DistrictToken()
  await token.upsert({ target: ['address'] })

  const districtEntries = await db.query('SELECT * FROM district_entries')

  log.info(`Normalizing ${districtEntries.length} district_entries.`)

  for (const districtEntry of districtEntries) {
    const address = districtEntry.address.toLowerCase()

    log.info(`Upserting ${address}`)
    const account = new Account({
      address,
      token_address: token.get('address'),
      balance: '1'
    })
    await account.upsert({ target: ['address', 'token_address'] })
  }
}

if (require.main === module) {
  loadEnv()
  initializeDatabase().catch(console.error)
}
