import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';
import NextLink from 'next/link';

type Props = {
  href: string;
  isActive: boolean;
  children: ReactNode;
};

export default function PageButton({ href, isActive, children }: Props) {
  return (
    <Button as={NextLink} href={href} colorScheme={isActive ? 'teal' : 'gray'}>
      {children}
    </Button>
  );
}
