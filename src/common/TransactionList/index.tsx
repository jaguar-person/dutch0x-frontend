import React from 'react';
import Image from 'next/image';
import { MintStatusEnum } from '@/types';
import * as DutchC from './styles';
import { getIpfsHttpUrl } from '@/lib/pinata';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { CreatePageReducerI } from '@/components/create/ducks';
import { DynamicLoader } from '../Loader';

const TransactionList: React.FC = () => {
  const { mintingNfts } = useAppSelector((state) => {
    const { mintModal } = state.createPageReducer as CreatePageReducerI;
    return { mintingNfts: mintModal.mintingNfts };
  }, shallowEqual);

  return (
    <DutchC.TransListWrapper>
      {mintingNfts.map((action, index) => (
        <DutchC.ListElementWrapper key={index}>
          <DutchC.ActionInfoWrapper>
            <DutchC.ActionInfoNo>{action.id}</DutchC.ActionInfoNo>
            <Image
              src={getIpfsHttpUrl(action.media)}
              alt="img"
              width={40}
              height={40}
            />
            <DutchC.TextSmall>{action.name}</DutchC.TextSmall>
          </DutchC.ActionInfoWrapper>
          {action.status === MintStatusEnum.QUEUED && (
            <DutchC.StatusQueued>Queued</DutchC.StatusQueued>
          )}
          {action.status === MintStatusEnum.MINTING && (
            <DutchC.StatusMinting>
              <DynamicLoader width={16} color="#FF4800" />
              <p className="text-sm font-bold text-primary-orange relative">
                Minting
              </p>
            </DutchC.StatusMinting>
          )}
          {action.status === MintStatusEnum.SUCCESS && (
            <DutchC.StatusSuccess>Success</DutchC.StatusSuccess>
          )}
          {action.status === MintStatusEnum.FAILED && (
            <DutchC.StatusFailed>Failed</DutchC.StatusFailed>
          )}
        </DutchC.ListElementWrapper>
      ))}
    </DutchC.TransListWrapper>
  );
};

export default TransactionList;
