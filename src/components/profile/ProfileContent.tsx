import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { shallowEqual } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AvatarIcon from '@/assets/avatar.png';
import ProfileCardTemplate from '../shared/profile/ProfileCardTemplate';
import ProfileActions from '../shared/profile/ProfileActions';
import { Button, OutlineButton, TextInput } from '@/common';
import { InputLabel } from '@/common/Input/styles';
import CheckIcon from '@/assets/check.png';
import ProfileSocialIcon from '../shared/profile/ProfileSocialIcon';
import Select from '@/common/Input/Select';

import DiscordIcon from '@/assets/social_discord.png';
import RedditIcon from '@/assets/social_reddit.png';
import InstagramIcon from '@/assets/social_instagram.png';
import TwitterIcon from '@/assets/social_twitter.png';
import TiktokIcon from '@/assets/social_tiktok.png';
import ProfileEmailNotification from '../shared/profile/ProfileEmailNotification';
import WalletLine from '../shared/profile/WalletLine';

import * as Icons from '@/common/Icons';
import * as DutchC from './styles';

import { Logout } from './alert-modals';
import { PhotoEdit } from './photo-edit-modal';
import { Profile } from '@/types/profile';
import CreatorApi from '@/services/CreatorApi.service';
import { getCookie } from 'cookies-next';
import useWalletHook from '@/hooks/useWalletHook';
import { AppDispatch, useAppDispatch, useAppSelector } from '@/redux/store';
import { WalletInfo } from '@/types/wallet';
import { shortenAddress } from '@/helpers';
import useCreatorHook from '@/hooks/useCreatorHook';
import { WebAppReducerI } from '@/ducks';

const timeOptions = [
  {
    key: 'Africa',
    value: '(GMT +01.00) Africa/Algiers',
  },
  {
    key: 'America - New York',
    value: '(GMT -04:00) America/New_York',
  },
  {
    key: 'America - Los Angeles',
    value: '(GMT -07:00) America/Los_Angeles',
  },
  {
    key: 'Asia - Dubai',
    value: '(GMT +04:00) Asia/Dubai',
  },
  {
    key: 'Asia - Hong Kong',
    value: '(GMT +08:00) Asia/Hong_Kong',
  },
  {
    key: 'Australia - Sydney',
    value: '(GMT +10:00) Australia/Sydney',
  },
  {
    key: 'Europe - London',
    value: '(GMT +01:00) Europe/London',
  },
  {
    key: 'Europe - Berlin',
    value: '(GMT +02:00) Europe/Berlin',
  },
  {
    key: 'Pacific - Honolulu',
    value: '(GMT -10:00) Pacific/Honolulu',
  },
  {
    key: 'Pacific - Auckland',
    value: '(GMT +12:00) Pacific/Auckland',
  },
];

const ProfileContent: React.FC = () => {
  const initialProfileState: Profile = {
    username: 'johndoe.eth',
    email: 'johndoe@gmail.com',
    timezone: '(GMT +01.00) Africa/Algiers',
    twitterHandle: 'john',
    discordHandle: 'johndoe',
    instagramHandle: 'doe22',
    tiktokHandle: 'johndoe2',
    redditHandle: 'john-doe',
  };
  const [isLogout, setLogout] = useState(false);
  const [isPhotoEdit, setPhotoEdit] = useState(false);
  const [profileData, setProfileData] = useState<Profile>();
  const { getUserWalletInfo } = useWalletHook();
  const [walletInfo, setWalletInfo] = useState<WalletInfo>();
  const { updateCreate, createProfile, getProfile } = useCreatorHook();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useAppDispatch();

  const handleOnAction = (saveData: boolean) => {
    if (!saveData) return;
    handleSaveData();
  };

  const handleSaveData = async () => {
    setIsLoading(true);
    const response = await updateCreate(profileData as Profile);
    if (response?.status === 404) {
      const createResponse = await createProfile(profileData as Profile);
      if (createResponse?.status !== 201)
        return toast.error('Oops, something went wrong. Please try again.');
      setIsLoading(false);
      return toast.success('Profile created successfully!');
    } else {
      setIsLoading(false);
      if (response?.status !== 200)
        return toast.error('Oops, something went wrong. Please try again.');
      return toast.success('Profile updated successfully!');
    }
  };

  const fetchWalletInfo = async () => {
    getUserWalletInfo()
      .then((data) => {
        setWalletInfo(data as WalletInfo);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const fetchProfileInfo = async () => {
    const response = await getProfile();
    if (response?.status != 200) return;
    setProfileData(response?.data?.data);
  };

  useEffect(() => {
    fetchWalletInfo();
    fetchProfileInfo();
  }, [dispatch]);

  return (
    <DutchC.ProfileWrapper>
      <ToastContainer />
      <DutchC.ProfileInner>
        <ProfileCardTemplate title="Profile Setting">
          <DutchC.ProfileSettingWrapper>
            <DutchC.ProfileAvatarWrapper>
              <Image src={AvatarIcon} alt="avatar" />
              <DutchC.ProfileAvatarEditIcon
                onClick={() => {
                  setPhotoEdit(true);
                }}
              >
                <Icons.IPencil />
              </DutchC.ProfileAvatarEditIcon>
            </DutchC.ProfileAvatarWrapper>
            <DutchC.ProfileSettingInner>
              <DutchC.ProfileSettingInnerLine>
                <InputLabel>Display Name</InputLabel>
                <TextInput
                  defaultValue={profileData?.username}
                  onChange={(event) =>
                    setProfileData({
                      ...profileData,
                      username: event.target.value,
                    })
                  }
                ></TextInput>
                <Image
                  src={CheckIcon}
                  alt="check"
                  className="absolute right-3 top-1/2"
                />
              </DutchC.ProfileSettingInnerLine>
              <DutchC.ProfileSettingInnerLine>
                <InputLabel>Email ID</InputLabel>
                <TextInput
                  defaultValue={profileData?.email}
                  onChange={(event) =>
                    setProfileData({
                      ...profileData,
                      email: event.target.value,
                    })
                  }
                ></TextInput>
              </DutchC.ProfileSettingInnerLine>
              <DutchC.ProfileSettingInnerLine>
                <InputLabel>Timezone</InputLabel>
                <Select
                  options={timeOptions}
                  onChange={(event) =>
                    setProfileData({
                      ...profileData,
                      timezone: event.target.value,
                    })
                  }
                />
              </DutchC.ProfileSettingInnerLine>
            </DutchC.ProfileSettingInner>
          </DutchC.ProfileSettingWrapper>
        </ProfileCardTemplate>
        <ProfileCardTemplate title="Connect Your Socials">
          <DutchC.ProfileSettingInner>
            <ProfileSocialIcon
              title="Twitter"
              icon={TwitterIcon}
              link="https://www.twitter.com/"
              defaultValue={profileData?.twitterHandle}
              onChange={(twitterHandle) =>
                setProfileData({ ...profileData, twitterHandle })
              }
            />
            <ProfileSocialIcon
              title="Discord"
              icon={DiscordIcon}
              link="https://www.discord.com/"
              defaultValue={profileData?.discordHandle}
              onChange={(discordHandle) =>
                setProfileData({ ...profileData, discordHandle })
              }
            />
            <ProfileSocialIcon
              title="Instagram"
              icon={InstagramIcon}
              link="https://www.instagram.com/"
              defaultValue={profileData?.instagramHandle}
              onChange={(instagramHandle) =>
                setProfileData({ ...profileData, instagramHandle })
              }
            />
            <ProfileSocialIcon
              title="Tiktok"
              icon={TiktokIcon}
              link="https://www.tiktok.com/"
              defaultValue={profileData?.tiktokHandle}
              onChange={(tiktokHandle) =>
                setProfileData({ ...profileData, tiktokHandle })
              }
            />
            <ProfileSocialIcon
              title="Reddit"
              icon={RedditIcon}
              link="https://www.reddit.com/user"
              defaultValue={profileData?.redditHandle}
              onChange={(redditHandle) =>
                setProfileData({ ...profileData, redditHandle })
              }
            />
          </DutchC.ProfileSettingInner>
        </ProfileCardTemplate>
        <ProfileCardTemplate title="Email Notification Settings">
          <DutchC.ProfileNotificationWrapper>
            <ProfileEmailNotification />
            <ProfileEmailNotification />
            <ProfileEmailNotification />
            <ProfileEmailNotification />
          </DutchC.ProfileNotificationWrapper>
        </ProfileCardTemplate>
        <ProfileActions onAction={handleOnAction} isLoading={isLoading} />
      </DutchC.ProfileInner>
      <ProfileCardTemplate title="Wallet">
        <DutchC.WalletWrapper>
          <DutchC.WalletInfo>
            <WalletLine>
              <InputLabel className="font-bold text-black/90">
                trivedi.eth
              </InputLabel>
              <InputLabel className="font-bold text-black/90">
                {parseFloat(walletInfo?.layer1EthBalance as string) +
                  parseFloat(walletInfo?.layer2EthBalance as string)}{' '}
                ETH
              </InputLabel>
            </WalletLine>
            <WalletLine>
              <div className="flex gap-1 items-center">
                <InputLabel className="font-medium text-black/50 text-sm dark:text-white/50">
                  {walletInfo?.userAddress &&
                    shortenAddress(walletInfo?.userAddress as string)}
                </InputLabel>
                <Icons.IDocument />
              </div>
              <InputLabel className="font-medium text-black/50 text-sm dark:text-white/50">
                $ 2.33 USD
              </InputLabel>
            </WalletLine>
          </DutchC.WalletInfo>
          <DutchC.WalletFund>
            <WalletLine>
              <InputLabel className="font-medium text-black/50 text-sm">
                Ethereum L1
              </InputLabel>
              <InputLabel className="font-bold text-black/90 text-sm">
                {walletInfo?.layer1EthBalance || '0'} ETH
              </InputLabel>
            </WalletLine>
            <WalletLine>
              <InputLabel className="font-medium text-black/50 text-sm">
                Loopring L2
              </InputLabel>
              <InputLabel className="font-bold text-black/90 text-sm">
                {walletInfo?.layer2EthBalance || '0'} ETH
              </InputLabel>
            </WalletLine>
          </DutchC.WalletFund>
          <DutchC.WalletActions>
            <Button className="mb-7">Add Funds</Button>
            <OutlineButton
              className="mt-7"
              onClick={() => {
                setLogout(true);
              }}
            >
              Logout
            </OutlineButton>
          </DutchC.WalletActions>
        </DutchC.WalletWrapper>
      </ProfileCardTemplate>

      {/* Modals */}

      <Logout
        isLogout={isLogout}
        onLogout={() => {
          setLogout(false);
        }}
      />

      <PhotoEdit
        isPhotoEdit={isPhotoEdit}
        onPhotoEdit={() => {
          setPhotoEdit(false);
        }}
      />
    </DutchC.ProfileWrapper>
  );
};

export default ProfileContent;
