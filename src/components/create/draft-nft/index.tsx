import React, { useState, useCallback, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { toast } from 'react-toastify';

// components
import {
  Button,
  MediaUpload,
  TextArea,
  TextInput,
  OutlineButton,
} from '@/common';
import { Guide } from '@/components/shared';
import Breadcrumb from '../../shared/Breadcrumb';
import * as DutchC from './styles';

// icons
import * as Icons from '@/common/Icons';
import useNFTHook from '@/hooks/useNFTHook';
import { useForm } from '@/hooks/useForm';
import { getIpfsHttpUrl, pinFileToIPFS } from '@/lib/pinata';
import CollectionDropdown from '@/common/Dropdown/CollectionDropdown';
import { useRouter } from 'next/router';
import { Input } from '@/common/Input/styles';
import { ContentLayout } from '@/components/layout';
import { useAppDispatch } from '@/redux/store';
import { setDraftNFTs } from '../ducks';

// types
type NFTPropertyT = {
  type: string;
  value: string;
};

interface NFTPropertyI {
  type: string;
  value: string;
  onRemove?: () => void;
}

const initialValues = {
  name: '',
  amount: '',
  royalty: '',
  description: '',
};

const CreateDraftNFTHome: React.FC = () => {
  const dispatch = useAppDispatch();

  const { push, query } = useRouter();
  const { upsertDraftNFT, getDraftNftById, getCollectionDraftNFT } =
    useNFTHook();

  const [counter, setCounter] = useState(1);
  const [media, setMedia] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCollectionAddress, setSelectedCollectionAddress] =
    useState<string>('');

  const [properties, setProperties] = useState<NFTPropertyT[]>([
    {
      type: 'Cloth',
      value: 'jeans',
    },
  ]);

  const [values, handleChange] = useState(initialValues);

  useEffect(() => {
    const setEditNft = async () => {
      const id = query?.edit;
      if (id) {
        const nft = await getDraftNftById(String(id));
        console.log(nft);

        if (nft) {
          const properties = JSON.parse(nft.properties);

          if (Object.keys(properties).length > 0) {
            const keys = Object.keys(properties);
            const values = Object.values(properties);
            const newProp: NFTPropertyT[] = keys.map((key, index) => ({
              type: key,
              value: values[index] as unknown as string,
            }));
            setProperties(newProp);
            setCounter(keys.length);
          }
          setMedia(getIpfsHttpUrl(nft.media));
          handleChange({
            name: nft.name,
            amount: nft.amount,
            royalty: nft.royalty,
            description: nft.description,
          });
        }
      } else {
        handleChange(initialValues);
        setMedia('');
      }
    };
    setEditNft();
  }, [query]);

  const handleAddProperty = useCallback(() => {
    setProperties((properties) => [
      ...properties,
      {
        type: 'Cloth',
        value: 'jeans',
      },
    ]);

    setCounter((counter) => counter + 1);
  }, [counter]);

  const handleRemoveProperty = useCallback(
    (index: number) => {
      if (index >= 0) {
        setProperties((properties) => [
          ...properties.slice(0, index),
          ...properties.slice(index + 1),
        ]);
      }
    },
    [properties]
  );

  const handleCreateDraftNFT = async () => {
    if (media === '') return toast.error('Media image is required');
    if (values.name === '') return toast.error('Collection name is required');
    if (values.amount === '')
      return toast.error('Collection amount is required');

    const parsedProperties: Record<string, string> = {};

    let numOfProperties = 0;

    properties.forEach((property: any) => {
      parsedProperties[property.type] = property.value;
      numOfProperties++;
    });

    if (numOfProperties > 64)
      return toast.error('Maximum properties should be 64');

    setIsLoading(true);

    const params = {
      properties: JSON.stringify(parsedProperties),
      collection: selectedCollectionAddress,
      name: values.name,
      royalty: values.royalty,
      amount: values.amount,
      description: values.description,
    };

    let mediaUrl = media;

    if (media.length !== 46) {
      const mediaIpfsUrl = await pinFileToIPFS([media]);
      if (!mediaIpfsUrl) return toast.error('Unable to pin media');
      mediaUrl = String(mediaIpfsUrl);
    }

    const id = query && query.edit ? String(query.edit) : null;

    const res = await upsertDraftNFT(
      {
        ...params,
        media: String(mediaUrl),
      },
      id
    );
    if (res) {
      const nft = await getCollectionDraftNFT(selectedCollectionAddress);
      if (nft) {
        dispatch(setDraftNFTs(nft));
      }
      toast.success('successfully');

      push('/create');
    } else toast.error('Error occurred');
    setIsLoading(false);
  };

  return (
    <ContentLayout>
      <DutchC.CreateDraftNFTContentBody>
        <DutchC.CreateDraftNFTHeader>
          Add NFTs Metadata
        </DutchC.CreateDraftNFTHeader>

        {/* Collection Selector */}
        <DutchC.CreateDraftNFTCollectionSelectWrapper>
          <CollectionDropdown
            selectedCollectionAddress={selectedCollectionAddress}
            setSelectedCollectionAddress={setSelectedCollectionAddress}
          />
        </DutchC.CreateDraftNFTCollectionSelectWrapper>

        <DutchC.CreateDraftNFTContentMain>
          {/* Media Upload */}
          <DutchC.CreateDraftNFTMediaUploadWrapper>
            <DutchC.CreateDraftNFTMediaUploadLabel>
              <span className="font-medium dark:text-white/70">Media*</span>
              <span className="dark:text-white/70 truncate">
                (Supported: JPG, PNG, GIF, WEBP, WEBM, MP4, GLB, GLTF)
              </span>
            </DutchC.CreateDraftNFTMediaUploadLabel>

            <DutchC.CreateDraftNFTMediaUpload>
              <MediaUpload
                variant="default"
                setImageUrl={setMedia}
                imageUrl={media}
                name="media"
              />
            </DutchC.CreateDraftNFTMediaUpload>
          </DutchC.CreateDraftNFTMediaUploadWrapper>

          {/* Detail Edit */}
          <DutchC.CreateDraftNFTContentMainMiddle>
            {/* Name */}
            <TextInput
              label="Name"
              onChange={(e) =>
                handleChange((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              value={values.name}
              name="name"
            />
            {/* Amount */}
            <TextInput
              type="number"
              label="Amount"
              helper="Max: 100,000"
              min={1}
              max={100000}
              onChange={(e) =>
                handleChange((prevState) => ({
                  ...prevState,
                  amount: e.target.value,
                }))
              }
              value={values.amount}
              name="amount"
            />
            {/* Royalty (%) */}
            <TextInput
              type="number"
              label="Royalty (%)"
              helper="Max: 10"
              min={1}
              max={10}
              onChange={(e) =>
                handleChange((prevState) => ({
                  ...prevState,
                  royalty: e.target.value,
                }))
              }
              value={values.royalty}
              name="royalty"
            />

            {/* Properties */}
            <DutchC.CreateDraftNFTPropertiesWrapper>
              <DutchC.CreateDraftNFTPropertiesLabel>
                Properties
              </DutchC.CreateDraftNFTPropertiesLabel>

              {/* list */}
              {properties.map((property, index) => (
                <NFTProperty
                  key={index}
                  onRemove={() => handleRemoveProperty(index)}
                  {...property}
                />
              ))}

              <DutchC.CreateDraftNFTPropertiesAdd onClick={handleAddProperty}>
                + Add property
              </DutchC.CreateDraftNFTPropertiesAdd>
            </DutchC.CreateDraftNFTPropertiesWrapper>

            {/* Actions */}
            <DutchC.CreateDraftNFTActions>
              <Button
                type="button"
                loading={isLoading}
                onClick={handleCreateDraftNFT}
              >
                Save Draft
              </Button>
              <OutlineButton>Cancel</OutlineButton>
            </DutchC.CreateDraftNFTActions>
          </DutchC.CreateDraftNFTContentMainMiddle>

          {/* Description */}
          <TextArea
            label="Description"
            placeholder="Describe your NFT"
            onChange={(e) =>
              handleChange((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
            value={values.description}
            name="description"
          />
        </DutchC.CreateDraftNFTContentMain>
      </DutchC.CreateDraftNFTContentBody>
    </ContentLayout>
  );
};

const NFTProperty: React.FC<NFTPropertyI> = ({ type, value, onRemove }) => {
  const { theme } = useTheme();

  return (
    <DutchC.NFTPropertyWrapper>
      <TextInput placeholder="Type" />
      <TextInput placeholder="Value" />
      <DutchC.NFTPropertyRemove onClick={onRemove}>
        <Icons.IMinusCircle
          variant="solid"
          color={theme === 'dark' ? 'dark-red' : 'accent-red'}
          size="large"
        />
      </DutchC.NFTPropertyRemove>
    </DutchC.NFTPropertyWrapper>
  );
};

export default CreateDraftNFTHome;
