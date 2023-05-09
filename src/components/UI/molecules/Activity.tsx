import React, { useState } from 'react';
import ActionHistory from '../atoms/actions/ActionHistory';
import ActionTimer from '../atoms/actions/ActionTimer';
import { ActivityType } from '@/types/frontend/data/activity';
import ActionBadge from '../atoms/actions/Badge';
import TransactionAssets from '../atoms/assets';
import Button from '../atoms/button';
import ProgressBar from '../atoms/progress-bar';
import TransactionLogger from '../atoms/transaction-logger';

interface Props {
  activity: ActivityType;
  onReportModal: () => void;
}
export default function Activity({ activity, onReportModal }: Props) {
  return (
    <div
      className="mt-4 relative w-full rounded-[8px] border-light border-[1px] py-4 flex justify-between"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <div className="w-[70%] z-2" style={{ zIndex: 2 }}>
        <div className="flex gap-4">
          <ActionBadge name={activity.statusName} status={activity.status} />
          <ActionTimer createdAt={activity.createdAt} />
        </div>
        <div className="p-4">
          <TransactionLogger name={activity.name} titles={activity.titles} />
        </div>
        <div>
          <ActionHistory history={activity.history} amount={activity.amount} />
        </div>
        {typeof activity.progress != 'undefined' && (
          <div className="p-4">
            <ProgressBar progress={activity.progress} />
          </div>
        )}
        <div className="p-4 flex gap-4">
          {activity.status.name === 'Interrupted' && (
            <Button label="Show Report" onClick={onReportModal} />
          )}
          {activity.status.name === 'Completed' && (
            <>
              <Button label="View Progress" bg="white" />
              <Button label="Stop Minting" />
            </>
          )}
          {activity.status.name === 'Running' &&
            activity.statusName === 'CREATE' && (
              <>
                <Button label="View NFT Management" bg="white" />
                <Button label="Show Report" onClick={onReportModal} />
              </>
            )}
          {activity.status.name === 'Running' &&
            activity.statusName === 'ADD FUNDS' && (
              <>
                <Button label="View Transaction" />
              </>
            )}
        </div>
      </div>
      <div className="w-[25%] z-2" style={{ zIndex: 2 }}>
        <TransactionAssets />
      </div>
    </div>
  );
}
