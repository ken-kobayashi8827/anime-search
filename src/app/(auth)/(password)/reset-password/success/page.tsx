'use client';

import { Box, Flex, Text } from '@chakra-ui/react';

export default function Success() {
  return (
    <Flex
      minH='100vh'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Box w='100%' pt='10'>
        <Text fontSize='3xl' fontWeight='bold' mb='3' textAlign='center'>
          メール送信完了
        </Text>
        <Text align='center'>
          パスワードリセットに関するメールを送信致しました。
          <br />
          メールをご確認ください。
        </Text>
      </Box>
    </Flex>
  );
}
