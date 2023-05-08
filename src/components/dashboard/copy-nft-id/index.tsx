import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

import * as Icons from '@/common/Icons';

type CopyNFTIdProps = {
  id: string;
  type?: 'long' | 'short';
  onClick?: () => void;
  text?: string;
};

const CopyNFTId: React.FC<CopyNFTIdProps> = ({
  type = 'short',
  id,
  onClick,
  text = 'NFT id',
}) => {
  const { theme } = useTheme();
  const [status, setStatus] = useState<'default' | 'active' | 'copied'>(
    'default'
  );
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  return (
    <button
      className="reltive group rounded-md inline-flex items-center justify-center gap-x-1 px-2.5 py-0.5 w-fit h-fit max-w-full border border-black/10 backdrop-blur hover:bg-black/10 active:bg-black dark:border-white/10 dark:hover:bg-white/10 dark:active:bg-white/50"
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(id);
        return onClick;
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        clearTimeout(timer);
        setStatus('active');
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        if (type === 'long') {
          setStatus('default');
          return;
        }
        setStatus('copied');
        clearTimeout(timer);
        setTimer(
          setTimeout(() => {
            setStatus('default');
          }, 2000)
        );
      }}
    >
      <div
        className={clsx(
          'absolute top-[-30px] bg-black/70 rounded-md backdrop-blur px-3 py-1 text-xs text-white dark:bg-white/30 transition-all delay-300 duration-1000',
          status === 'copied' ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      >
        Copied
      </div>
      <div className="opacity-50 flex items-center justify-center group-hover:opacity-100">
        <Icons.IDocumentDuplicateIcon
          size="medium"
          color={
            theme === 'light'
              ? status === 'default'
                ? 'black'
                : status === 'active'
                ? 'white'
                : 'black'
              : 'white'
          }
        />
      </div>
      <div
        className="text-xs truncate max-w-[170px]"
        color={
          theme === 'light'
            ? status === 'default'
              ? 'black'
              : status === 'active'
              ? 'white'
              : 'black'
            : 'white'
        }
      >
        {type === 'long' ? id : 'NFT id'}
      </div>
    </button>
  );
};

export default CopyNFTId;
