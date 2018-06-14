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
      address: '0x66788F71Bf33EcBd263a57E5F371cCDCaFfc519e',
      balance: '10',
      token_address: tokenAddress
    }),
    Account.insert({
      address: '0x38b5ca83896C7C6Bf4C6178b7458cAAD5412A37A',
      balance: '25',
      token_address: tokenAddress
    }),
    Account.insert({
      address: '0x66788f71bf33ecbd263a57e5f371ccdcaffc519e',
      balance: '15',
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
      address: '0x66788F71Bf33EcBd263a57E5F371cCDCaFfc519e',
      poll_id: poll.id,
      option_id: options[0].id,
      message: 'signed1',
      signature: 'signature1'
    }),
    Vote.insert({
      address: '0x38b5ca83896C7C6Bf4C6178b7458cAAD5412A37A',
      poll_id: poll.id,
      option_id: options[1].id,
      message: 'signed2',
      signature: 'signature2'
    }),
    Vote.insert({
      address: '0x1d9aa2025b67f0f21d1603ce521bda7869098f8a',
      poll_id: poll.id,
      option_id: options[1].id,
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
