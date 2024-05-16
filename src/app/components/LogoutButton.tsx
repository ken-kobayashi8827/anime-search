'use client';

import { logout } from '@/utils/supabase/actions';
import { Button, useToast } from '@chakra-ui/react';

type Props = {
  redirectUrl: string;
};

export default function LogoutButton({ redirectUrl }: Props) {
  const toast = useToast();
  const handleLogout = async () => {
    await logout(redirectUrl);
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
