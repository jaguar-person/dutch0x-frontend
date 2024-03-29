import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

// components
import { Dropdown, Button, SearchInput } from '@/common';
import { Guide, Breadcrumb } from '@/components/shared';
import * as DutchC from './styles';

// icons
import * as Icons from '@/common/Icons';
import MintingModal from './minting';
import useNFTHook from '@/hooks/useNFTHook';
import { DraftNFTResponseI } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import CollectionDropdown from '@/common/Dropdown/CollectionDropdown';
import { getIpfsHttpUrl } from '@/lib/pinata';
import {
  setDraftNFTs,
  setMintModalIsOpen,
  setSelectedDraftNFTs,
} from './ducks';

import { ContentLayout } from '../layout';

type DraftNFTProps = DraftNFTResponseI & {
  onSelect: () => void;
};

const CreateHome: React.FC = () => {
  const { theme } = useTheme();
  const { getCollectionDraftNFT } = useNFTHook();

  const [selectedCollectionAddress, setSelectedCollectionAddress] =
    useState<string>('');
  const [open, setOpen] = useState(true);

  const { draftNFTs } = useAppSelector((state) => {
    const { draftNFTs } = state.createPageReducer;
    return { draftNFTs };
  }, shallowEqual);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (selectedCollectionAddress) {
        const nft = await getCollectionDraftNFT(selectedCollectionAddress);
        if (nft) {
          dispatch(setDraftNFTs(nft));
        }
      }
    })();
  }, [selectedCollectionAddress]);

  const onNFTSelect = useCallback(
    (id: number) => {
      const updatedNfts = draftNFTs.map((draftNFT: DraftNFTResponseI) => {
        if (draftNFT.id === id) {
          return { ...draftNFT, selected: !draftNFT.selected };
        } else return draftNFT;
      });
      const selectedNfts = updatedNfts.filter(
        (updatedNft: DraftNFTResponseI) => updatedNft.selected
      );
      dispatch(setSelectedDraftNFTs(selectedNfts));
      dispatch(setDraftNFTs(updatedNfts));
    },
    [draftNFTs]
  );

  const handleMintAll = () => {
    const updatedNfts = draftNFTs.map((draftNFT: DraftNFTResponseI) => {
      return { ...draftNFT, selected: true };
    });

    dispatch(setSelectedDraftNFTs(updatedNfts));
    dispatch(setDraftNFTs(updatedNfts));
    dispatch(setMintModalIsOpen(true));
  };

  const isDraftNtSelected =
    draftNFTs.filter((draftNFT: DraftNFTResponseI) => draftNFT.selected)
      .length > 0;

  return (
    <ContentLayout>
      <MintingModal className="max-w-xl" />
      <DutchC.CreateContentHeader>
        <DutchC.CreateContentLeft>
          <DutchC.CreateContentTitle>Drafted NFTs</DutchC.CreateContentTitle>
          <DutchC.CreateContentSubTitle>
            NFTs that you have uploaded in DUTCH0x but not minted yet will show
            here.
          </DutchC.CreateContentSubTitle>
          <DutchC.CreateContentCollection>
            <CollectionDropdown
              selectedCollectionAddress={selectedCollectionAddress}
              setSelectedCollectionAddress={setSelectedCollectionAddress}
            />
          </DutchC.CreateContentCollection>
        </DutchC.CreateContentLeft>

        <DutchC.CreateContentHeaderActions>
          <Button>
            <Link href="/create/create-collection">Create Collection</Link>
          </Button>
          <Button>
            <Link href="/create/draft-nft">Draft NFT</Link>
          </Button>
          <Button>
            <Link href="/create/bulk-mint">Bulk NFT</Link>
          </Button>
        </DutchC.CreateContentHeaderActions>
      </DutchC.CreateContentHeader>
      <DutchC.CreateContentBody>
        <SearchInput />
        {/* No items */}
        <DutchC.CreateContentNoItems>
          <span className="dark:text-white/50">No items to show here.</span>
        </DutchC.CreateContentNoItems>
        {/* If some draft nfts are avaiable to show */}
        <DutchC.CreateContentTools>
          {isDraftNtSelected && (
            <Button onClick={() => dispatch(setMintModalIsOpen(true))}>
              Mint Selected NFTs
            </Button>
          )}
          {draftNFTs.length > 0 && (
            <Button onClick={handleMintAll}>Mint all NFTs</Button>
          )}
        </DutchC.CreateContentTools>
        <DutchC.CreateContentDraftNFTs>
          {draftNFTs.map((nft: DraftNFTResponseI) => (
            <DraftNFT
              key={nft.id}
              onSelect={() => onNFTSelect(nft.id)}
              {...nft}
            />
          ))}
        </DutchC.CreateContentDraftNFTs>
      </DutchC.CreateContentBody>
    </ContentLayout>
  );
};

const DraftNFT: React.FC<DraftNFTProps> = ({
  id,
  name,
  media,
  amount,
  description,
  selected,
  collection,
  onSelect,
}) => {
  const dispatch = useAppDispatch();

  const { theme } = useTheme();
  const { deleteDraftNFT, getCollectionDraftNFT } = useNFTHook();

  const mediaUrl = getIpfsHttpUrl(media);

  const handleDeleteNft = async (id: number) => {
    const isDeleted = await deleteDraftNFT(id);

    if (isDeleted) {
      toast('Draft deleted successfully', { type: 'error' });
    } else {
      toast('Error occured deleting nft', { type: 'error' });
    }

    const nft = await getCollectionDraftNFT(collection);
    if (nft) {
      dispatch(setDraftNFTs(nft));
    }
  };

  return (
    <DutchC.DraftNFTCard selected={selected ? 1 : 0} onClick={onSelect}>
      {/* unit */}
      <DutchC.DraftNFTUnitBadge>{amount}</DutchC.DraftNFTUnitBadge>
      {/* selected mark */}
      {selected && (
        <DutchC.DraftNFTSelectedMark>
          <Icons.ICheckCircle
            color={theme === 'light' ? 'black' : 'white'}
            size="large"
          />
        </DutchC.DraftNFTSelectedMark>
      )}
      {/* image */}
      <Image
        src={mediaUrl}
        alt="rice"
        width={230}
        height={230}
        className="aspect-square w-60 h-60"
      />
      {/* detail */}
      <DutchC.DraftNFTDetail>
        <DutchC.DraftNFTTitle>{name}</DutchC.DraftNFTTitle>
        <DutchC.DraftNFTDescription>{description}</DutchC.DraftNFTDescription>
      </DutchC.DraftNFTDetail>
      {/* actions */}
      <DutchC.DraftNFTActions>
        <DutchC.DraftNFTEdit>Edit</DutchC.DraftNFTEdit>
        <DutchC.DraftNFTDelete onClick={() => handleDeleteNft(id)}>
          Delete
        </DutchC.DraftNFTDelete>
      </DutchC.DraftNFTActions>
    </DutchC.DraftNFTCard>
  );
};

export default CreateHome;
