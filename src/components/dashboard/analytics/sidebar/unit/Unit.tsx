import React from 'react';
import Image from 'next/image';
import { ICheckCircle } from '@/common';

import * as DutchC from './style';
import { getIpfsHttpUrl } from '@/lib/pinata';

interface UnitProps {
  id: number;
  avatar: string;
  title: string;
  content: string;
  isSelected: boolean;
  onSelected: (id: number) => void;
}

const Unit: React.FC<UnitProps> = ({
  id,
  avatar,
  title,
  content,
  isSelected,
  onSelected,
}) => {
  return (
    <DutchC.UnitWrapper
      onClick={() => {
        onSelected(id);
      }}
    >
      <div className="w-10 h-10">
        <Image
          src={getIpfsHttpUrl(avatar)}
          alt="avatar"
          className="flex w-10 !h-10"
          fill
        />
      </div>
      <DutchC.UnitContent>
        <p className="text-black text-medium leading-5 w-[80%]">{title}</p>
        <p className="text-black/50 leading-5">{content}</p>
        {isSelected ? (
          <ICheckCircle size="large" className="absolute right-0 top-0.5" />
        ) : (
          <DutchC.UnitNotSelected />
        )}
      </DutchC.UnitContent>
    </DutchC.UnitWrapper>
  );
};

export default Unit;
