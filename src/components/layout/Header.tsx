import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

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
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const PAGE_PATH = router.asPath.split('/')[1] ?? '';

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DutchC.HeaderWrapper>
      <DutchC.HeaderInner>
        <DutchC.Logo
          src={`/images/${theme === 'light' ? 'logo.svg' : 'logo-dark.svg'}`}
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

          <IconButton
            icon={theme === 'light' ? 'moon' : 'sun'}
            onClick={toggleTheme}
          />
          <IconButton icon="bell" />
          <IconButton icon="wallet" />
          <IconButton icon="user" />
        </DutchC.RightActions>
      </DutchC.HeaderInner>
    </DutchC.HeaderWrapper>
  );
};

export default Header;