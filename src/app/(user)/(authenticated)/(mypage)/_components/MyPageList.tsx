'use client';

import { FormImage } from '@/app/components/FormImage';
import LinkButton from '@/app/components/LinkButton';
import { ProfileType } from '@/types/types';
import { PROFILE_NO_IMG_PATH } from '@/utils/utils';
import { VStack, Heading, Input, Stack } from '@chakra-ui/react';

type Props = {
  profile: ProfileType;
};

export default function MyPageList({ profile }: Props) {
  return (
    <VStack alignItems='flex-start'>
      <Heading size='md' mb='2'>
        ユーザー名
      </Heading>
      <Input type='text' disabled defaultValue={profile.username} mb='2' />
      <Heading size='md'>プロフィール画像</Heading>
      <FormImage
        label=''
        type='file'
        previewImgPath={
          profile.profile_image ? profile.profile_image : PROFILE_NO_IMG_PATH
        }
      />
      <Stack w='100%' align='center'>
        <LinkButton
          link='/mypage/edit'
          colorScheme='blue'
          width='40%'
          mt='2'
          text='編集'
        />
      </Stack>
    </VStack>
  );
}
