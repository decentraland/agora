import * as pulumi from '@pulumi/pulumi'
import { createFargateTask } from 'dcl-ops-lib/createFargateTask'
import { env, envTLD } from 'dcl-ops-lib/domain'
import { acceptDbSecurityGroup } from 'dcl-ops-lib/acceptDb'
import { buildStatic } from 'dcl-ops-lib/buildStatic'

export = async function main() {
  const config = new pulumi.Config()

  const revision = process.env['CI_COMMIT_SHA']
  const image = `decentraland/agora:${revision}`


  const hostname = 'agora-api.decentraland.' + envTLD

  const agoraApi = await createFargateTask(
    `agora-api`,
    image,
    5000,
    [
      { name: 'hostname', value: `agora-api-${env}` },
      { name: 'name', value: `agora-api-${env}` },
      { name: 'NODE_ENV', value: 'development' },
      { name: 'MONITOR_BALANCES_DELAY', value: '100000' },
      { name: 'SERVER_PORT', value: '5000' },
      { name: 'MANA_TOKEN_CONTRACT_ADDRESS', value: '0x2a8fd99c19271f4f04b1b7b9c4f7cf264b626edb' },
      { name: 'CONNECTION_STRING', value: config.requireSecret('CONNECTION_STRING') },
      {
        name: 'SERVER_SIGNING_KEY',
        value: config.requireSecret('SERVER_SIGNING_KEY'),
      },
      {
        name: 'RPC_URL',
        value: config.requireSecret('RPC_URL'),
      }
    ],
    hostname,
    {
      // @ts-ignore
      healthCheck: {
        path: '/status',
        interval: 60,
        timeout: 10,
        unhealthyThreshold: 10,
        healthyThreshold: 3
      },
      version: '1',
      memoryReservation: 1024,
      securityGroups: [(await acceptDbSecurityGroup()).id],
    }
  )

  const agoraFront = buildStatic({
    domain: `agora.decentraland.${env === 'prd' ? 'org' : envTLD}`,
    defaultPath: 'index.html',
  })

  return {
    publicUrl: agoraApi.endpoint,
    cloudfrontDistribution: agoraFront.cloudfrontDistribution,
    bucketName: agoraFront.contentBucket,
  }
}