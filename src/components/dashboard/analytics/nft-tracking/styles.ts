import styled from 'styled-components';

export const ContentSwitch = styled.div.attrs({
  className: 'flex flex-col gap-2',
})``;

export const ContentSwitchInner = styled.div.attrs({
  className: 'flex gap-4 flex-wrap',
})``;

export const TransactionSwitchWrapper = styled.div.attrs<{ className: string }>(
  {
    className: 'flex border border-black/10 dark:border-white/10 rounded-lg',
  }
)``;

export const DaySwitchWrapper = styled.div.attrs({
  className:
    'flex divide-x divide-black/10 dark:divide-white/10 border border-black/10 dark:border-white/10 rounded-lg',
})``;

export const ContentIdkHead = styled.div.attrs({
  className: 'flex gap-2 items-center',
})``;

export const ContentOverviewWrapper = styled.div.attrs({
  className: 'flex flex-col gap-2',
})``;

export const ContentOverviewInner = styled.div.attrs({
  className: 'flex flex-col gap-4',
})``;

export const ContentOverviewCards = styled.div.attrs({
  className: 'flex',
})``;

export const ContentOverviewCharts = styled.div.attrs({
  className: 'flex',
})``;

export const ContentOverviewChartsMain = styled.div.attrs<{
  className: string;
}>({
  className: 'flex flex-col gap-2',
})``;

export const ChartsMainTitle = styled.div.attrs({
  className: 'font-bold text-sm text-black/70 dark:text-white/70',
})``;

export const ContentOverviewChartsRight = styled.div.attrs({
  className: 'flex flex-col gap-4 w-1/3',
})``;

export const ChartsWrapper = styled.div.attrs({
  className: ' flex flex-col items-end',
})``;

export const AreaChartsWrapper = styled.div.attrs({
  className: 'w-full h-[250px]',
})``;

export const BarChartsWrapper = styled.div.attrs({
  className: 'py-2 flex flex-col gap-2 w-[95%]',
})``;
