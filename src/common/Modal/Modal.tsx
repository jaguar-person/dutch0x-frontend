import React from 'react';
import clsx from 'clsx';

// components
import { IconButton } from '../Button';
import { IconType } from '../Icons';
import * as DutchC from './styles';

import { IXMark } from '../Icons';

// types
interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}

interface ModalHeadProps {
  icon?: IconType;
  title: string;
  onClose?: (e: any) => void;
  onBack?: () => void;
  children?: React.ReactNode;
}

interface ModalBodyProps {
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  className,
}) => {
  return (
    <DutchC.ModalWrapper className={clsx(isOpen ? 'visible' : ' invisible')}>
      <DutchC.ModalInner
        className={clsx(
          isOpen ? 'top-1/2 -translate-y-1/2 ' : 'top-0 -translate-y-full',
          `${className}`
        )}
      >
        {children}
      </DutchC.ModalInner>
    </DutchC.ModalWrapper>
  );
};

export const ModalHead: React.FC<ModalHeadProps> = ({
  icon,
  title,
  onClose,
  onBack,
  children,
}) => {
  return (
    <DutchC.ModalHeadWrapper>
      <DutchC.ModalTitleWrapper>
        {!!icon && <IconButton icon={icon} onClick={onBack} />}
        <DutchC.ModalTitle>{title}</DutchC.ModalTitle>
        {children}
      </DutchC.ModalTitleWrapper>
      <div onClick={onClose} className="cursor-pointer">
        <IXMark />
      </div>
    </DutchC.ModalHeadWrapper>
  );
};

export const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return <DutchC.ModalBodyWrapper>{children}</DutchC.ModalBodyWrapper>;
};
