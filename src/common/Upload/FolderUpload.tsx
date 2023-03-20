import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { toBase64 } from '@/lib/pinata';

// components
import { Button, OutlineButton } from '@/common';
import * as DutchC from './styles';

// icons
import { IExtMultiMedia } from '../svg';

interface FolderUploadProps {
  selectedImageFolder: FileList | null;
  setSelectedImageFolder: (value: FileList | null) => void;
}

const FolderUpload: React.FC<FolderUploadProps> = ({ selectedImageFolder, setSelectedImageFolder }) => {
  const { theme } = useTheme();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);


  const handleOpen = () => {
    if (hiddenFileInput) {
      hiddenFileInput.current?.click();
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return alert('file upload failed');

    const fileSet = new Set<string>();

    Array.from(files).forEach((file) => {
      if (fileSet.has(file.name)) {
        alert(`File ${file.name} is not unique`);
        return;
      }
      fileSet.add(file.name);
    });

    const urls: string[] = await Promise.all(
      Array.from(files).map((file, index) =>
        toBase64(file) as unknown as string
      )
    );

    setImageUrls(urls);
    setSelectedImageFolder(files);
  };

  

  return (
    <DutchC.MultiUploadWrapper>
      {/* if files does not exist */}
      {imageUrls.length ? (
        <>
          <DutchC.MultiUploadInner>
            {imageUrls
              .slice(0, Math.min(imageUrls.length, 10) - 1)
              .map((url, index) => (
                <Image
                  key={index}
                  alt=""
                  src={url}
                  width={140}
                  height={140}
                  className="aspect-square border border-black/10 rounded dark:border-white/10"
                />
              ))}
            {/* additional image */}
            <DutchC.MultiUploadLastMediaWrapper>
              <Image
                alt=""
                src={imageUrls[imageUrls.length - 1]}
                width={140}
                height={140}
                className="aspect-square border border-black/10 rounded dark:border-white/10"
              />
              {/* backdrop */}
              {imageUrls.length > 10 && (
                <DutchC.MultiUploadLastMediaInner>
                  +{imageUrls.length - 10}
                </DutchC.MultiUploadLastMediaInner>
              )}
            </DutchC.MultiUploadLastMediaWrapper>
          </DutchC.MultiUploadInner>

          {/* actions */}
          <DutchC.MultiUploadActions>
            <DutchC.MultiUploadFilesLengthLabel>
              {imageUrls.length} files uploaded
            </DutchC.MultiUploadFilesLengthLabel>

            <Button size="small" onClick={handleOpen}>
              Re-Upload
            </Button>
          </DutchC.MultiUploadActions>
        </>
      ) : (
        <>
          <IExtMultiMedia />
          <span className="mt-2 dark:text-white/70">Dimention 1:1</span>
          <span className="mb-2 dark:text-white/70">
            Drag and drop your media directory or
          </span>
          <OutlineButton size="small" onClick={handleOpen}>
            Upload media directory
          </OutlineButton>
        </>
      )}
      {/* hidden input */}
      <input
        ref={hiddenFileInput}
        // @ts-ignore
        directory=""
        webkitdirectory=""
        type="file"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </DutchC.MultiUploadWrapper>
  );


}

export default FolderUpload;
