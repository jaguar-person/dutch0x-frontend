import React, { useState, useCallback, useEffect } from 'react';

import NFTCard from '../../cards/nft-card';
import { CreateNftManagementI, NFTI, UsageStatusEnum } from '@/types';

import * as DutchC from './styles';
import useNFTManagement from '@/hooks/useNFTManagement';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { WebAppReducerI } from '@/ducks';
import { SkeletonLoader } from '@/common/Loader';

const NFTArchives = () => {
  const { getUserNfts } = useNFTManagement();
  const [NFTs, setNFTs] = useState<CreateNftManagementI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { account } = useAppSelector((state) => {
    const { account } = state.webAppReducer as WebAppReducerI;
    return { account };
  }, shallowEqual);

  useEffect(() => {
    if (!account) return;
    handleGetNFTs();
  }, [account])

  const handleGetNFTs = async () => {
    setLoading(true);
    const nfts: CreateNftManagementI[] | null | undefined = await getUserNfts(account as string, UsageStatusEnum.ARCHIVED);
    setLoading(false);
    if (nfts) {
      setNFTs(nfts);
    }
  }

  const onNFTSelect = useCallback(
    (nftId: string) => {
      const index = NFTs.findIndex((nft) => nft.nftId === nftId);
      const nft = NFTs.find((nft) => nft.nftId === nftId);
      if (nft) {
        setNFTs([
          ...NFTs.slice(0, index),
          {
            ...nft,
          },
          ...NFTs.slice(index + 1),
        ]);
      }
    },
    [NFTs]
  );

  if (loading) {
    return <SkeletonLoader count={2} width="80vw" height={200} loading={true} />
  }

  return (
    <DutchC.NFTArchivesWrapper>
      {typeof NFTs === 'object' &&
        NFTs.map((nft) => (
          <NFTCard
            key={nft.nftId}
            type="archives"
            onSelect={() => onNFTSelect(nft.nftId)}
            {...nft}
          />
        ))}
    </DutchC.NFTArchivesWrapper>
  );
};

export default NFTArchives;
