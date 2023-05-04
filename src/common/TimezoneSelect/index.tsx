// import React, { useState } from 'react';
// import moment from 'moment-timezone';

// const TimezoneSelect = () => {
//   const timeZones = moment.tz.names();
//   const [currentTimezone, setCurrentTimezone] = useState('');

//   let offsetTmz = [];

//   for (let i in timeZones) {
//     offsetTmz.push(
//       ' (GMT' + moment.tz(timeZones[i]).format('Z') + ') ' + timeZones[i]
//     );
//   }

//   return (
//     <select
//       className="w-full my-1 p-2 rounded-md text-sm "
//       onChange={(e) => {
//         setCurrentTimezone(e.target.value);
//       }}
//     >
//       {offsetTmz?.map((timezone) => (
//         <option key={timezone} value={timezone}>
//           {timezone}
//         </option>
//       ))}
//     </select>
//   );
// };

import React from 'react';

const TimezoneSelect = () => {
  return <div></div>;
};

export default TimezoneSelect;
