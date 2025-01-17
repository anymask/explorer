import { TransactionStatus } from '@/common/constants';
import { TxStatus } from '@/common/types/tx';
import { ClockIcon } from '@/components/icons/clock';
import { FailedIcon } from '@/components/icons/failed';
import { MicroblockIcon } from '@/components/icons/microblock';
import { Circle, IconProps } from '@/ui/components';
import { FunctionIcon } from '@/ui/icons';
import { StxIcon } from '@/ui/icons/StxIcon';
import { useColorMode } from '@chakra-ui/react';
import React, { FC } from 'react';
import { IconType } from 'react-icons';
import { BsCodeSlash } from 'react-icons/bs';

import { Transaction } from '@stacks/stacks-blockchain-api-types';
import { TransactionType } from '@stacks/stacks-blockchain-api-types/generated';

export const getTxTypeIcon = (txType: Transaction['tx_type']): IconType => {
  if (txType === 'smart_contract') {
    return BsCodeSlash;
  }
  if (txType === 'contract_call') {
    return FunctionIcon;
  }
  return StxIcon;
};

const StatusBubble: React.FC<{ txStatus?: TxStatus }> = ({ txStatus }) => {
  const colorMode = useColorMode().colorMode;
  if (txStatus === TransactionStatus.PENDING) {
    return (
      <Circle size="16px" position="absolute" bottom="-2px" right="-4px" zIndex={10}>
        <ClockIcon color={`invert.${colorMode}`} fill={`bg.${colorMode}`} />
      </Circle>
    );
  } else if (txStatus === TransactionStatus.FAILED) {
    return (
      <Circle size="16px" position="absolute" bottom="-2px" right="-4px" zIndex={10}>
        <FailedIcon color={`feedbackError.${colorMode}`} fill={`bg.${colorMode}`} />
      </Circle>
    );
  } else if (txStatus === TransactionStatus.SUCCESS_MICROBLOCK) {
    return (
      <Circle
        bg={`invert.${colorMode}`}
        size="16px"
        position="absolute"
        bottom="-2px"
        right="-4px"
        boxShadow={'none'}
        zIndex={10}
      >
        <MicroblockIcon color={`bg.${colorMode}`} fill={`bg.${colorMode}`} size="10px" />
      </Circle>
    );
  } else {
    return null;
  }
};

export const TxIcon: FC<
  {
    txType?: TransactionType;
    txStatus?: TxStatus;
  } & IconProps
> = ({ txType, txStatus, ...rest }) => {
  const showTxStatusBubble = txStatus !== TransactionStatus.SUCCESS_ANCHOR_BLOCK;

  const TxIcon = txType ? getTxTypeIcon(txType) : null;

  return (
    <Circle size={'40px'} position={'relative'}>
      {showTxStatusBubble && <StatusBubble txStatus={txStatus} />}
      {TxIcon && <TxIcon color={'textCaption.light'} size="16px" />}
    </Circle>
  );
};
