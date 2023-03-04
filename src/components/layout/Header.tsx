import React from 'react';
import { useRouter } from 'next/router';

// components
import { SearchInput, IconButton, Badge, NavLink } from '@/common';
import * as DutchC from './styles';

// types
import { Menu } from '@/types';

const menus: Menu[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    slug: 'dashboard',
  },
  {
    name: 'Create',
    path: '/create',
    slug: 'create',
  },
  {
    name: 'Marketplace',
    path: '/marketplace',
    slug: 'marketplace',
  },
  {
    name: 'Learn',
    path: '/learn',
    slug: 'learn',
  },
];

const Header: React.FC = () => {
  const router = useRouter();

  const PAGE_PATH = router.asPath.split('/')[1] ?? '';

  return (
    <DutchC.HeaderWrapper>
      <DutchC.HeaderInner>
        <DutchC.Logo
          src="/images/logo.svg"
          width={145}
          height={36}
          alt="logo"
        />

        <DutchC.Nav>
          {menus.map((menu) => (
            <NavLink
              key={menu.slug}
              href={menu.path}
              active={PAGE_PATH === menu.slug ? 1 : 0}
            >
              {menu.name}
              {menu.slug === 'marketplace' && (
                <DutchC.ComingSoon>Coming Soon</DutchC.ComingSoon>
              )}
            </NavLink>
          ))}
        </DutchC.Nav>

        <DutchC.SearchWrapper>
          <SearchInput placeholder="Enter NFTs to find holders" isShortCut />
        </DutchC.SearchWrapper>

        <DutchC.RightActions>
          <Badge variant="dot" label="STATUS" />

          <IconButton icon="bell" />
          <IconButton icon="wallet" />
          <IconButton icon="user" />
        </DutchC.RightActions>
      </DutchC.HeaderInner>
    </DutchC.HeaderWrapper>
  );
};

export default Header;
