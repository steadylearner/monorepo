import React, { useCallback } from 'react'
import styled from 'styled-components'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useVBTC from '../../../hooks/useVBTC'
import { getStrudelAddress, getVbtcAddress } from '../../../bridgeTokens/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import Button from '../../Button'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'
import ValueBTC from '../../ValueBTC'
import StrudelIcon from '../../StrudelIcon'
import useETH from '../../../hooks/useETH'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { eth, setStatus: setStatus } = useETH()
  const account = eth?.account

  const handleSignOutClick = useCallback(() => {
    onDismiss!()
    setStatus('inactive')
  }, [onDismiss])

  const vbtc = useVBTC()
  const strudelBalance = useTokenBalance(getStrudelAddress(vbtc))
  const vbtcBalance = useTokenBalance(getVbtcAddress(vbtc))
  return (
    <Modal>
      <ModalTitle text="My Account" />
      <ModalContent>
        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            <StrudelIcon size={80} />
            <Spacer />
            <StyledBalance>
              <Value value={getBalanceNumber(strudelBalance)} />
              <Label text="$TRDL Balance" />
            </StyledBalance>
            <StyledBalance>
              <ValueBTC value={getBalanceNumber(vbtcBalance)} />
              <Label text="vBTC Balance" />
            </StyledBalance>
          </StyledBalanceWrapper>
        </div>

        <Spacer />
        <Button
          href={`https://etherscan.io/address/${account}`}
          text="View on Etherscan"
          variant="secondary"
          BCH={true}
        />
        <Spacer />
        <Button
          onClick={handleSignOutClick}
          text="Sign out"
          variant="secondary"
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text="Cancel" />
      </ModalActions>
    </Modal>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
