import React, { useState } from 'react';
import Link from 'next/link';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';

import * as DutchC from './styles';
import { useAppSelector } from '@/redux/store';
import { OptionSwitch } from '../option-switch';
import { Accordion } from '@/common/Accordion';
import { AnalyticsCard, CurrenciesInvolvedCard } from '../analytics-card';
import {
  AnalyticsTableControl,
  AnalyticsTableLayout,
} from '../analytics-tables';
import {
  Table,
  THead,
  TBody,
  TR,
  TD,
  CustomSelect,
  SearchInput,
  Pagination,
} from '@/common';
import { LRCIconSelector } from '../analytics-tables/lrc-icon-selector';
import * as Icons from '@/common/Icons';

const dayOptions = [
  {
    id: 0,
    slug: '7D',
  },
  {
    id: 1,
    slug: '1M',
  },
  {
    id: 2,
    slug: '6M',
  },
  {
    id: 3,
    slug: '1Y',
  },
  {
    id: 4,
    slug: 'All',
  },
];

interface DataType {
  dir: string;
  type: string;
  fromGroup: string;
  from: string;
  toGroup: string;
  to: string;
  sold?: { value: number; id: string };
  bought?: { value: number; id: string };
  value?: number;
  gas?: { value: number; id: string };
  time: string;
  link: string;
}

const mockDataTable: DataType[] = [
  {
    dir: 'in',
    type: 'deposit',
    fromGroup: 'L1',
    from: 'Flufffy.loopring.eth',
    toGroup: 'L2',
    to: 'ex.eth',
    sold: { value: 234.34, id: 'eth' },
    value: 234.34,
    gas: { value: 234.34, id: 'usdt' },
    time: 'Mar 10, 20223 06:57:59',
    link: '/111',
  },
  {
    dir: 'out',
    type: 'trade',
    fromGroup: 'L1',
    from: 'Flufffy.loopring.eth',
    toGroup: 'L2',
    to: 'ex.eth',
    bought: { value: 261.34, id: 'usdc' },
    sold: { value: 234.34, id: 'eth' },
    gas: { value: 234.34, id: 'eth' },
    time: 'Mar 10, 20223 06:57:59',
    link: '/111',
  },
  {
    dir: 'out',
    type: 'trade',
    fromGroup: 'L1',
    from: 'Flufffy.loopring.eth',
    toGroup: 'L2',
    to: 'ex.eth',
    bought: { value: 234.34, id: 'eth' },
    value: 234.34,
    gas: { value: 234.34, id: 'usdt' },
    time: 'Mar 10, 20223 06:57:59',
    link: '/111',
  },
  {
    dir: 'in',
    type: 'trade',
    fromGroup: 'L1',
    from: 'Flufffy.loopring.eth',
    toGroup: 'L2',
    to: 'ex.eth',
    bought: { value: 234.34, id: 'eth' },
    sold: { value: 234.34, id: 'usdc' },
    value: 234.34,
    time: 'Mar 10, 20223 06:57:59',
    link: '/111',
  },
];

const selectOptions = [
  {
    name: 'All Transactions',
    value: 'All Transactions',
  },
  {
    name: 'Deposit',
    value: 'Deposit',
  },
  {
    name: 'Trade',
    value: 'Trade',
  },
  {
    name: 'Withdrawal',
    value: 'Withdrawal',
  },
  {
    name: 'Royality',
    value: 'Royality',
  },
  {
    name: 'Swap',
    value: 'Swap',
  },
  {
    name: 'Transfer',
    value: 'Transfer',
  },
  {
    name: 'NFT Mint',
    value: 'NFT Mint',
  },
  {
    name: 'NFT Transfer',
    value: 'NFT Transfer',
  },
  {
    name: 'NFT Trade',
    value: 'NFT Trade',
  },
  {
    name: 'NFT Primary Sale',
    value: 'NFT Primary Sale',
  },
  {
    name: 'Other',
    value: 'Other',
  },
];

const InOrOut: React.FC<{ value: string }> = ({ value }) => {
  return (
    (value === 'in' && (
      <div className="uppercase w-fit rounded-sm bg-green-100 text-green-500 text-center text-xs px-2 flex items-center justify-center">
        <Icons.IArrowDown size="small" className="text-green-500" />
        in
      </div>
    )) || (
      <div className="uppercase w-fit rounded-sm bg-red-100 text-red-500 text-center text-xs px-2 flex items-center justify-center">
        <Icons.IArrowUp size="small" className="text-red-500" />
        out
      </div>
    )
  );
};

export const WalletTrackingTransactionView = () => {
  const [dateRange, setDateRange] = useState('Apr 1, 2022 - Mar 31 2023');
  const [totalPage, setTotalPage] = useState(3);
  const [selectTrackingValue, setSelectTrackingValue] =
    useState('NFT Tracking');
  const [resultNumber, setResultNumber] = useState(0);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [timezone, setTimezone] = useState('EST');
  const [currentDayOption, setCurrentDayOption] = useState({
    id: 4,
    slug: 'All',
  });
  const [analyticsTableData, setAnalyticsTableData] = useState([]);

  const { isConnected } = useAppSelector((state) => state.webAppReducer);

  const [customDateRange, setCustomDateRange] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (newValue: DateValueType) => {
    console.log('newValue:', newValue);
    setCustomDateRange(newValue);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="overview flex flex-col gap-4">
        <div className="switch flex flex-col gap-2">
          <p className="font-bold">Transactions</p>
          <div className="flex gap-4 items-center">
            <DutchC.DaySwitchWrapper>
              <div className="pr-1 flex gap-1">
                {dayOptions.map((option, i) => (
                  <OptionSwitch
                    key={i}
                    currentOption={currentDayOption}
                    option={option}
                    onCurrentOption={(option) => {
                      setCurrentDayOption(option);
                    }}
                  />
                ))}
              </div>
              <Accordion label="Custom">
                <Datepicker
                  inputClassName="button bg-white w-3/4"
                  value={customDateRange}
                  onChange={handleValueChange}
                  showShortcuts={true}
                  showFooter={true}
                />
              </Accordion>
            </DutchC.DaySwitchWrapper>
            <p className="text-xs text-black/70">
              The tracking shown is according to the timeline selected.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-2 py-2">
          <div className="flex items-center gap-x-2">
            <CustomSelect
              label="Type"
              options={selectOptions}
              value={selectTrackingValue}
              onChange={(value) => setSelectTrackingValue(value)}
            />
          </div>
          <div className="flex items-center gap-x-4">
            <div className="text-sm text-black/70 font-normal dark:text-white/70 whitespace-nowrap inline-flex items-center justify-center">
              {resultNumber} results
            </div>
            <SearchInput
              placeholder={'Wallet id or ENS'}
              value={searchInputValue}
              onChange={(e) => {
                setSearchInputValue(e.currentTarget.value);
              }}
            />
            <Pagination
              onChange={(value) => console.log(value)}
              totalPage={totalPage}
            />
          </div>
        </div>
        <div className="cards flex flex-col gap-2">
          <DutchC.ContentOverviewCards>
            <AnalyticsCard title={'Incoming'} eth={undefined} usd={undefined} />
            <AnalyticsCard title={'Outgoing'} eth={0.1209} usd={189.91} />
            <AnalyticsCard
              title={'Difference (In-Out)'}
              eth={0.2209}
              usd={265.91}
            />
          </DutchC.ContentOverviewCards>
          {isConnected && (
            <DutchC.ContentOverviewCards>
              <CurrenciesInvolvedCard
                data={[
                  {
                    token: 'ETH',
                    tokenId: 'eth',
                    value: 0.423425,
                    price: 34.234534,
                  },
                  {
                    token: 'LRC',
                    tokenId: 'lrc',
                    value: 0.423425,
                    price: 34.234534,
                  },
                  {
                    token: 'USDT',
                    tokenId: 'usdt',
                    value: 0.423425,
                    price: 34.234534,
                  },
                ]}
              />
              <CurrenciesInvolvedCard
                data={[
                  {
                    token: 'ETH',
                    tokenId: 'eth',
                    value: 0.423425,
                    price: 34.234534,
                  },
                  {
                    token: 'LRC',
                    tokenId: 'lrc',
                    value: 0.423425,
                    price: 34.234534,
                  },
                  {
                    token: 'USDT',
                    tokenId: 'usdt',
                    value: 0.423425,
                    price: 34.234534,
                  },
                ]}
              />
              <CurrenciesInvolvedCard
                data={[
                  {
                    token: 'ETH',
                    tokenId: 'eth',
                    value: 0.423425,
                    price: 34.234534,
                  },
                  {
                    token: 'LRC',
                    tokenId: 'lrc',
                    value: 0.423425,
                    price: 34.234534,
                  },
                  {
                    token: 'USDT',
                    tokenId: 'usdt',
                    value: 0.423425,
                    price: 34.234534,
                  },
                ]}
              />
            </DutchC.ContentOverviewCards>
          )}
          <AnalyticsTableLayout>
            <AnalyticsTableControl
              isSwitch
              isResultShowable
              resultNumber={234}
              isSearchable
              searchInputPlaceholder="Token"
              isPaginatiable
            />
            {!mockDataTable.length && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 dark:text-white">
                No data available
              </div>
            )}
            <Table className="dark:text-white text-black border rounded-xl table-fixed min-h-[90px]">
              <THead className="!text-black/100 dark:!text-white/100 bg-black/10 dark:bg-white/10">
                <TR>
                  <TD></TD>
                  <TD>Type</TD>
                  <TD>From</TD>
                  <TD>To</TD>
                  <TD>Bought (In)</TD>
                  <TD>Sold (Out)</TD>
                  <TD className="text-right">Value</TD>
                  <TD className="text-right">Gas</TD>
                  <TD>Time({timezone})</TD>
                </TR>
              </THead>
              <TBody className="text-sm">
                {mockDataTable?.map((item: DataType, index) => (
                  <TR key={index}>
                    <TD>
                      <InOrOut value={item.dir} />
                    </TD>
                    <TD className="first-letter:uppercase">{item.type}</TD>
                    <TD>
                      <div className="flex w-fit items-center px-1 gap-x-1">
                        <div className="bg-black/10 px-1">{item.fromGroup}</div>
                        {item.from}
                      </div>
                    </TD>
                    <TD>
                      <div className="flex w-fit items-center px-1 gap-x-1">
                        <div className="bg-black/10 px-1">{item.toGroup}</div>
                        {item.to}
                      </div>
                    </TD>
                    <TD>
                      <div className="flex items-center gap-x-1 justify-end">
                        {(item?.bought && (
                          <>
                            {item.bought?.value}
                            <LRCIconSelector id={item.bought.id} />
                          </>
                        )) ||
                          '-'}
                      </div>
                    </TD>
                    <TD>
                      <div className="flex items-center gap-x-1 justify-end">
                        {(item?.sold && (
                          <>
                            {item.sold?.value}
                            <LRCIconSelector id={item.sold.id} />
                          </>
                        )) ||
                          '-'}
                      </div>
                    </TD>
                    <TD className="text-right">
                      {(item?.value && '$ ' + item.value) || '-'}
                    </TD>
                    <TD>
                      <div className="flex items-center gap-x-1 justify-end">
                        {(item?.gas && (
                          <>
                            {item.gas?.value}
                            <LRCIconSelector id={item.gas.id} />
                          </>
                        )) ||
                          '-'}
                      </div>
                    </TD>
                    <TD className="flex items-center gap-x-1">
                      {item.time}
                      <Link href={item.link} className="hover:bg-black/">
                        <Icons.IArrowUpRight className="text-black dark:text-white w-5 h-5 border bg-black/5 dark:bg-white/5 rounded-md" />
                      </Link>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </AnalyticsTableLayout>
        </div>
        <div className="charts flex flex-col gap-2 "></div>
      </div>
    </div>
  );
};
