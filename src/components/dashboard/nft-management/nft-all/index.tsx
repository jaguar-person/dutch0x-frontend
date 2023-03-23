import React, { useState, useCallback } from 'react';
import { NFTListType } from '@/types';
import NFTAllByCard from './NFTAllByCard';
import NFTAllByTable from './NFTALLByTable';

interface NFTAllProps {
  tableListSwtich: number;
  nftList: NFTListType[];
}

const NFTAll: React.FC<NFTAllProps> = ({
  tableListSwtich,
  nftList,
}): JSX.Element => {
  const [NFTs, setNFTs] = useState<NFTListType[]>(nftList);
  const onNFTSelect = useCallback(
    (nftId: string) => {
      const index = NFTs.findIndex((nft) => nft.nftId === nftId);
      const nft = NFTs.find((nft) => nft.nftId === nftId);
      if (nft) {
        setNFTs([
          ...NFTs.slice(0, index),
          {
            ...nft,
            selected: !nft.selected,
          },
          ...NFTs.slice(index + 1),
        ]);
      }
    },
    [NFTs]
  );

  if (tableListSwtich)
    return <NFTAllByTable NFTs={NFTs} onNFTSelect={onNFTSelect} />;
  else return <NFTAllByCard NFTs={NFTs} onNFTSelect={onNFTSelect} />;
};

export default NFTAll;