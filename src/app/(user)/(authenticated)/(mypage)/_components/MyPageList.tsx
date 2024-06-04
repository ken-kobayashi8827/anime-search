'use client';

import { ProfileType } from '@/types/types';
import { PROFILE_NO_IMG_PATH } from '@/utils/utils';
import { VStack, Heading, Input, Image, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

type Props = {
  profile: ProfileType;
};

export default function MyPageList({ profile }: Props) {
  return (
    <VStack alignItems='flex-start' maxW={{ lg: 'lg' }}>
      <Heading size='md' mb='2'>
        ユーザー名
      </Heading>
      <Input type='text' disabled defaultValue={profile.username} mb='2' />
      <Heading size='md'>プロフィール画像</Heading>
      <Image
        borderRadius='full'
        alt='プロフィール画像'
        boxSize='80px'
        src={
          profile.profile_image ? profile.profile_image : PROFILE_NO_IMG_PATH
        }
      />
      <Button
        as={NextLink}
        href='/mypage/edit'
        w={{ base: '100%', lg: '200px' }}
        colorScheme='blue'
        mt='2'
      >
        編集
      </Button>
    </VStack>
  );
}
