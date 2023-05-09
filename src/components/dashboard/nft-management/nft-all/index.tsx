import React, { useState, useCallback, useEffect } from 'react';
import { CreateNftManagementI, UsageStatusEnum } from '@/types';
import NFTAllByCard from './NFTAllByCard';
import NFTAllByTable from './NFTALLByTable';
import useNFTManagement from '@/hooks/useNFTManagement';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { WebAppReducerI } from '@/ducks';
import { DynamicLoader, SkeletonLoader } from '@/common/Loader';

interface NFTAllProps {
  tableListSwtich: number;
}


const NFTAll: React.FC<NFTAllProps> = ({ tableListSwtich }): JSX.Element => {
  const { getUserNfts } = useNFTManagement();
  const [NFTs, setNFTs] = useState<CreateNftManagementI[]>([]);
  const [loading, setLoading] = useState(false);

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
    const nfts: CreateNftManagementI[] | null | undefined = await getUserNfts(account as string, UsageStatusEnum.UNARCHIVED);
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

  if (tableListSwtich)
    return <NFTAllByTable NFTs={NFTs} onNFTSelect={onNFTSelect} />;
  else return <NFTAllByCard NFTs={NFTs} onNFTSelect={onNFTSelect} />;
};

export default NFTAll;
