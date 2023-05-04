import { useRouter } from 'next/router';

import { Table, THead, TBody, TR, TD } from '@/common';

import {
  ShortcutContextMenu,
  ShortcutContextMenuItem,
} from '@/components/shared/shortcut-context-menu';
import { UserListI } from '@/types';
import NFTMultiCard from '../../cards/nft-multi-card';

const NFTListTable: React.FC<{
  nftMultiList: UserListI[];
  onShowListModal: () => void;
}> = ({ nftMultiList, onShowListModal }): JSX.Element => {
  const router = useRouter();

  return (
    <Table>
      <THead>
        <TR>
          <TD>List Name</TD>
          <TD>Collection</TD>
          <TD>NFTs</TD>
          <TD>Notes</TD>
        </TR>
      </THead>
      <TBody>
        {nftMultiList.map((list, i) => {
          return (
            <TR key={i} className="cursor-pointer" onClick={onShowListModal}>
              <TD>
                <div className="flex gap-2 justify-between items-center">
                  <div>{list.listName}</div>
                  <div className="flex gap-2">
                    <NFTMultiCard
                      key={i}
                      imageUrls={list.imageUrls}
                      className="grid-cols-4 justify-end !p-0"
                      onShowListModal={onShowListModal}
                    />
                  </div>
                </div>
              </TD>
              <TD>{list.collectionName}</TD>
              <TD>{list.imageUrls.length}</TD>
              <TD>
                <div className="flex justify-between items-center">
                  <p>Just remarks.</p>
                  <ShortcutContextMenu position="BR">
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
                </div>
              </TD>
            </TR>
          );
        })}
      </TBody>
    </Table>
  );
};

export default NFTListTable;
