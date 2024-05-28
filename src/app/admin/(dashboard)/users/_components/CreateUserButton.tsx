'use client';

import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function CreateUserButton() {
  return (
    <Button
      leftIcon={<AddIcon />}
      as={NextLink}
      href='/admin/users/create'
      w='150px'
      colorScheme='blue'
    >
      ユーザー作成
    </Button>
  );
}
