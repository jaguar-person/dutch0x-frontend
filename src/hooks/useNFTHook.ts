import {
  setDraftNFTs,
  setMintModalActiveStep,
  setMintModalIsOpen,
} from '@/components/create/ducks';
import { LoopringService } from '@/lib/LoopringService';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import DraftNFTService from '@/services/DraftNFTService.service';
import { DraftNFTI } from '@/types';
import { useRouter } from 'next/router';
import { shallowEqual } from 'react-redux';

const useNFTHook = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const draftNFTService = new DraftNFTService();

  const { accountInfo } = useAppSelector((state) => {
    const { accountInfo } = state.webAppReducer;
    return { accountInfo };
  }, shallowEqual);

  const createDraftNFT = async (draftNFT: Omit<DraftNFTI, 'owner'>) => {
    try {
      if (!accountInfo) return alert('Account not connected');
      const { response, data } = await draftNFTService.createDraftNFT({
        ...draftNFT,
        owner: accountInfo?.accInfo.owner,
      });
      if (data.data) {
        alert('Draft saved successfully');
        router.push('/create');
      } else {
        alert('Error occured saving nft');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDraftNFT = async (id: number) => {
    try {
      if (!accountInfo) return alert('Account not connected');
      const { response, data } = await draftNFTService.deleteDraftNFT({
        id,
        ownerAddress: accountInfo?.accInfo.owner,
      });
      if (data.data) return data.data;
      else return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getCollectionDraftNFT = async (collectionAddress: string) => {
    try {
      if (!accountInfo) return alert('Account not connected');
      const { response, data } = await draftNFTService.getCollectionDraftNFT(
        collectionAddress,
        accountInfo?.accInfo.owner
      );
      if (data.data) {
        return data.data.nft;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const onMintModalClose = async (collectionAddress: string) => {
    const nft = await getCollectionDraftNFT(collectionAddress);
    if (nft) {
      dispatch(setDraftNFTs(nft));
    }

    dispatch(setMintModalActiveStep(0));
    dispatch(setMintModalIsOpen(false));
  };

  return {
    createDraftNFT,
    getCollectionDraftNFT,
    deleteDraftNFT,
    onMintModalClose,
  };
};

export default useNFTHook;
