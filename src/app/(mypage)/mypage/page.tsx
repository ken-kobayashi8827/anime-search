import LinkButton from '@/app/components/LinkButton';
import { fetchProfile } from '@/utils/supabase/actions';
import { Avatar, Box, Button, Text, HStack } from '@chakra-ui/react';

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
      <HStack alignItems='center'>
        <Avatar size='lg' alt='プロフィール画像' src={PROFILE_IMAGE} />
        <Text>{profile?.username}</Text>
      </HStack>
      <LinkButton
        link='/mypage/edit'
        colorScheme='blue'
        w='100%'
        mt='3'
        text='編集'
      />
      <Button w='100%' colorScheme='red' mt='3'>
        アカウント削除
      </Button>
    </Box>
  );
}
