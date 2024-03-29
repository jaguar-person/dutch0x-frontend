import React from 'react';
import { useRouter } from 'next/router';

// components
import { Link } from '@/common';
import * as DutchC from './styles';

import LottieAnimationPlayer from './lottie-animation-player';

// Animations Json
import NFT from '@/assets/lottie-animation/NFT.json';
import FindHolders from '@/assets/lottie-animation/Find_Holders.json';
import AirDrop from '@/assets/lottie-animation/Air_Drop.json';
import TradeIn from '@/assets/lottie-animation/Trade_In.json';
import Analytics from '@/assets/lottie-animation/Analytics.json';

const subnavs = [
  {
    name: 'NFT Management',
    path: '/nft-management',
    slug: 'nft-management',
    animationData: NFT,
    bgColor: 'rgba(46, 198, 46, 0.2)',
  },
  {
    name: 'Find Holders',
    path: '/holders',
    slug: 'holders',
    animationData: FindHolders,
    bgColor: 'rgba(245, 215, 46, 0.2)',
  },
  {
    name: 'Airdrop',
    path: '/airdrop',
    slug: 'airdrop',
    animationData: AirDrop,
    bgColor: 'rgba(46, 196, 218, 0.2)',
  },
  {
    name: 'Trade-in',
    path: '/trade-in',
    slug: 'trade-in',
    animationData: TradeIn,
    bgColor: 'rgba(167, 76, 201, 0.2)',
  },
  {
    name: 'Analytics',
    path: '/analytics',
    slug: 'analytics',
    animationData: Analytics,
    bgColor: 'rgba(255, 79, 182, 0.2)',
  },
];

const DashboardSubNav: React.FC = () => {
  const router = useRouter();

  console.error('---', router.asPath.split('/'));
  const PAGE_PATH = router.asPath.split('/')[2] ?? '';

  return (
    <DutchC.SubNavWrapper>
      {subnavs.map((nav, index) => (
        <Link key={nav.slug} href={nav.path} size="small">
          <LottieAnimationPlayer
            animationData={nav.animationData}
            bgColor={nav.bgColor}
            name={nav.name}
            index={index}
          />
        </Link>
      ))}
    </DutchC.SubNavWrapper>
  );
};

export default DashboardSubNav;
