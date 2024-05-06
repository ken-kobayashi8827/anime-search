import LinkButton from '@/app/components/LinkButton';
import { fetchProfile } from '@/utils/supabase/actions';
import { Box, Image, Text, VStack } from '@chakra-ui/react';

export default async function MyPage() {
  const profile = await fetchProfile();
  const PROFILE_IMAGE: string = profile?.profile_image
    ? profile.profile_image
    : '/img/default.png';

  return (
    <Box w='100%' pt='10' maxWidth='lg'>
      <Text fontSize='3xl' fontWeight='bold' mb='3' textAlign='center'>
        マイページ
      </Text>
      <Text>ユーザー名:{profile?.username}</Text>
      <VStack alignItems='flex-start'>
        <Text>プロフィール画像</Text>
        <Image
          src={PROFILE_IMAGE}
          alt='プロフィール画像'
          w='40px'
          h='40px'
          borderRadius='50%'
        />
      </VStack>
      <LinkButton
        link='/mypage/edit'
        colorScheme='blue'
        w='100%'
        mt='3'
        text='編集'
      />
    </Box>
  );
}
