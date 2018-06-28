import { env } from 'decentraland-commons'
import { db } from '../src/database'
import { Token } from '../src/Token'
import { AccountBalance } from '../src/AccountBalance'
import { Poll } from '../src/Poll'
import { Option } from '../src/Option'
import { Vote } from '../src/Vote'
import { loadEnv } from './utils'

async function seed() {
  const tokenAddress = env.get('MANA_TOKEN_CONTRACT_ADDRESS', '')

  console.log('Connecting database')
  await db.connect()

  console.log('Inserting tokens')
  await Promise.all([
    Token.create({
      address: tokenAddress.toLowerCase(),
      name: 'MANAToken',
      symbol: 'MANA'
    })
  ])

  console.log('Inserting account balances')
  await Promise.all([
    AccountBalance.create({
      address: '0x66788F71Bf33EcBd263a57E5F371cCDCaFfc519e',
      balance: '10',
      token_address: tokenAddress
    }),
    AccountBalance.create({
      address: '0x38b5ca83896C7C6Bf4C6178b7458cAAD5412A37A',
      balance: '25',
      token_address: tokenAddress
    }),
    AccountBalance.create({
      address: '0x1d9aa2025b67f0f21d1603ce521bda7869098f8a',
      balance: '15',
      token_address: tokenAddress
    })
  ])

  console.log('Inserting polls')
  await Promise.all([
    Poll.create({
      title: 'Should we support an auction model natively in the Marketplace?',
      balance: '50',
      submitter: '0x66788f71bf33ecbd263a57e5f371ccdcaffc519e',
      closes_at: '1537897526681',
      token_address: tokenAddress
    })
  ])
  const poll = (await Poll.find())[0]

  console.log('Inserting options')
  await Promise.all([
    Option.create({ value: 'YES', poll_id: poll.id }),
    Option.create({ value: 'NO', poll_id: poll.id })
  ])

  const options = await Option.find()

  console.log('Inserting votes')
  await Promise.all([
    Vote.create({
      account_address: '0x66788f71bf33ecbd263a57e5f371ccdcaffc519e',
      account_balance: '10',
      poll_id: poll.id,
      option_id: options[0].id,
      timestamp: Date.now(),
      message: 'signed1',
      signature: 'signature1'
    }),
    Vote.create({
      account_address: '0x38b5ca83896c7c6bf4c6178b7458caad5412a37a',
      account_balance: '25',
      poll_id: poll.id,
      option_id: options[1].id,
      timestamp: Date.now(),
      message: 'signed2',
      signature: 'signature2'
    }),
    Vote.create({
      account_address: '0x1d9aa2025b67f0f21d1603ce521bda7869098f8a',
      account_balance: '15',
      poll_id: poll.id,
      option_id: options[1].id,
      timestamp: Date.now(),
      message: 'signed3',
      signature: 'signature3'
    })
  ])

  process.exit()
}

if (require.main === module) {
  loadEnv()
  seed().catch(error => {
    console.log(error)
    process.exit()
  })
}
