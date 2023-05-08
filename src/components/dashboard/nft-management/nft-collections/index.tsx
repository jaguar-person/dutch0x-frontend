import useNFTManagement from '@/hooks/useNFTManagement';
import { UserListI } from '@/types';
import React, { useState, useEffect } from 'react';

import NFTCollectionCard from '../../cards/nft-collection-card';

import * as DutchC from './styles';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { WebAppReducerI } from '@/ducks';
import { SkeletonLoader } from '@/common/Loader';

const NFTCollections = () => {
  const [NFTCollections, setNFTCollections] = useState<UserListI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { account } = useAppSelector((state) => {
    const { account } = state.webAppReducer as WebAppReducerI;
    return { account };
  }, shallowEqual);

  const { getUserCollectionList } = useNFTManagement();

  useEffect(() => {
    if (!account) return;
    (async () => {
      setLoading(true);
      const lists = await getUserCollectionList(account as string);
      setLoading(false);
      if (lists) {
        const userList = lists.map((list) => {
          const imageUrls = list.nfts.map((nft) => nft.image);
          return { ...list, imageUrls };
        });

        setNFTCollections(userList);
      }
    })();
  }, [account]);

  if (loading) {
    return <SkeletonLoader count={2} width="80vw" height={200} loading={true} />
  }

  return (
    <DutchC.NFTCollectionsWrapper>
      {NFTCollections.map((collection, index) => (
        <NFTCollectionCard
          key={index}
          collection={collection}
          onClick={() => console.log('')}
        />
      ))}
    </DutchC.NFTCollectionsWrapper>
  );
};

export default NFTCollections;
