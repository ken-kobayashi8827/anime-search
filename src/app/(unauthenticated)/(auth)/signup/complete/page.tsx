'use client';

import { Link } from '@chakra-ui/next-js';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

export default function Complete() {
  return (
    <Flex
      minH='100vh'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Box w='100%' pt='10'>
        <Text fontSize='3xl' fontWeight='bold' mb='3' textAlign='center'>
          アカウント登録完了
        </Text>
        <Text align='center'>
          アカウントの登録が完了しました。
          <br />
          プロフィールの設定を変更する場合は[マイページ]ボタンをクリックしてください。
        </Text>
        <Flex justifyContent='center' mt='5'>
          <Link href='/mypage'>
            <Button w='100' mt='3' mr='3' colorScheme='teal'>
              マイページ
            </Button>
          </Link>
          <Link href='/'>
            <Button w='100%' mt='3'>
              トップページに戻る
            </Button>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
}
