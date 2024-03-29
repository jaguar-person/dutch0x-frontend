import React from 'react';
import * as DutchC from './styles';
import NFTCard from '../../cards/nft-card';
import { CreateNftManagementI } from '@/types';

interface NFTAllByCardProps {
  NFTs: CreateNftManagementI[];
  onNFTSelect: (nftId: string) => void;
}

const NFTAllByCard: React.FC<NFTAllByCardProps> = ({
  NFTs,
  onNFTSelect,
}): JSX.Element => {
  return (
    <DutchC.NFTCardWrapper>
      {!NFTs.length && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 dark:text-white">
          No NFTs
        </div>
      )}
      {typeof NFTs === 'object' &&
        NFTs.map((nft) => (
          <div key={nft.nftId} className="w-[230px]">
            <NFTCard
              onSelect={() => onNFTSelect(nft.nftId)}
              type="all"
              {...nft}
            />
          </div>
        ))}
    </DutchC.NFTCardWrapper>
  );
};

export default NFTAllByCard;
