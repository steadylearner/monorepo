import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useInterval from '../../../../hooks/useInterval'
import useVBTC from '../../../../hooks/useVBTC'
import { getRelayContract } from '../../../../vbtc/utils'
import Skeleton from 'react-loading-skeleton'

interface IBidProgress {
  currentBlock: number
}

const BidProgressBar: React.FC<IBidProgress> = ({ currentBlock }) => {
  const [heightDigest, setHeightDigest] = useState(0)
  const vbtc = useVBTC()

  const relayContract = getRelayContract(vbtc)

  const getRelayStatus = async () => {
    const bestKnownDigest = await relayContract.methods
      .getBestKnownDigest()
      .call()
    const heightDigest = await relayContract.methods
      .findHeight(bestKnownDigest)
      .call()

    setHeightDigest(heightDigest)
  }

  useInterval(getRelayStatus, 1000)

  const blockDiff =
    currentBlock - heightDigest > 6 ? 6 : currentBlock - heightDigest

  const progressBarWidth = 100 - blockDiff * 14.2

  const ProgressDiv = styled.div`
    background-color: #aff3d0;
    height: 56px;
    border: 1px solid #b5b5b5;
    margin-top: 20px;
    box-sizing: border-box;
    min-width: 50px;
  `

  const ContainerDiv = styled.div`
    margin: 50px 0;
  `
  const BlockNum = styled.p`
    text-align: right;
    padding-right: 13px;
    font-size: 0.875rem;
    top: 50%;
    margin-top: 16px;
  `

  const TitleHeading = styled.p`
    font-size: 17px
    margin: 16px 0;
    font-weight:bold
  `

  return (
    <ContainerDiv>
      <TitleHeading>Bitcoin Block Height:</TitleHeading>
      <ProgressDiv>
        <BlockNum>{currentBlock}</BlockNum>
      </ProgressDiv>
      <TitleHeading>Current Relay Block Height:</TitleHeading>
      {heightDigest ? (
        <ProgressDiv
          style={{
            backgroundColor:
              blockDiff > 1
                ? blockDiff > 5
                  ? '#D36357'
                  : '#FFAC33'
                : '#AFF3D0',
            width: `${progressBarWidth}%`,
          }}
        >
          <BlockNum>{heightDigest}</BlockNum>
        </ProgressDiv>
      ) : (
        <Skeleton height={56} style={{ marginTop: '20px' }} />
      )}
    </ContainerDiv>
  )
}

export default BidProgressBar
