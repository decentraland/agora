import { env } from 'decentraland-commons'
import { db } from '../src/database'
import { Token } from '../src/Token'
import { Account } from '../src/Account'
import { Poll } from '../src/Poll'
import { Option } from '../src/Option'
import { Vote } from '../src/Vote'
import { loadEnv } from './utils'

async function seed() {
  const tokenAddress = env.get('MANA_TOKEN_CONTRACT_ADDRESS')

  console.log('Connecting database')
  await db.connect()

  console.log('Inserting tokens')
  await Promise.all([
    Token.insert({
      address: tokenAddress,
      name: 'MANAToken',
      symbol: 'MANA'
    })
  ])

  console.log('Inserting accounts')
  await Promise.all([
    Account.insert({
      address: '0x66788f71bf33ecbd263a57e5f371ccdcaffc519e',
      balance: '10',
      token_address: tokenAddress
    }),
    Account.insert({
      address: '0x38b5ca83896c7c6bf4c6178b7458caad5412a37a',
      balance: '25',
      token_address: tokenAddress
    })
  ])

  console.log('Inserting polls')
  await Promise.all([
    Poll.insert({
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
    Option.insert({ value: 'YES', poll_id: poll.id }),
    Option.insert({ value: 'NO', poll_id: poll.id })
  ])

  const options = await Option.find()

  console.log('Inserting votes')
  await Promise.all([
    Vote.insert({
      account_address: '0x66788f71bf33ecbd263a57e5f371ccdcaffc519e',
      account_balance: '10',
      poll_id: poll.id,
      option_id: options[0].id,
      message: 'signed1',
      signature: 'signature1'
    }),
    Vote.insert({
      account_address: '0x38b5ca83896c7c6bf4c6178b7458caad5412a37a',
      account_balance: '25',
      poll_id: poll.id,
      option_id: options[1].id,
      message: 'signed2',
      signature: 'signature2'
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
