import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';
import NextLink from 'next/link';

type Props = {
  isDisabled: boolean;
  href: string;
  children: ReactNode;
};

export default function PaginationNavButton({
  isDisabled,
  href,
  children,
}: Props) {
  return isDisabled ? (
    <Button as='a' href={undefined}>
      {children}
    </Button>
  ) : (
    <Button as={NextLink} href={href} colorScheme='teal'>
      {children}
    </Button>
  );
}
