import React from 'react';
import { Modal, ModalHead, ModalBody, OutlineButton, Button } from '@/common';

import * as DutchC from './styles';
import useWalletHook from '@/hooks/useWalletHook';
import { useRouter } from 'next/router';

interface LogoutProps {
  isLogout: boolean;
  onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ isLogout, onLogout }) => {
  const { disconnectAccount } = useWalletHook();
  const router = useRouter();

  const logout = () => {
    disconnectAccount();
    router.push('/');
  };
  return (
    <Modal isOpen={isLogout} className="max-w-xl">
      <ModalHead title="Logout" onClose={onLogout} />
      <ModalBody>
        <DutchC.AlertInner>
          <p>Are you logging out?</p>
          <DutchC.ActionsWrapper>
            <OutlineButton onClick={onLogout}>No</OutlineButton>
            <Button onClick={logout}>Yes, Logout</Button>
          </DutchC.ActionsWrapper>
        </DutchC.AlertInner>
      </ModalBody>
    </Modal>
  );
};

export default Logout;
