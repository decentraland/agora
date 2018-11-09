#!/usr/bin/env ts-node

import { Log, env } from 'decentraland-commons'
import { contracts, eth } from 'decentraland-eth'
import { db } from '../src/database'
import { Token, TokenAttributes, DistrictToken } from '../src/Token'
import { AccountBalance, AccountBalanceAttributes } from '../src/AccountBalance'
import { loadEnv } from './utils'
import { Poll } from '../src/Poll'
import { Vote } from '../src/Vote'

const log = new Log('monitor')

type BigNumber = {
  toString(): string
  toNumber(): number
}
interface ERC20Token extends contracts.ERC20Token {
  balanceOf(address: string): Promise<BigNumber>
}
interface TokenContracts {
  [contractAddress: string]: ERC20Token
}

const tokenContracts: TokenContracts = {}

export async function main() {
  log.info('Connecting database')
  await db.connect()

  const tokens = await Token.find<TokenAttributes>()

  for (const token of tokens) {
    if (DistrictToken.isValid(token)) continue

    const tokenContract = Object.create(new contracts.ERC20Token(token.address))
    tokenContract.getContractName = () => token.name
    tokenContracts[token.address] = tokenContract
  }

  try {
    log.info(`Connecting to Ethereum Node with ${tokens.map(t => t.name)}`)
    await eth.connect({
      contracts: Object.values(tokenContracts),
      provider: env.get('RPC_URL')
    })

    const delay = env.get('MONITOR_BALANCES_DELAY', '10000')
    log.info(`Using ${delay}ms as delay between updates`)
    await monitorBalances(Number(delay))
  } catch (error) {
    log.info('Whoops, something went wrong')
    log.info(error)

    process.exit()
  }
}

async function monitorBalances(delay: number) {
  log.info('Updating Account balances')
  await updateAccountBalances()

  log.info('Updating Poll balances')
  await Poll.updateBalances()

  log.info(`Sleeping for ${delay}ms`)
  setTimeout(() => monitorBalances(delay), delay)
}

async function updateAccountBalances() {
  const accounts = await AccountBalance.find<AccountBalanceAttributes>()

  for (const account of accounts) {
    const { address, token_address } = account
    const contract = tokenContracts[token_address]

    /*
      Perf improvement to avoid updating contributors account balances
      as they are fixed and only set once. It's important that a proper
      row exist before using the app that map a contributor address to
      it's contributions for each district
      ref: https://github.com/decentraland/agora/pull/126
    */
    if (DistrictToken.isAddress(token_address)) {
      continue
    }

    if (!contract) {
      log.info(`No contract for address ${token_address} in account ${address}`)
      continue
    }

    const contractBalance = await contract.balanceOf(address)
    const balance = eth.utils.fromWei(contractBalance).toString()

    log.info(`Updating Accounts and votes ${address} with balance ${balance}`)
    await Promise.all([
      AccountBalance.update<AccountBalanceAttributes>(
        { balance },
        { address, token_address }
      ),
      Vote.updateBalance(account, balance)
    ])
  }
}

if (require.main === module) {
  loadEnv()
  main().catch(error => console.error(error))
}

process.on('unhandledRejection', function(e) {
  console.error('An error occured', e.message)
  process.exit(1)
})
