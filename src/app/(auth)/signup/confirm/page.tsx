'use client';

import { Link } from '@chakra-ui/next-js';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

export default function Confirm() {
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
          メールアドレス認証用のメールを送信しました。
          <br />
          ご登録のメールアドレスを確認し、メール内のリンクをクリックして認証を完了してください。
          <br />
          もし数分経ってもメールが届かない場合は、迷惑メールフォルダーやスパムフォルダーをご確認いただくか、再度送信してください。
          <br />
          認証が完了するまでアカウントにアクセスできない場合がありますので、ご了承ください。
        </Text>
        <Flex justifyContent='center' mt='5'>
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
