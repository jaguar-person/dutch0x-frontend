import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  progress: number; 
}
export default function ProgressBar ({ progress }: ProgressBarProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    setAnimatedProgress(progress);
  }, [progress]);

  return (
    <div className="relative h-4 w-full bg-[rgba(255,255,255,0.1)]  rounded-full overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full bg-gradient-progress rounded-full"
        style={{
          width: `${animatedProgress}%`,
          transition: "width 0.5s ease-in-out"
        }}
      ></div>
      <div
        className="absolute left-0 top-0 h-full w-full progress-bg-gradient  bg-opacity-100 rounded-full"
        style={{ width: `${animatedProgress}%` }}
      ></div>
    </div>
  );
};

