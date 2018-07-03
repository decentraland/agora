#!/usr/bin/env ts-node

import { execSync } from 'child_process'
import { cli, SQL } from 'decentraland-server'
import { Log } from 'decentraland-commons'

import { db } from '../src/database'
import { AccountBalance } from '../src/AccountBalance'
import { DistrictToken } from '../src/Token'
import { loadEnv, runpsql } from './utils'

interface Project {
  id: string
  name: string
  desc: string
  link: string
  public: boolean
  parcels: number
  priority: number
  lookup: string
  disabled: boolean
}

interface DistrictEntry {
  id: number
  address: string
  project_id: string
  lands: number
  userTimestamp: string
  action: string
  project: Project
}

const log = new Log('init-db')

export async function initializeDatabase() {
  const shouldContinue = await cli.confirm(
    `Careful! this will DROP 'projects' and 'district_entries,
  upsert 'account_balances' and a district token.
Do you wish to continue?`
  )
  if (!shouldContinue) return process.exit()

  log.info('Connecting database')
  await db.connect()

  log.info('Initializing state')
  await dropDumps()

  log.info('Restoring district_entries')
  execSync(runpsql('../dumps/districts.20180105.sql'))

  log.info('Restoring projects')
  execSync(runpsql('../dumps/projects.20180105.sql'))

  log.info('Upserting district accounts')
  await upsertDistrictAccountsFromContributions()

  log.info('Dropping leftover tables')
  await dropDumps()

  log.info('All done!')
  process.exit()
}

async function upsertDistrictAccountsFromContributions() {
  const districtEntries: DistrictEntry[] = await db.query(
    SQL`SELECT D.address, D.project_id, COUNT(*) AS lands,
      (SELECT row_to_json(P.*) FROM projects P WHERE P.id = D.project_id) AS project
        FROM district_entries D
        GROUP BY D.address, D.project_id`
  )

  log.info(`Normalizing ${districtEntries.length} district_entries.`)

  for (const districtEntry of districtEntries) {
    const token = await upsertToken(districtEntry.project)
    if (!token) continue

    const address = districtEntry.address.toLowerCase()

    log.info(`Upserting ${address}`)
    const account = new AccountBalance({
      address,
      token_address: token.get('address'),
      balance: districtEntry.lands.toString()
    })
    await account.upsert({ target: ['address', 'token_address'] })
  }
}

async function upsertToken(project: Project) {
  if (!project.lookup) return null
  const name = project.name

  log.info(`Upserting Token for ${name}`)
  const token = new DistrictToken(name)
  await token.upsert({ target: ['address'] })

  return token
}

async function dropDumps() {
  return db.query(SQL`
    DROP TABLE IF EXISTS district_entries;
    DROP TABLE IF EXISTS projects;
  `)
}
if (require.main === module) {
  loadEnv()
  initializeDatabase().catch(console.error)
}
