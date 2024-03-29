import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

import { setIsConnectionModalOpen } from '@/ducks';
import ConnectWallet from '../shared/ConnectWallet';

// components
import { SearchInput, IconButton, Badge, NavLink } from '@/common';
import RegisterHome from '../auth/register';
import ProfileMenu from '../shared/profile/profile-menu';
import GasInfo from '../shared/header-gas-price.tsx';

import * as Icons from '@/common/Icons';

// types
import { Menu } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import Image from 'next/image';

import * as DutchC from './styles';
import AvatarIcon from '@/assets/avatar.png';
import LoopringApi from '@/services/LoopringApi.service';
import useWalletHook from '@/hooks/useWalletHook';
import { shortenAddress } from '@/helpers';

const menus: Menu[] = [
  {
    name: 'Dashboard',
    path: '/',
    slug: '',
  },
  {
    name: 'Create',
    path: '/create',
    slug: 'create',
  },
  {
    name: 'Marketplace',
    path: '/marketplace',
    slug: 'marketplace',
  },
  {
    name: 'Roadmap',
    path: '/roadmap',
    slug: 'roadmap',
  },
];

const ProfileMockData = {
  userName: 'Trithoere',
  avatar: AvatarIcon,
  walletAddress: '0x314cc0b8314cc0b8314cc0b8314cc0b8314cc0b8314cc0b8',
  walletBalance: {
    eth: 0.657894470985654,
    dollar: 9.876987,
  },
  ethL1: 0.13123919,
  ethL2: 0.3672,
};

const GasInfoMockData = {
  price: 0.14,
  list: [
    {
      nftType: 'NFT Mint',
      eth: 0.09798,
      cash: 0.14,
    },
    {
      nftType: 'NFT Transfer',
      eth: 0.09798,
      cash: 0.14,
    },
    {
      nftType: 'NFT Withdrawal',
      eth: 0.09798,
      cash: 0.14,
    },
  ],
};

const Header: React.FC = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isRegister, setRegister] = useState(false);
  const [profileData, setProfileData] = useState(ProfileMockData);
  const [status, setStatus] = useState<'ACTIVE' | 'INACTIVE' | 'LOADING'>(
    'LOADING'
  );

  const { isConnected } = useAppSelector((state) => state.webAppReducer);

  const dispatch = useAppDispatch();

  const { disconnectAccount, getUserWalletInfo } = useWalletHook();

  const PAGE_PATH = router.asPath.split('/')[1] ?? '';

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  const [averageFee, setAverageFee] = useState();

  const openConnectionModal = () => {
    dispatch(setIsConnectionModalOpen(true));
  };

  const fetchStatus = async () => {
    const res = await new LoopringApi().getStatusCheck();
    if (res.data?.message === 'success') return setStatus('ACTIVE');
    return setStatus('INACTIVE');
  };

  const fetchWalletInfo = async () => {
    const userWalletInfo = await getUserWalletInfo();

    let newProfileInfo = { ...profileData };
    setProfileData({
      ...newProfileInfo,
      ethL1: userWalletInfo?.layer1EthBalance,
      ethL2: userWalletInfo?.layer2EthBalance,
      walletAddress: shortenAddress(userWalletInfo?.userAddress || ''),
      walletBalance: {
        eth:
          parseFloat(userWalletInfo?.layer1EthBalance as string) +
          parseFloat(userWalletInfo?.layer2EthBalance as string),
        dollar: 0,
      },
    });
  };

  useEffect(() => {
    fetchStatus();
    fetchWalletInfo();
  }, [dispatch]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DutchC.HeaderWrapper>
      <RegisterHome
        onClose={() => {
          setRegister(false);
        }}
        isRegister={isRegister}
      />

      <DutchC.HeaderInner>
        <DutchC.Logo
          src={`/images/${theme === 'light' ? 'logo.svg' : 'logo-dark.svg'}`}
          width={145}
          height={36}
          alt="logo"
        />

        <DutchC.Nav>
          {!isConnected && <DutchC.NavCover />}
          {menus.map((menu) => (
            <NavLink
              key={menu.slug}
              href={menu.path}
              isActive={PAGE_PATH === menu.slug ? true : false}
            >
              {menu.name}
              {menu.slug === 'marketplace' && (
                <DutchC.ComingSoon>Coming Soon</DutchC.ComingSoon>
              )}
            </NavLink>
          ))}
        </DutchC.Nav>

        <DutchC.SearchWrapper>
          <SearchInput placeholder="Enter NFTs to find holders" isShortCut />
        </DutchC.SearchWrapper>

        <DutchC.RightActions>
          <Badge status={status} />

          {(isConnected && (
            <GasInfo setAverageFee={setAverageFee} {...GasInfoMockData} />
          )) || (
            <DutchC.HeaderGasWrapper>
              <Icons.ICustomGas
                currentColor={theme === 'light' ? 'black' : 'white'}
              />
              <div className={theme === 'light' ? 'text-black' : 'text-white'}>
                $ {averageFee} USD
              </div>
            </DutchC.HeaderGasWrapper>
          )}

          <IconButton icon="bell" />

          <ProfileMenu {...profileData} />
        </DutchC.RightActions>
      </DutchC.HeaderInner>
      <ConnectWallet />
    </DutchC.HeaderWrapper>
  );
};

export default Header;
