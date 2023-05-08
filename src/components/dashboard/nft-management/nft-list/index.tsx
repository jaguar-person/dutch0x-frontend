import React, { useState, useEffect } from 'react';
import { NFTI, UserListI } from '@/types';
import NFTListByCard from './NFTListByCard';
import NFTListByTable from './NFTListByTable';
import useNFTManagement from '@/hooks/useNFTManagement';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { WebAppReducerI } from '@/ducks';
import { SkeletonLoader } from '@/common/Loader';

interface NFTListProps {
  tableListSwtich: number;
  nftList: NFTI[];
  onShowListModal: () => void;
}

const NFTLists: React.FC<NFTListProps> = ({
  tableListSwtich,
  nftList,
  onShowListModal,
}): JSX.Element => {
  const { getUserNftList } = useNFTManagement();
  const [NFTs, setNFTs] = useState<UserListI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { account } = useAppSelector((state) => {
    const { account } = state.webAppReducer as WebAppReducerI;
    return { account };
  }, shallowEqual);


  useEffect(() => {
    if (!account) return;
    (async () => {
      setLoading(true);
      const lists = await getUserNftList(account);
      setLoading(false);
      if (lists) {
        const userList = lists.map((list) => {
          const imageUrls = list.nfts.map((nft) => nft.image);
          return { ...list, imageUrls };
        });

        setNFTs(userList);
      }
    })();
  }, [account]);

  if (loading) {
    return <SkeletonLoader count={2} width="80vw" height={200} loading={true} />
  }

  if (tableListSwtich)
    return (
      <NFTListByTable multiNFTs={NFTs} onShowListModal={onShowListModal} />
    );
  else
    return <NFTListByCard multiNFTs={NFTs} onShowListModal={onShowListModal} />;
};

export default NFTLists;
