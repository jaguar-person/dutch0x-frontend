import { Overview as OverviewType } from '@/types/frontend/ui';
import OverviewItem from '../atoms/over-view-item';
export default function Overview() {
  const accountOverview: OverviewType = {
    items: [
      {
        subItems: ['Wallet balance'],
        count: '0.489 ETH',
      },
    ],
  };

  const NFTsOverview: OverviewType = {
    title: 'NFTs',
    items: [
      {
        subItems: ['NFT fetched'],
        count: '187',
      },
      {
        subItems: ['Collections'],
        count: '5',
      },
      {
        subItems: ['Minted'],
        count: '39',
      },
    ],
  };

  const SavedSearches: OverviewType = {
    title: 'Saved Searches',
    items: [
      {
        subItems: ['Green apple'],
      },
      {
        subItems: ['Christimas free'],
      },
    ],
  };

  const RecentActivities: OverviewType = {
    title: 'Saved Searches',
    items: [
      {
        subItems: ['Settings', 'Account'],
      },
      {
        subItems: ['Sales report'],
      },
    ],
  };

  return (
    <div className="w-full">
      <label className="text-[1.2rem] font-light text-white opacity-[50%]">
        Overview
      </label>
      <div className="w-full mt-4">
        <OverviewItem overview={accountOverview} />
      </div>
      <div className="w-full mt-4">
        <OverviewItem overview={NFTsOverview} />
      </div>
      <div className="w-full mt-4">
        <OverviewItem overview={SavedSearches} />
      </div>
      <div className="w-full mt-4">
        <OverviewItem overview={RecentActivities} />
      </div>
    </div>
  );
}
