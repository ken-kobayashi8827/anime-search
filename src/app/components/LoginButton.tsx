import NextLink from 'next/link';
import { Button } from '@chakra-ui/react';

type Props = {
  redirectUrl?: string;
  colorScheme?: string;
  variant?: string;
  hover?: {
    bg?: string;
    color?: string;
    opacity?: string;
  };
};

export default function LoginButton({
  redirectUrl,
  colorScheme = 'black',
  variant = 'outline',
  hover = { bg: 'black', color: 'white' },
}: Props) {
  return (
    <Button
      as={NextLink}
      href={redirectUrl}
      colorScheme={colorScheme}
      variant={variant}
      _hover={hover}
    >
      ログイン
    </Button>
  );
}
