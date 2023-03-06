import styled from 'styled-components';

// types

// components
export const NFTManagementWrapper = styled.div.attrs({
  className: 'relative flex px-6 py-4',
})``;

// --- Main Content
export const NFTManagementContentWrapper = styled.div.attrs({
  className: 'flex w-full grow',
})``;

export const NFTManagementContent = styled.div.attrs({
  className: 'flex flex-col w-full space-y-4',
})``;

export const NFTManagementContentHeader = styled.div.attrs({
  className: 'inline-flex items-center px-2 space-x-4',
})``;

export const NFTManagementContentHeaderLabel = styled.span.attrs({
  className: 'text-black/60 ',
})``;

export const NFTManagementContentBody = styled.div.attrs({
  className: 'flex flex-col',
})``;

export const NFTManagementTopTool = styled.div.attrs({
  className: 'flex items-center justify-between pb-4 border-b border-black/10',
})``;

export const NFTManagementSubTool = styled.div.attrs({
  className: 'flex items-center justify-between py-4',
})``;

export const NFTManagementSubToolLeft = styled.div.attrs({
  className: 'flex items-center space-x-2',
})``;

export const NFTManagementSubToolRight = styled.div.attrs({
  className: 'flex items-center space-x-2',
})``;

export const NFTManagementDot = styled.div.attrs({
  className: 'w-[5px] h-[5px] inline-flex rounded-full bg-black/60',
})``;