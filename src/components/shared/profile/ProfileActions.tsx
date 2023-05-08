import React, { useState } from 'react';
import { Button, OutlineButton } from '@/common';
import {
  UnsavedChanges,
  DeleteAccount,
} from '@/components/profile/alert-modals';

import * as DutchC from './styles';

interface Props {
  onAction: (saveData: boolean) => void;
  isLoading: boolean;
}
const ProfileActions: React.FC<Props> = ({ onAction, isLoading = false }) => {
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
            setUnsavedChanges(true);
          }}
        >
          Discard Changes
        </OutlineButton>
        <Button
          onClick={() => {
            setUnsavedChanges(true);
          }}
        >
          {isLoading ? 'Saving Changes ...' : 'Save Changes'}
        </Button>
      </DutchC.ProfileActionsRight>
      <UnsavedChanges
        isUnsavedChanges={isUnsavedChanges}
        onUnsavedChanges={(value) => {
          setUnsavedChanges(false);
          onAction(value);
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
