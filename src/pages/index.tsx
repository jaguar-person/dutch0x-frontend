import MobileDashboardPage from '@/components/dashboardPage/MobileDashboardPage';
import DesktopDashboardPage from '@/components/dashboardPage/DesktopDashboardPage';
import { isMobile } from 'react-device-detect';
import {
  DespositFromWalletModal,
  DepositFromFriendModal,
  DepositInProcessModal,
} from '@/components/create/shared/DepositModal';

export default function Dashboard() {
  // return (
  //   <div>
  //     <DepositInProcessModal />
  //     {/* <DespositFromWalletModal />; */}
  //   </div>
  // );
  if (isMobile) return <MobileDashboardPage />;
  else return <DesktopDashboardPage />;
}
