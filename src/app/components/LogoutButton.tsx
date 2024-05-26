'use client';

import { logout } from '@/utils/supabase/actions';
import { Button, useToast } from '@chakra-ui/react';

type Props = {
  redirectUrl: string;
  colorScheme?: string;
  variant?: string;
  width?: string;
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
  width = '100%',
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
      w={width}
      onClick={handleLogout}
    >
      ログアウト
    </Button>
  );
}
