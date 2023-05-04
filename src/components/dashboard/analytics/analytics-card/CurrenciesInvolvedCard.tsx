import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { IArrowTrendingUp, IArrowTrendingDown } from '@/common';
import { LRCIconSelector } from '../analytics-tables/lrc-icon-selector';
import { v4 as uuidv4 } from 'uuid';

import * as DutchC from './styles';

interface CurrenciesInvolvedCardProps {
  data: {
    token?: string;
    tokenId: string;
    value: number;
    price: number;
  }[];
  className?: string;
}

const CurrenciesInvolvedCard: React.FC<CurrenciesInvolvedCardProps> = ({
  data,
  className,
}) => {
  return (
    <DutchC.AnalyticsCardWrapper className={className}>
      <p className="text-sm text-black/50">Currencies Involved</p>
      <div>
        {data.map((item) => (
          <div
            key={uuidv4()}
            className="flex gap-1 items-center justify-between"
          >
            <div className="w-[50px] ">{item?.token}</div>
            <div className="flex items-center gap-2 text-sm">
              <LRCIconSelector id={item.tokenId} />
              {item.value}
            </div>
            <div className="text-opacity-50 text-right text-sm">
              ${item.price}
            </div>
          </div>
        ))}
      </div>
    </DutchC.AnalyticsCardWrapper>
  );
};

export default CurrenciesInvolvedCard;
