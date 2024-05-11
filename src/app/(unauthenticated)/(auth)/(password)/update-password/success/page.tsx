'use client';

import { Link } from '@chakra-ui/next-js';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

export default function Success() {
  return (
    <Flex
      minH='100vh'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Box w='100%' pt='10' maxWidth='md'>
        <Text fontSize='3xl' fontWeight='bold' mb='3' textAlign='center'>
          パスワード変更完了
        </Text>
        <Text align='center'>パスワードが変更されました。</Text>
        <Link href='/login' display='flex' justifyContent='center'>
          <Button w='60%' colorScheme='blue' mt='3'>
            ログインページへ
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}
