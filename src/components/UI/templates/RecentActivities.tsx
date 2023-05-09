import Activities from '../molecules/Activities';
import Overview from '../molecules/Overview';

export default function RecentActivities({
  onReportModal,
}: {
  onReportModal: () => void;
}) {
  return (
    <div className="w-screen p-4 flex justify-between mt-4">
      <div className="w-[73%]">
        <Activities onReportModal={onReportModal} />
      </div>
      <div className="w-[25%]">
        <Overview />
      </div>
    </div>
  );
}
