import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { Contracts } from './lib/contracts'
import { Account } from './lib/accounts'
import { EVM } from './lib/evm.js'

import { contractAddresses } from './lib/constants'

export interface Options {
  defaultAccount: string
  defaultConfirmations: number
  autoGasMultiplier: number
  testing: boolean
  defaultGas: string
  defaultGasPrice: string
  accounts: string[]
  ethereumNodeTimeout: number
}

export class Vbch {
  web3: Web3
  testing: EVM
  snapshot: Promise<string>
  contracts: Contracts
  vbchAddress: string
  masterChefAddress: string
  wethAddress: string
  strudelAddress: string
  accounts: Account[]

  constructor(
    provider: any,
    networkId: number,
    testing: boolean,
    options: Options,
  ) {
    let realProvider
    if (typeof provider === 'string') {
      if (provider.includes('wss')) {
        realProvider = new Web3.providers.WebsocketProvider(provider, {
          timeout: options.ethereumNodeTimeout || 10000,
        })
      } else {
        realProvider = new Web3.providers.HttpProvider(provider, {
          timeout: options.ethereumNodeTimeout || 10000,
        })
      }
    } else {
      realProvider = provider
    }

    this.web3 = new Web3(realProvider)

    if (testing) {
      this.testing = new EVM(realProvider)
      this.snapshot = this.testing.snapshot()
    }

    if (options.defaultAccount) {
      this.web3.eth.defaultAccount = options.defaultAccount
    }
    this.contracts = new Contracts(realProvider, networkId, this.web3, options)
    this.vbchAddress = contractAddresses.vbch[networkId]
    // this.masterChefAddress = contractAddresses.masterChef[networkId]
    // this.wethAddress = contractAddresses.weth[networkId]
    // this.strudelAddress = contractAddresses.strudel[networkId]
  }

  async resetEVM() {
    this.testing.resetEVM(await this.snapshot)
  }

  addAccount(address: string) {
    this.accounts.push(new Account(this.contracts, address))
  }

  setProvider(provider: any, networkId: number) {
    this.web3.setProvider(provider)
    this.contracts.setProvider(provider, networkId)
    // TODO: Find operations
    // this.operation.setNetworkId(networkId)
  }
}
