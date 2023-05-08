import { WebAppReducerI } from '@/ducks';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import CreatorApi from '@/services/CreatorApi.service';
import { Profile } from '@/types/profile';
import { getCookie } from 'cookies-next';
import { shallowEqual } from 'react-redux';

const useCreatorHook = () => {
  const creatorApi = new CreatorApi();
  const dispatch = useAppDispatch();

  const { account, apiKey } = useAppSelector((state) => {
    const { account, apiKey } = state.webAppReducer as WebAppReducerI;
    return { account, apiKey };
  }, shallowEqual);

  const updateCreate = async (creatorData: Profile) => {
    return await creatorApi.updateCreator(account as string, creatorData);
  };

  const createProfile = async (creatorData: Profile) => {
    return await creatorApi.createProfile({
      ...creatorData,
      userAddress: account as string,
    } as Profile);
  };

  const getProfile = async () => {
    return await creatorApi.getProfile(account as string);
  };

  return { updateCreate, createProfile, getProfile };
};

export default useCreatorHook;
