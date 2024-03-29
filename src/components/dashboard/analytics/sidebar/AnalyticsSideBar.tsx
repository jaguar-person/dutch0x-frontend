import React, { useEffect, useState } from 'react';
import { Button, Select, SearchInput, Accordion } from '@/common';

import { Unit } from './unit';
import { OptionSwitch } from '../option-switch';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import {
  DashboardPageReducerI,
  TrackListI,
  TrackListTypeEnum,
  setTrackList,
} from '../../ducks';
import { LoopringService } from '@/lib/LoopringService';

import * as DutchC from './styles';
import useCollectionHook from '@/hooks/useCollectionHook';
import { WebAppReducerI } from '@/ducks';

const options = [
  {
    id: 0,
    slug: 'Collections',
  },
  {
    id: 1,
    slug: 'NFTs',
  },
];

interface AnalyticsSideBarProps {
  onCurrentTracking: (currentValue: string) => void;
}

const AnalyticsSideBar: React.FC<AnalyticsSideBarProps> = ({
  onCurrentTracking,
}) => {
  const { getUserCollectionNFTs } = useCollectionHook();

  const [trackBy, setTrackBy] = useState({
    id: 0,
    slug: 'Collections',
  });

  const dispatch = useAppDispatch();

  const { account, isConnected, userCollection } = useAppSelector((state) => {
    const { account, isConnected, userCollection } =
      state.webAppReducer as WebAppReducerI;
    return { account, isConnected, userCollection };
  }, shallowEqual);

  const { trackList } = useAppSelector((state) => {
    const { trackList } = state.dashboardPageReducer as DashboardPageReducerI;
    return { trackList };
  }, shallowEqual);

  useEffect(() => {
    (async () => {
      try {
        let list: TrackListI[] = [];
        if (trackBy.id === 0) {
          list = userCollection.map((item, i) => {
            const isSelected = i === 0;
            return {
              id: item.collectionAddress,
              type: TrackListTypeEnum.COLLECTION,
              avatar: item.avatar,
              title: item.name,
              content: item.description,
              isSelected: isSelected,
            };
          });
        } else {
          const collectionAddresses = userCollection
            .map((item) => item.collectionAddress)
            .join(',');

          const nftsInfo = await getUserCollectionNFTs(
            String(account),
            collectionAddresses
          );

          console.log({ nftsInfo });

          if (nftsInfo) {
            list = nftsInfo.map((item, i) => ({
              id: item.nftID,
              type: TrackListTypeEnum.NFT,
              avatar: item.metadata.image,
              title: item.metadata.name,
              content: '',
              isSelected: i === 0,
            }));
          }
        }
        dispatch(setTrackList(list));
      } catch (error) {}
    })();
  }, [trackBy]);

  const handleTrackingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCurrentTracking(e.target.value);
  };

  const handleSelected = (id: number) => {
    dispatch(
      setTrackList(
        trackList.map((item, i) => {
          if (i === id)
            return {
              ...item,
              isSelected: !item.isSelected,
            };
          else return item;
        })
      )
    );
  };

  const handleOnTrackChange = (option: any) => {
    dispatch(setTrackList([]));
    setTrackBy(option);
  };

  console.log({ trackList });

  return (
    <DutchC.SideBarWrapper>
      <DutchC.SideBarBg />
      <DutchC.SideBarMain>
        <DutchC.SideBarHeader>
          <DutchC.SideBarHeaderText>Analytics</DutchC.SideBarHeaderText>
          <Select
            className={`border-none w-full flex-grow ${
              isConnected ? 'visible' : 'invisible'
            }`}
            options={[
              { key: '0', value: 'NFT Tracking' },
              { key: '1', value: 'Wallet Tracking' },
            ]}
            onChange={handleTrackingChange}
          />
        </DutchC.SideBarHeader>
        <DutchC.SideBarBody>
          <DutchC.CurrencySelect>
            <Accordion
              label=""
              className={isConnected ? 'visible' : 'invisible'}
            >
              <DutchC.AccordionContent>
                <p>Crypto:</p>
                <p className="font-medium">ETH</p>
              </DutchC.AccordionContent>
            </Accordion>
          </DutchC.CurrencySelect>
          <DutchC.CurrencySelect>
            <Accordion
              label=""
              className={isConnected ? 'visible' : 'invisible'}
            >
              <DutchC.AccordionContent>
                <p>Fiat:</p>
                <p className="font-medium">USD</p>
              </DutchC.AccordionContent>
            </Accordion>
          </DutchC.CurrencySelect>
          <DutchC.TrackWrapper>
            <p className="text-sm text-black/70 dark:text-white/70">
              Track by:
            </p>
            <div className="border border-black/10 dark:border-white/10 rounded-lg bg-black/5 dark:bg-white/5">
              <DutchC.TrackSwitchWrapper
                className={isConnected ? 'visible' : 'invisible'}
              >
                {options.map((option, i) => (
                  <OptionSwitch
                    key={i}
                    currentOption={trackBy}
                    option={option}
                    onCurrentOption={(option) => {
                      setTrackBy(option);
                    }}
                  />
                ))}
              </DutchC.TrackSwitchWrapper>
            </div>
            <SearchInput
              placeholder="Collection name or id"
              className={isConnected ? 'visible' : 'invisible'}
            />
            <DutchC.TrackListWrapper>
              {trackList.map((item, i) => (
                <Unit
                  key={i}
                  id={i}
                  avatar={item.avatar}
                  title={item.title}
                  content={item.content}
                  isSelected={item.isSelected}
                  onSelected={handleSelected}
                />
              ))}
            </DutchC.TrackListWrapper>
          </DutchC.TrackWrapper>
          <DutchC.DownloadFullReport>
            <div className={`p-1 ${isConnected ? 'visible' : 'invisible'}`}>
              <Button className="w-full">Download full report</Button>
            </div>
            <p className="text-black/50 text-xs dark:text-white/50">
              Data is from Loopring L2 Explorer, and CoinMarketCap values are
              used for calculations. DUTCH0x is not liable for any data errors.
            </p>
          </DutchC.DownloadFullReport>
        </DutchC.SideBarBody>
      </DutchC.SideBarMain>
    </DutchC.SideBarWrapper>
  );
};

export default AnalyticsSideBar;
