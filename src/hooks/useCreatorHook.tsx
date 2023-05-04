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
    const creatorId = getCookie('ACCOUNTID');
    const { response, data } = await creatorApi.updateCreator(
      creatorId as string,
      creatorData
    );
    if (response.status != 200) return response?.error || 'Error occurred';
    return data?.data;
  };

  return { updateCreate };
};

export default useCreatorHook;
