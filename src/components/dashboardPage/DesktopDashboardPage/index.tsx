import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Button } from '@/common';

import { setIsConnectionModalOpen } from '@/ducks';

import { AppLayout } from '@/components/layout';
import Navbar from './Navbar';
import ActivityReportModal from '@/components/dashboard/ActivityReportModal';

import RecentActivities from '../../UI/templates/RecentActivities';

const DesktopDashboardPage = () => {
  const { isConnected } = useAppSelector((state) => state.webAppReducer);

  const dispatch = useAppDispatch();

  const openConnectionModal = () => {
    dispatch(setIsConnectionModalOpen(true));
  };

  const [openReportModal, setOpenReportModal] = useState(false);

  return (
    <AppLayout>
      <ActivityReportModal isOpen={openReportModal} />
      {!isConnected ? (
        <div className="flex flex-col w-full">
          <Navbar />
          <RecentActivities
            onReportModal={() => {
              setOpenReportModal(true);
            }}
          />
        </div>
      ) : (
        <div className="fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-6xl text-black dark:text-white">
            This is dummy content.{' '}
          </div>
          <Button className="mt-9 p-1" onClick={openConnectionModal}>
            Connect Wallet
          </Button>
        </div>
      )}
    </AppLayout>
  );
};

export default DesktopDashboardPage;
