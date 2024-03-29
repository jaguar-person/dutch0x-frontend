import { NftDataI } from '.';

export interface Pending {
  withdraw: string;
  deposit: string;
}

export interface Preference {
  favourite: boolean;
  hide: boolean;
}

export interface Cached {
  avatar: string;
  banner: string;
  tileUri: string;
  thumbnail: string;
}

export interface Times {
  createdAt: number;
  updatedAt: number;
}

export interface Properties {
  isLegacy: boolean;
  isPublic: boolean;
  isCounterFactualNFT: boolean;
  isMintable: boolean;
  isEditable: boolean;
  isDeletable: boolean;
}

export interface Extra {
  properties: Properties;
  mintChannel: string;
}

export interface NFTCollectionInfo {
  id: number;
  owner: string;
  name: string;
  contractAddress: string;
  collectionAddress: string;
  baseUri: string;
  nftFactory: string;
  description: string;
  avatar: string;
  banner: string;
  thumbnail: string;
  tileUri: string;
  cached: Cached;
  deployStatus: string;
  nftType: string;
  times: Times;
  extra: Extra;
}

export interface NFTI_Deprecated {
  id: number;
  accountId: number;
  tokenId: number;
  nftData: string;
  tokenAddress: string;
  nftId: string;
  nftType: string;
  total: string;
  locked: string;
  pending: Pending;
  deploymentStatus: string;
  isCounterFactualNFT: boolean;
  minter: string;
  royaltyPercentage: number;
  preference: Preference;
  collectionInfo: NFTCollectionInfo;
  metadata: NftDataI;
}

export interface SlotI {
  balance: string;
}

export interface NFTI {
  id: number;
  amount: number;
  nftID: string;
  nftType: string;
  tokenAddress: string;
  slots: SlotI[];
  isSynced?: boolean;
  metadata: NftDataI;
}

export interface PropertyI {
  key: any;
  value: any;
}

export interface CreateNftManagementI {
  id?: string;
  owner: string;
  accountId?: string;
  name: string;
  description: string;
  collectionName: string;
  collectionAddress: string;
  amount: string;
  image: string;
  nftId: string;
  available: string;
  nftData?: string;
  properties: PropertyI[];
  listName: string | null;
  createdAt?: Date | string;
}

export interface DraftNFTResponseI {
  id: number;
  collection: string;
  owner: string;
  media: string;
  name: string;
  description: string;
  amount: string;
  royalty: string;
  properties: string;
  createdAt: Date;
  selected?: boolean;
}

export interface DeleteDraftNFTRequestI {
  id: number;
  ownerAddress: string;
}

export enum MintStatusEnum {
  QUEUED = 'QUEUED',
  MINTING = 'MINTING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface MintingNftsI {
  id: number;
  media: string;
  name: string;
  status: MintStatusEnum;
}

export type TabTypeT = 'ALL' | 'LIST' | 'COLLECTION' | 'ARCHIVE' | 'BANK0X';

export interface UserListI {
  listName: string;
  collectionName: string;
  collectionAddress: string;
  imageUrls: string[];
  nfts: CreateNftManagementI[];
}

export enum UsageStatusEnum {
  ARCHIVED = 'ARCHIVED',
  UNARCHIVED = 'UNARCHIVED',
}

export type NFTFee = {
  fees: {
    eth: {
      feeMint: string;
      feeTransfer: string;
      feeWithdrawal: string;
    };
    lrc: {
      feeMint: string;
      feeTransfer: string;
      feeWithdrawal: string;
    };
    usdt: {
      feeMint: string;
      feeTransfer: string;
      feeWithdrawal: string;
    };
    usdc: {
      feeMint: string;
      feeTransfer: string;
      feeWithdrawal: string;
    };
  };
};
