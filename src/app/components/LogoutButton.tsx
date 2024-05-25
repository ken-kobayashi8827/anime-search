'use client';

import { logout } from '@/utils/supabase/actions';
import { Button, useToast } from '@chakra-ui/react';

type Props = {
  redirectUrl: string;
  colorScheme?: string;
  variant?: string;
  hover?: {
    bg?: string;
    color?: string;
    opacity?: string;
  };
};

export default function LogoutButton({
  redirectUrl,
  colorScheme = 'black',
  variant = 'outline',
  hover = { bg: 'black', color: 'white' },
}: Props) {
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
    <Button
      colorScheme={colorScheme}
      variant={variant}
      _hover={hover}
      onClick={handleLogout}
    >
      ログアウト
    </Button>
  );
}
