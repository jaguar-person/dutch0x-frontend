import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useTheme } from 'next-themes';
import Image from 'next/image';

// components
import {
  Button,
  CSVUpload,
  OutlineButton,
  Table,
  THead,
  TBody,
  TR,
  TD,
} from '@/common';
import { Guide } from '@/components/shared';
import * as DutchC from './styles';
import Breadcrumb from '../../shared/Breadcrumb';
import MintingModal from '../minting';

// icons
import * as Icons from '@/common/Icons';
import FolderUpload from '@/common/Upload/FolderUpload';
import { CSVMetadataI } from '@/types';
import CollectionDropdown from '@/common/Dropdown/CollectionDropdown';
import useNFTHook from '@/hooks/useNFTHook';
import { pinFileToIPFS } from '@/lib/pinata';
import { useAppDispatch } from '@/redux/store';
import { setMintModalIsOpen, setSelectedDraftNFTs } from '../ducks';
import { handleNFTPropertiesFromFolder } from '@/lib/metadata';
import PreviewTable from './PreviewTable';

const CreateBulkMintHome: React.FC = () => {
  const dispatch = useAppDispatch();

  const { upsertDraftNFT } = useNFTHook();

  const [isSavingToDraft, setIsSavingToDraft] = useState<boolean>(false);
  const [isMintingNft, setIsMintingNft] = useState<boolean>(false);
  const [selectedCollectionAddress, setSelectedCollectionAddress] =
    useState<string>('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [selectedCSVFileContent, setSelectedCSVFileContent] = useState<
    CSVMetadataI[]
  >([]);

  const handleSaveToDraft = async () => {
    if (selectedCSVFileContent.length !== imageUrls.length) {
      return toast('CSV content not equal to selected images folder', {
        type: 'error',
      });
    }

    setIsSavingToDraft(true);

    await Promise.all(
      selectedCSVFileContent.map(async (csvFileContent, index) => {
        const mediaUrl = await pinFileToIPFS([String(imageUrls[index])]);
        const { properties } = handleNFTPropertiesFromFolder(
          csvFileContent.properties
        );

        return await upsertDraftNFT({
          properties: JSON.stringify(properties),
          collection: selectedCollectionAddress,
          media: String(mediaUrl),
          name: csvFileContent.name,
          royalty: csvFileContent.royalties,
          amount: csvFileContent.amount,
          description: csvFileContent.description,
        });
      })
    );

    toast('NFTs are saved to draft', { type: 'error' });

    setIsSavingToDraft(false);
  };

  const handleMintNfts = async () => {
    if (selectedCSVFileContent.length !== imageUrls.length) {
      return toast('CSV content not equal to selected images folder', {
        type: 'error',
      });
    }

    setIsMintingNft(true);

    const nfts = await Promise.all(
      selectedCSVFileContent.map(async (csvFileContent, index) => {
        const mediaUrl = await pinFileToIPFS([String(imageUrls[index])]);
        const { properties } = handleNFTPropertiesFromFolder(
          csvFileContent.properties
        );

        return {
          properties: JSON.stringify(properties),
          collection: selectedCollectionAddress,
          media: String(mediaUrl),
          name: csvFileContent.name,
          royalty: csvFileContent.royalties,
          amount: csvFileContent.amount,
          description: csvFileContent.description,
        };
      })
    );

    dispatch(setSelectedDraftNFTs(nfts));
    dispatch(setMintModalIsOpen(true));
    setIsMintingNft(false);
  };

  return (
    <DutchC.CreateWrapper>
      <DutchC.CreateBulkMintWrapper>
        <DutchC.CreateBulkMintContent>
          <Breadcrumb />

          <DutchC.CreateBulkMintContentBody>
            <DutchC.CreateBulkMintHeader>Bulk Mint</DutchC.CreateBulkMintHeader>

            {/* Collection Selector */}
            <DutchC.CreateBulkMintCollectionSelectWrapper>
              <CollectionDropdown
                selectedCollectionAddress={selectedCollectionAddress}
                setSelectedCollectionAddress={setSelectedCollectionAddress}
              />
            </DutchC.CreateBulkMintCollectionSelectWrapper>

            {/* Main Content */}
            <DutchC.CreateBulkMintContentMain>
              {/* left */}
              <DutchC.CreateBulkMintContentMainLeft>
                {/* Multi Media Upload */}
                <DutchC.CreateBulkMintContentMultiMediaUploadWrapper>
                  <DutchC.CreateBulkMintContentMultiMediaUploadLabel>
                    Media files* <br /> (Supported : JPG, PNG, GIF, WEBP, WEBM,
                    MP4, GLB, GLTF)
                  </DutchC.CreateBulkMintContentMultiMediaUploadLabel>

                  <FolderUpload
                    setImageUrls={setImageUrls}
                    imageUrls={imageUrls}
                  />
                </DutchC.CreateBulkMintContentMultiMediaUploadWrapper>
                {/* CSV Upload */}
                <DutchC.CreateBulkMintContentCSVUploadWrapper>
                  <DutchC.CreateBulkMintContentCSVUploadLabel>
                    <span className="font-medium text-black/70 dark:text-white/70">
                      CSV file*
                    </span>{' '}
                    <br />
                    <p>
                      <span className="font-bold">
                        Download our CSV template
                      </span>{' '}
                      to make sure your CSV is formatted correctly.
                    </p>
                  </DutchC.CreateBulkMintContentCSVUploadLabel>

                  <CSVUpload
                    selectedCSVFileContent={selectedCSVFileContent}
                    setSelectedCSVFileContent={setSelectedCSVFileContent}
                  />
                </DutchC.CreateBulkMintContentCSVUploadWrapper>
              </DutchC.CreateBulkMintContentMainLeft>
              {/* right */}
              <PreviewTable
                selectedCSVFileContent={selectedCSVFileContent}
                imageUrls={imageUrls}
              />
            </DutchC.CreateBulkMintContentMain>

            {/* Actions */}
            <DutchC.CreateBulkMintContentActions>
              <Button onClick={handleMintNfts} loading={isMintingNft}>
                Mint all NFTs
              </Button>
              <Button onClick={handleSaveToDraft} loading={isSavingToDraft}>
                Save to Drafts
              </Button>
              <OutlineButton>Cancel</OutlineButton>
            </DutchC.CreateBulkMintContentActions>
          </DutchC.CreateBulkMintContentBody>
        </DutchC.CreateBulkMintContent>
      </DutchC.CreateBulkMintWrapper>

      <MintingModal className="!max-w-xl" />
    </DutchC.CreateWrapper>
  );
};

export default CreateBulkMintHome;
