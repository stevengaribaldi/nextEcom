'use client';
import React, { useState } from 'react';
import { IconUser } from '@tabler/icons-react';
import { useAuth } from '@/hooks/use-auth';

import { HoveredLink, Menu, MenuItem } from './ui/navbar-menuMobile';

const AccountIconMobile = ({ className }: { className?: string }) => {
  const { logOut } = useAuth();

  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleHover = (item: React.SetStateAction<string | null>) => () => {
    setHovered(item);
  };

  const handleLeave = () => {
    setHovered(null);
  };

  return (
    <div className={className}>
      <Menu setActive={setActive}>
        <MenuItem
          setActive={setActive}
          active={active}
          icon={<IconUser className="h-4/5 w-4/5 text-pink-200" />}
          item="Account"
        >
          <div className="text-sm grid grid-cols-3 gap-10 p-4">
            {['cart', 'sell'].map((item) => (
              <HoveredLink
                key={item}
                href={`/${item.toLowerCase()}`}
                onHover={handleHover(item)}
                onLeave={handleLeave}
                style={{
                  color: hovered && hovered !== item ? '#555d50' : '#fad6a5',
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </HoveredLink>
            ))}
            <HoveredLink
              key="logout"
              onClick={logOut}
              onHover={handleHover('logout')}
              onLeave={handleLeave}
              style={{
                color: hovered && hovered !== 'logout' ? '#555d50' : '#fad6a5',
              }}
            >
              Log Out
            </HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default AccountIconMobile;
