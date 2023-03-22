import React from 'react';
import Image, { StaticImageData } from 'next/image';
import * as DutchC from './styles';
import { IconButton } from '@/common';

interface CardProps {
  icon: StaticImageData;
  title: string;
  onBalance?: () => void;
}

const DepositContentCard: React.FC<CardProps> = ({
  icon,
  title,
  onBalance,
}): JSX.Element => {
  return (
    <DutchC.DepositFundContentCard onClick={onBalance}>
      <Image src={icon} alt="paypal" />
      <DutchC.TextDepositBold>{title}</DutchC.TextDepositBold>
      <DutchC.DepostFundRightArrow>
        <IconButton icon="right-arrow" />
      </DutchC.DepostFundRightArrow>
    </DutchC.DepositFundContentCard>
  );
};

export default DepositContentCard;
