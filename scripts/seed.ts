import { db } from '../src/database'
import { Token } from '../src/Token'
import { Account } from '../src/Account'
import { Poll } from '../src/Poll'
import { Option } from '../src/Option'
import { Vote } from '../src/Vote'
import { loadEnv } from './utils'

async function seed() {
  console.log('Connecting database')
  await db.connect()

  console.log('Inserting tokens')
  await Promise.all([
    Token.insert({
      address: '0xdeadbeef',
      name: 'MANAToken',
      symbol: 'MANA'
    }),
    Token.insert({
      address: '0xbeefdead',
      name: 'ZANAXToken',
      symbol: 'ZANAX'
    })
  ])

  console.log('Inserting accounts')
  await Promise.all([
    Account.insert({
      id: 1,
      address: '0x66788F71Bf33EcBd263a57E5F371cCDCaFfc519e',
      token_address: '0xdeadbeef',
      balance: '10'
    }),
    Account.insert({
      id: 2,
      address: '0x38b5ca83896C7C6Bf4C6178b7458cAAD5412A37A',
      token_address: '0xdeadbeef',
      balance: '25'
    }),
    Account.insert({
      id: 3,
      address: '0x1d9aa2025b67f0f21d1603ce521bda7869098f8a',
      token_address: '0xdeadbeef',
      balance: '15'
    })
  ])

  console.log('Inserting polls')
  await Promise.all([
    Poll.insert({
      id: 1,
      title: 'Should we support an auction model natively in the Marketplace?',
      balance: '50',
      token_address: '0xdeadbeef',
      submitter: '0x1d9aa2025b67f0f21d1603ce521bda7869098f8a',
      closes_at: '1527785152247000'
    })
  ])

  console.log('Inserting options')
  await Promise.all([
    Option.insert({ id: 1, value: 'YES', poll_id: 1 }),
    Option.insert({ id: 2, value: 'NO', poll_id: 1 })
  ])

  console.log('Inserting votes')
  await Promise.all([
    Vote.insert({
      id: 1,
      address: '0x66788F71Bf33EcBd263a57E5F371cCDCaFfc519e',
      poll_id: 1,
      option_id: 1,
      message: 'signed1',
      signature: 'signature1'
    }),
    Vote.insert({
      id: 2,
      address: '0x38b5ca83896C7C6Bf4C6178b7458cAAD5412A37A',
      poll_id: 1,
      option_id: 2,
      message: 'signed2',
      signature: 'signature2'
    }),
    Vote.insert({
      id: 3,
      address: '0x1d9aa2025b67f0f21d1603ce521bda7869098f8a',
      poll_id: 1,
      option_id: 2,
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
