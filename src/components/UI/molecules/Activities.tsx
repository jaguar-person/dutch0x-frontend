import ACTIVITIES from '@/utils/data/activities';
import EventActions from '../atoms/actions';
import Activity from './Activity';

export default function Activities({
  onReportModal,
}: {
  onReportModal: () => void;
}) {
  const activities = ACTIVITIES;
  return (
    <div className="">
      <div className="flex gap-4">
        <label className="text-[1.2rem] font-light text-white opacity-[50%]">
          Recents
        </label>
        <EventActions />
      </div>
      <div className="mt-2">
        {activities.map((activity, index: number) => (
          <Activity
            key={index}
            activity={activity}
            onReportModal={onReportModal}
          />
        ))}
      </div>
    </div>
  );
}
