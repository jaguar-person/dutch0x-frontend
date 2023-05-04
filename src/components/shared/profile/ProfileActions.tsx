import React, { useState } from 'react';
import { Button, OutlineButton } from '@/common';
import {
  UnsavedChanges,
  DeleteAccount,
} from '@/components/profile/alert-modals';

import * as DutchC from './styles';

interface Props {
  onAction: (saveData: boolean) => void;
}
const ProfileActions: React.FC<Props> = ({ onAction }) => {
  const [isUnsavedChanges, setUnsavedChanges] = useState(false);
  const [isDeleteAccount, setDeleteAccount] = useState(false);
  return (
    <DutchC.ProfileActionsWrapper>
      <OutlineButton
        onClick={() => {
          setDeleteAccount(true);
        }}
      >
        Delete Account
      </OutlineButton>
      <DutchC.ProfileActionsRight>
        <OutlineButton
          onClick={() => {
            onAction(false);
            setUnsavedChanges(true);
          }}
        >
          Discard Changes
        </OutlineButton>
        <Button
          onClick={() => {
            onAction(true);
            setUnsavedChanges(true);
          }}
        >
          Save Changes
        </Button>
      </DutchC.ProfileActionsRight>
      <UnsavedChanges
        isUnsavedChanges={isUnsavedChanges}
        onUnsavedChanges={() => {
          setUnsavedChanges(false);
          onAction(true);
        }}
      />
      <DeleteAccount
        isDeleteAccount={isDeleteAccount}
        onDeleteAccount={() => {
          setDeleteAccount(false);
        }}
      />
    </DutchC.ProfileActionsWrapper>
  );
};

export default ProfileActions;
