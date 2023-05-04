import React from 'react';

export default function Badge({
  status,
}: {
  status: 'LOADING' | 'INACTIVE' | 'ACTIVE';
}) {
  return (
    <div
      className={`p-2 flex cursor-pointer items-center gap-2 rounded-[4px] 
     ${
       status === 'ACTIVE'
         ? 'bg-light-green'
         : status === 'INACTIVE'
         ? 'bg-light-red'
         : 'bg-light-gray'
     } hover:scale-105 transition duration-300 ease-in-out`}
    >
      <div
        className={`cursor-pointer w-3 h-3 rounded-full ${
          status === 'ACTIVE'
            ? 'bg-accent-green'
            : status === 'INACTIVE'
            ? 'bg-dark-red'
            : 'bg-accent-gray'
        }`}
      />
      <label
        className={`cursor-pointer text-[12px] text-switch-default font-bold ${
          status === 'ACTIVE'
            ? 'text-accent-green'
            : status === 'INACTIVE'
            ? 'text-dark-red'
            : 'text-accent-gray'
        }`}
      >
        {status}
      </label>
    </div>
  );
}
