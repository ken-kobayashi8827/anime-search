import NextLink from 'next/link';
import { Flex, Heading, Link, Text, VStack } from '@chakra-ui/react';

export default function Home() {
  return (
    <Flex h='100%' justify='center' align='center'>
      <VStack
        justify='center'
        align='center'
        border='1px'
        boxShadow='md'
        maxW='4xl'
        p='10'
      >
        <Heading size='lg' mb='2'>
          管理者ページへようこそ！
        </Heading>
        <Text mb='4'>
          管理者ページでは、サイト全体の管理および運営を行うための機能を提供しています。
          <br />
          以下の機能を活用して、サイトを管理してください。
        </Text>
        <VStack align='flex-start' gap='4' w='100%'>
          <VStack align='flex-start'>
            <Heading size='sm'>ユーザー管理</Heading>
            <Text>ユーザーの登録情報の確認、編集ができます。</Text>
          </VStack>
          <VStack align='flex-start'>
            <Heading size='sm'>アニメ管理</Heading>
            <Text>アニメの登録情報の確認、編集、削除ができます。</Text>
          </VStack>
          <VStack align='flex-start'>
            <Heading size='sm'>アニメデータインポート</Heading>
            <Text>
              <Link
                as={NextLink}
                href='https://developers.annict.com/docs'
                isExternal
                color='blue.400'
              >
                Annict API
              </Link>
              を使用して、今季アニメデータを取得できます。
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </Flex>
  );
}
