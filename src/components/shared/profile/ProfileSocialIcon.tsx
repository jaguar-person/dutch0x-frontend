import React from 'react';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import * as DutchC from './styles';
import { InputLabel } from '@/common/Input/styles';
import { TextInput } from '@/common';

interface SocialIconProps {
  title: string;
  icon: StaticImageData;
  link: string;
  onChange: (value: string) => void;
  defaultValue?: string;
}

const ProfileSocialIcon: React.FC<SocialIconProps> = ({
  title,
  icon,
  link,
  onChange,
  defaultValue = '',
}) => {
  return (
    <DutchC.ProfileSocialIconWrapper>
      <InputLabel>{title}</InputLabel>
      <DutchC.ProfileSocialIconInner>
        <DutchC.ProfileSocialIconContent>
          <Image src={icon} alt="social" />
          <DutchC.SocialLinkText href={link}>{link}</DutchC.SocialLinkText>
        </DutchC.ProfileSocialIconContent>
        <div className="ml-2  w-[70%]  flex items-center">
          <input
            placeholder="username"
            defaultValue={defaultValue}
            onChange={(event) => onChange(event.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>
      </DutchC.ProfileSocialIconInner>
    </DutchC.ProfileSocialIconWrapper>
  );
};

export default ProfileSocialIcon;
