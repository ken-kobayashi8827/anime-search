'use client';

import { logout } from '@/utils/supabase/actions';
import { Button } from '@chakra-ui/react';

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button colorScheme='red' onClick={handleLogout}>
      ログアウト
    </Button>
  );
}
