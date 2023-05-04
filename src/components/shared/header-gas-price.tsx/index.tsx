import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useDetectClickOutside } from 'react-detect-click-outside';

import * as Icons from '@/common/Icons';
import { Select } from '@/common';

import * as DutchC from './styles';
import { NFTFee } from '@/types';
import useWalletHook from '@/hooks/useWalletHook';
import { useAppDispatch } from '@/redux/store';
import { AxiosError } from 'axios';

interface GasInfoButtonProps {
  onToggle: () => void;
  isOpen: boolean;
  price: number;
  theme?: string;
}

interface GasInfoProps {
  price: number;
  list: { nftType: string; eth: number; cash: number }[];
  setAverageFee: (average: any) => void;
}

interface Currency {
  feeMint: string;
  feeTransfer: string;
  feeWithdrawal: string;
}

export const GasInfoButton: React.FC<GasInfoButtonProps> = ({
  onToggle,
  isOpen = false,
  price,
  theme = 'light',
}) => {
  return (
    <DutchC.GasInfoButtonWrapper onClick={onToggle}>
      <div className="flex items-center gap-x-1.5">
        <Icons.ICustomGas
          currentColor={theme === 'light' ? 'black' : 'white'}
        />
        <span className="truncate w-[94px] font-bold">${price} USD</span>
      </div>
    </DutchC.GasInfoButtonWrapper>
  );
};

const GasInfo: React.FC<GasInfoProps> = (props) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [nftFees, setNftees] = useState<NFTFee>();
  const [activeCurrency, setActiveCurrency] = useState<
    'eth' | 'lrc' | 'usdt' | 'usdc'
  >('eth');
  const [activeCurrencyData, setActiveCurrencyData] = useState<Currency>();
  const { getUserNFTFee } = useWalletHook();
  const dispatch = useAppDispatch();

  const handleClose = (e: Event) => {
    setIsOpen(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setActiveCurrency(
      e.currentTarget.value.toLowerCase() as 'eth' | 'lrc' | 'usdt' | 'usdc'
    );
  };

  const ref = useDetectClickOutside({ onTriggered: handleClose });

  const fetchNftFees = async () => {
    getUserNFTFee()
      .then((data) => {
        setNftees(data);
      })
      .catch((e: AxiosError) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchNftFees();
  }, [dispatch]);

  useEffect(() => {
    handleSetAverageFee();
  }, [nftFees]);

  const handleSetAverageFee = () => {
    if (!nftFees) return;
    const average =
      (parseFloat(nftFees?.fees?.usdt.feeMint as string) +
        parseFloat(nftFees?.fees?.usdt.feeTransfer as string) +
        parseFloat(nftFees?.fees?.usdt?.feeWithdrawal as string)) /
      3;
    props.setAverageFee(average);
  };

  return (
    <DutchC.GasInfoWrapper ref={ref}>
      <GasInfoButton
        onToggle={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
        price={props.price}
        theme={theme}
      />
      <DutchC.GasInfo isOpen={isOpen}>
        <DutchC.GasInfoHeaderWrapper>
          Currency
          <Select
            className="border-none bg-transparent"
            options={[
              { key: 'ETH', value: 'ETH' },
              { key: 'LRC', value: 'LRC' },
              { key: 'USDT', value: 'USDT' },
              { key: 'USDC', value: 'USDC' },
            ]}
            onChange={handleChange}
          />
        </DutchC.GasInfoHeaderWrapper>
        {/* {props.list?.map((item, index) => ( */}
        <DutchC.ProfileMenuFullWidthWrapper>
          <DutchC.ProfileMenuDividerX />
          <DutchC.ProfileMenuNFTWrapper>
            NFT Mint
            <DutchC.ProfileMenuNFTPriceWrapper>
              <DutchC.ProfileMenuNFTPriceEthWrapper>
                <DutchC.ProfileMenuNFTPriceEthText>
                  <>
                    {nftFees?.fees[activeCurrency].feeMint}{' '}
                    {activeCurrency.toUpperCase}
                  </>
                </DutchC.ProfileMenuNFTPriceEthText>
                {activeCurrency === 'eth' && <Icons.ICustomDiamondBlue />}
                {activeCurrency == 'usdt' && <Icons.ICustomUSDTIcon />}
                {activeCurrency == 'usdc' && <Icons.ICustomUSDCIcon />}
                {activeCurrency == 'lrc' && <Icons.ICustomLRCIcon />}
              </DutchC.ProfileMenuNFTPriceEthWrapper>
              <DutchC.ProfileMenuNFTPriceDollarWrapper>
                $ {nftFees?.fees['usdt'].feeMint} USD
              </DutchC.ProfileMenuNFTPriceDollarWrapper>
            </DutchC.ProfileMenuNFTPriceWrapper>
          </DutchC.ProfileMenuNFTWrapper>
        </DutchC.ProfileMenuFullWidthWrapper>

        <DutchC.ProfileMenuFullWidthWrapper>
          <DutchC.ProfileMenuDividerX />
          <DutchC.ProfileMenuNFTWrapper>
            Transfer Fee
            <DutchC.ProfileMenuNFTPriceWrapper>
              <DutchC.ProfileMenuNFTPriceEthWrapper>
                <DutchC.ProfileMenuNFTPriceEthText>
                  <>
                    {nftFees?.fees[activeCurrency].feeTransfer}{' '}
                    {activeCurrency.toUpperCase}
                  </>
                </DutchC.ProfileMenuNFTPriceEthText>
                {activeCurrency === 'eth' && <Icons.ICustomDiamondBlue />}
                {activeCurrency == 'usdt' && <Icons.ICustomUSDTIcon />}
                {activeCurrency == 'usdc' && <Icons.ICustomUSDCIcon />}
                {activeCurrency == 'lrc' && <Icons.ICustomLRCIcon />}
              </DutchC.ProfileMenuNFTPriceEthWrapper>
              <DutchC.ProfileMenuNFTPriceDollarWrapper>
                $ {nftFees?.fees['usdt'].feeTransfer} USD
              </DutchC.ProfileMenuNFTPriceDollarWrapper>
            </DutchC.ProfileMenuNFTPriceWrapper>
          </DutchC.ProfileMenuNFTWrapper>
        </DutchC.ProfileMenuFullWidthWrapper>

        <DutchC.ProfileMenuFullWidthWrapper>
          <DutchC.ProfileMenuDividerX />
          <DutchC.ProfileMenuNFTWrapper>
            Fee Withdrawal
            <DutchC.ProfileMenuNFTPriceWrapper>
              <DutchC.ProfileMenuNFTPriceEthWrapper>
                <DutchC.ProfileMenuNFTPriceEthText>
                  <>
                    {nftFees?.fees[activeCurrency].feeWithdrawal}{' '}
                    {activeCurrency.toUpperCase}
                  </>
                </DutchC.ProfileMenuNFTPriceEthText>
                {activeCurrency === 'eth' && <Icons.ICustomDiamondBlue />}
                {activeCurrency == 'usdt' && <Icons.ICustomUSDTIcon />}
                {activeCurrency == 'usdc' && <Icons.ICustomUSDCIcon />}
                {activeCurrency == 'lrc' && <Icons.ICustomLRCIcon />}
              </DutchC.ProfileMenuNFTPriceEthWrapper>
              <DutchC.ProfileMenuNFTPriceDollarWrapper>
                $ {nftFees?.fees['usdt'].feeWithdrawal} USD
              </DutchC.ProfileMenuNFTPriceDollarWrapper>
            </DutchC.ProfileMenuNFTPriceWrapper>
          </DutchC.ProfileMenuNFTWrapper>
        </DutchC.ProfileMenuFullWidthWrapper>
        {/* ))} */}
      </DutchC.GasInfo>
    </DutchC.GasInfoWrapper>
  );
};

export default GasInfo;
