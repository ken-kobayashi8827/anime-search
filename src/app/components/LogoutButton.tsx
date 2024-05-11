'use client';

import { logout } from '@/utils/supabase/actions';
import { Button, useToast } from '@chakra-ui/react';

export default function LogoutButton() {
  const toast = useToast();
  const handleLogout = async () => {
    await logout();
    toast({
      title: 'ログアウトしました',
      status: 'success',
      isClosable: true,
    });
  };

  return (
    <Button colorScheme='red' onClick={handleLogout}>
      ログアウト
    </Button>
  );
}
