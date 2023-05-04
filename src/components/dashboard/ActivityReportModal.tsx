import React, { useState } from 'react';
import Image from 'next/image';
import {
  Modal,
  ModalHead,
  ModalBody,
  Button,
  SearchInput,
  Select,
} from '@/common';
import { Table, THead, TBody, TR, TD } from '@/common';
import SortSelect from '@/common/Input/SortSelect';

import { IDocument } from '@/common';

export interface NFTMintI {
  nftName: string;
  nftImage: string;
  nftId: string;
  units: number;
  status: string;
  gasCount: number;
}

const mockMintNFTs: NFTMintI[] = [
  {
    nftName: 'Beep 057',
    nftImage: '/images/avatar.png',
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    units: 1,
    status: 'Success',
    gasCount: 0.53,
  },
];

const sortOptions = [
  {
    name: 'All',
    value: 'all',
  },
];

interface ReportModalProps {
  nftInfo?: {
    total: number;
    success: number;
    failed: number;
  };
  gas?: {
    total: number;
    startedAt: string;
    completedIn: string;
  };
  nfts?: NFTMintI[];
}

const ActivityReportModal: React.FC<ReportModalProps> = ({
  nftInfo,
  gas,
  nfts,
}) => {
  const [isOpenReportModal, setIsOpenReportModal] = useState(true);
  return (
    <Modal isOpen={isOpenReportModal}>
      <ModalHead
        title="Activity Report"
        onClose={(e) => {
          e.stopPropagation();
          setIsOpenReportModal(false);
        }}
      />
      <ModalBody>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-3xl">Mint NFTs</p>
            <div className="flex gap-4">
              <div className="flex gap-2 text-sm">
                <p className="text-black/50 font-medium">Total NFTs</p>
                <p className="font-bold">7</p>
              </div>
              <div className="flex gap-2 text-sm">
                <p className="text-black/50 font-medium">Success</p>
                <p className="font-bold">6</p>
              </div>
              <div className="flex gap-2 text-sm">
                <p className="text-black/50 font-medium">Failed</p>
                <p className="font-bold">1</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex gap-2 text-sm">
                <p className="text-black/50 font-medium">Total Gas</p>
                <p className="font-bold">0.00033 ETH</p>
              </div>
              <div className="flex gap-2 text-sm">
                <p className="text-black/50 font-medium">Started at</p>
                <p className="font-bold">2022-09-13 08:57:15 PST</p>
              </div>
              <div className="flex gap-2 text-sm">
                <p className="text-black/50 font-medium">Completed in</p>
                <p className="font-bold">00:02:33</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 w-1/2">
              <SearchInput className="flex-1" />
              <SortSelect title="Status" options={sortOptions} />
            </div>
            <Table className="dark:text-white text-black border rounded-xl table-fixed min-h-[100px]">
              <THead className="!text-black/100 dark:!text-white/100 bg-black/10 dark:bg-white/10">
                <TR>
                  <TD>#</TD>
                  <TD>NFT</TD>
                  <TD>NFT id</TD>
                  <TD>Units</TD>
                  <TD>Status</TD>
                  <TD className="text-center">Gas</TD>
                </TR>
              </THead>
              <TBody className="text-sm">
                {mockMintNFTs?.map((item: NFTMintI, index: number) => (
                  <TR key={index}>
                    <TD>{index + 1}</TD>
                    <TD>
                      <div className="flex gap-2 items-center">
                        <Image
                          src={item.nftImage}
                          alt="nft"
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <p className="text-medium">{item.nftName}</p>
                      </div>
                    </TD>
                    <TD>
                      <div className="flex items-center gap-1 px-2 py-0.5 border border-black/10 rounded-md">
                        <IDocument color="dark-gray" />
                        <div className="w-[100px] overflow-hidden overflow-ellipsis font-normal text-sm text-black/70">
                          {item.nftId}
                        </div>
                      </div>
                    </TD>
                    <TD>{item.units}</TD>
                    <TD>
                      <p
                        className={
                          item.status === 'Success'
                            ? 'text-dark-green'
                            : 'text-dark-red'
                        }
                      >
                        {item.status}
                      </p>
                    </TD>
                    <TD>
                      <div className="flex gap-1 items-center">
                        <p>{item.gasCount}</p>
                        <Image
                          src="/images/eth.png"
                          alt="eth"
                          width={16}
                          height={16}
                        />
                      </div>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </div>
          <div className="flex justify-end">
            <Button>Download Report</Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ActivityReportModal;
