// eslint-disable jsx-a11y/anchor-is-valid

import {makeStyles} from '@material-ui/core'
import React from 'react'

import {ExternalLink} from './ExternalLink'
import {SoChainConfirmedGetTx, Proof, Transaction} from '../../../types/types'
import useModal from '../../../hooks/useModal'
import {apiServer} from '../../../constants/backendAddresses'

import BurnModal from '../../../views/Home/components/BurnModal'
import useVBTC from '../../../hooks/useVBTC'
import {getVbtcContract, proofOpReturnAndMint} from '../../../vbtc/utils'
import {useWallet} from 'use-wallet'
import showError from '../../../utils/showError'

const useStyles = makeStyles((theme) => ({
  viewLink: {
    fontSize: 12,
    marginRight: theme.spacing(1),
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}))

interface pushEthParam {
  ethTxHash: string
}

const pushEthTxHash = async (
  ethParam: pushEthParam,
  tx: Transaction,
): Promise<Response> => {
  const url =
    apiServer +
    '/production/payment/' +
    tx.btcTxHash +
    '/output/' +
    tx.burnOutputIndex +
    '/addEthTx'
  const opts: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(ethParam),
  }
  return fetch(url, opts)
}

const getProof = async (
  tx_data: string,
  tx_hash: string,
  block_hash: string,
): Promise<Response> => {
  const url = apiServer + '/production/proof/' + tx_hash + '/' + block_hash
  const opts: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({txData: tx_data}),
  }
  return fetch(url, opts)
}

const callProofHelper = async (
  proof: Proof,
  burnOutputIndex: number,
  account: any,
  vbtcContract: any,
): Promise<string> => {
  return await proofOpReturnAndMint(
    vbtcContract,
    account,
    proof,
    burnOutputIndex,
  )
  // TODO: errors
}

const callProofOpReturnAndMint = async (
  tx: Transaction,
  handleLoading: (status: boolean) => void,
  account: any,
  vbtcContract: any,
) => {
  handleLoading(true)
  let proof
  if (!tx.hasOwnProperty('proof')) {
    const txHash = await new Promise<string>((res, rej) => {
      res('0x89AB6D3C799d35f5b17194Ee7F07253856A67949')
    })
    let res = await fetch(
      `https://sochain.com/api/v2/get_tx/BTC/${tx.btcTxHash}`,
    )
      .then((response) => response.json())
      .catch((e) => {
        //TODO: handle error
        showError('SoChain API Error')
        return undefined
      })
      .then((res: SoChainConfirmedGetTx) => res)
    if (res === undefined) {
      handleLoading(false)
      return
    }
    proof = await getProof(res.data.tx_hex, tx.btcTxHash, res.data.blockhash)
      .then((response1) => response1.json())
      .catch((e) => {
        //TODO: handle error
        showError(e.errorMessage)
        return undefined
      })
      .then((result: string) => JSON.parse(result))
    if (proof === undefined) {
      handleLoading(false)
      return
    }
    tx.proof = proof
  } else {
    proof = tx.proof
  }
  const ethTxHash = await callProofHelper(
    proof,
    Number(tx.burnOutputIndex),
    account,
    vbtcContract,
  ).catch((e) => {
    showError(e.message)
    return undefined
  })
  if (ethTxHash !== undefined) {
    tx.ethTxHash = ethTxHash
    await pushEthTxHash({ethTxHash: ethTxHash}, tx).catch((e) => {
      showError(e.errorMessage)
    })
  }
  handleLoading(false)
}

interface Props {
  tx: Transaction
  confirmation?: number
  handleLoading?: (status: boolean) => void
  isLoading?: boolean
}

const ConversionActions: React.FC<Props> = ({
  tx,
  confirmation,
  handleLoading,
  isLoading,
}) => {
  const {account} = useWallet()
  const vbtc = useVBTC()
  const vbtcContract = getVbtcContract(vbtc)

  const targetBtcConfs = 6
  const isConfirmed = confirmation >= targetBtcConfs
  const classes = useStyles()
  const [showModal] = useModal(
    <BurnModal value={tx.value} address={tx.ethAddress} continueV={true} />,
  )
  return (
    <React.Fragment>
      <div>
        {!tx.hasOwnProperty('confirmed') && (
          <React.Fragment>
            <a className={classes.viewLink} onClick={showModal}>
              View Bridge Address
            </a>
          </React.Fragment>
        )}
        {tx.btcTxHash && (
          <ExternalLink
            className={classes.viewLink}
            href={`https://sochain.com/tx/BTC/${tx.btcTxHash}`}
          >
            View BTC TX
          </ExternalLink>
        )}
        {tx.ethTxHash && (
          <ExternalLink
            className={classes.viewLink}
            href={'https://etherscan.io/tx/' + tx.ethTxHash}
          >
            View ETH TX
          </ExternalLink>
        )}
        {(tx.confirmed || isConfirmed) && !tx.ethTxHash && (
          <React.Fragment>
            {!isLoading ? (
              <a
                className={classes.viewLink}
                onClick={() => {
                  callProofOpReturnAndMint(
                    tx,
                    handleLoading,
                    account,
                    vbtcContract,
                  )
                }}
              >
                Claim vBTC
              </a>
            ) : (
              <a>Loading</a>
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}

export default ConversionActions
