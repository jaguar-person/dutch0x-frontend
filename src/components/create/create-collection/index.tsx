import React, { useState } from 'react';
import { useTheme } from 'next-themes';

// components
import { MediaUpload, TextInput, TextArea, Button } from '@/common';
import { Guide } from '@/components/shared';
import * as DutchC from './styles';
import Breadcrumb from '../../shared/Breadcrumb';

// icons
import * as Icons from '@/common/Icons';
import { useForm } from '@/hooks/useForm';
import useCollectionHook from '@/hooks/useCollectionHook';
import { ContentLayout } from '@/components/layout';
import { toast } from 'react-toastify';

const CreateCollectionHome: React.FC = () => {
  const [values, handleChange] = useForm({
    name: '',
    description: '',
  });
  const [tileUri, setTileUri] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [banner, setBanner] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { createCollection } = useCollectionHook();

  const handleCreateCollection = async () => {
    if (tileUri === '') return toast.error('Tile image is required');
    if (avatar === '') return toast.error('Avatar image is required');
    if (banner === '') return toast.error('Banner image is required');
    if (values.name === '') return toast.error('Collection name is required');

    setIsLoading(true);
    await createCollection({
      name: values.name,
      description: values.description,
      tileUri,
      avatar,
      banner,
    });
    setIsLoading(false);
  };

  return (
    <ContentLayout>
      <DutchC.CreateCollectionContentBody>
        <DutchC.CreateCollectionHeader>
          Create Collection
        </DutchC.CreateCollectionHeader>

        <DutchC.CreateCollectionMediaUploadWrapper>
          {/* label */}
          <DutchC.CreateCollectionMediaUploadLabel>
            <span className="font-medium dark:text-white/70">Media*</span>
            <span className="dark:text-white/70">
              (Supported: JPG, JPEG, PNG, GIF)
            </span>
          </DutchC.CreateCollectionMediaUploadLabel>
          {/* Media Upload */}
          <DutchC.CreateCollectionMediaUploadInner>
            <DutchC.CreateCollectionMediaUploadItem colSpan="1" aspect="5/7">
              <MediaUpload
                variant="tile"
                setImageUrl={setTileUri}
                imageUrl={tileUri}
                name="tileUri"
              />
            </DutchC.CreateCollectionMediaUploadItem>
            <DutchC.CreateCollectionMediaUploadItem colSpan="1" aspect="1/1">
              <MediaUpload
                variant="avatar"
                setImageUrl={setAvatar}
                imageUrl={avatar}
                name="avatar"
              />
            </DutchC.CreateCollectionMediaUploadItem>
            <DutchC.CreateCollectionMediaUploadItem colSpan="3" aspect="3/1">
              <MediaUpload
                variant="banner"
                setImageUrl={setBanner}
                imageUrl={banner}
                name="banner"
              />
            </DutchC.CreateCollectionMediaUploadItem>
          </DutchC.CreateCollectionMediaUploadInner>
        </DutchC.CreateCollectionMediaUploadWrapper>

        {/* Name */}
        <TextInput
          label="Name"
          onChange={handleChange}
          value={values.name}
          name="name"
          required
        />

        {/* Description */}
        <TextArea
          label="Description"
          onChange={handleChange}
          value={values.Description}
          name="Description"
          required
          placeholder="Text"
          className="w-1/2"
        />

        {/* Create */}
        <DutchC.CreateCollectionButtonWrapper>
          <Button
            type="button"
            loading={isLoading}
            onClick={handleCreateCollection}
          >
            Create Collection
          </Button>
        </DutchC.CreateCollectionButtonWrapper>
      </DutchC.CreateCollectionContentBody>
    </ContentLayout>
  );
};

export default CreateCollectionHome;
