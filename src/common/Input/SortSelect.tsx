import React from 'react';
import * as DutchC from './styles';

export type SortType = {
  name: string;
  value: string;
};
interface SortSelectProps {
  title: string;
  options: SortType[];
}

const SortSelect: React.FC<SortSelectProps> = ({ title, options }) => {
  return (
    <div className="flex-1">
      <div className="flex border border-gray-300 rounded-lg px-3 py-2 text-black/70 dark:border-white/10 dark:text-white/70 dark:bg-dark-surface">
        <div className="text-sm font-normal dark:text-white/70">{title}:</div>

        <select
          id="states"
          className="flex-grow bg-transparent font-medium pr-2 cursor-pointer dark:text-white/70"
        >
          {options.map((item) => (
            <option key={item.name} value={item.value} className="text-black">
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortSelect;
