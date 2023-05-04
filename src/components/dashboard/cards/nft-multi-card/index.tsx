import * as DutchC from './styles';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  ShortcutContextMenu,
  ShortcutContextMenuItem,
} from '@/components/shared/shortcut-context-menu';
import { getIpfsHttpUrl } from '@/lib/pinata';

interface MultiCardProps {
  name?: string;
  collection?: string;
  imageUrls: string[];
  className: string;
  onShowListModal: () => void;
}

const NFTMultiCard: React.FC<MultiCardProps> = ({
  name,
  collection,
  imageUrls,
  className,
  onShowListModal,
}) => {
  console.log({ imageUrls });
  const router = useRouter();

  return (
    <DutchC.MultiUploadWrapper onClick={onShowListModal}>
      <DutchC.MultiUploadInner className={className}>
        {imageUrls
          .slice(0, Math.min(imageUrls.length, 4) - 1)
          .map((url, index) => (
            <Image
              key={index}
              alt=""
              src={getIpfsHttpUrl(url)}
              width={140}
              height={140}
              className="aspect-square border border-black/10 rounded dark:border-white/10"
            />
          ))}
        {/* additional image */}
        <DutchC.MultiUploadLastMediaWrapper>
          <Image
            alt=""
            src={getIpfsHttpUrl(imageUrls[imageUrls.length - 1])}
            width={140}
            height={140}
            className="aspect-square border border-black/10 rounded dark:border-white/10"
          />
          {/* backdrop */}
          {imageUrls.length > 4 && (
            <DutchC.MultiUploadLastMediaInner>
              +{imageUrls.length - 4}
            </DutchC.MultiUploadLastMediaInner>
          )}
        </DutchC.MultiUploadLastMediaWrapper>
      </DutchC.MultiUploadInner>
      {name && collection && (
        <DutchC.MultiUploadLastMediaContentWrapper>
          <DutchC.MultiUploadLastMediaContentInner>
            <div className="text-black text-base font-bold truncate max-w-full dark:text-white/50">
              {name}
            </div>
            <div className="text-sm text-black truncate max-w-full dark:text-white/50">
              {collection}
            </div>
            <p className="text-sm font-semibold bg-black/10 p-1 rounded-md text-black/50 w-fit">
              {imageUrls.length} NFTs
            </p>
          </DutchC.MultiUploadLastMediaContentInner>
          <ShortcutContextMenu position="TR">
            <ShortcutContextMenuItem
              text="Find Holders"
              onClick={() => {
                router.push('/dashboard/holders');
              }}
            />
            <ShortcutContextMenuItem
              text="Show Sales"
              onClick={() => {
                router.push('/dashboard/analytics');
              }}
            />
            <ShortcutContextMenuItem
              text="Move to Achieves"
              onClick={() => {
                // control
                router.push('/dashboard/nft-management/archive');
              }}
            />
          </ShortcutContextMenu>
        </DutchC.MultiUploadLastMediaContentWrapper>
      )}
    </DutchC.MultiUploadWrapper>
  );
};

export default NFTMultiCard;
