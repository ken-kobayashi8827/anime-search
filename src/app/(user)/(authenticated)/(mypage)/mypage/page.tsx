import LinkButton from '@/app/components/LinkButton';
import { fetchProfile } from '@/utils/supabase/actions';
import { Avatar, Box, Text, HStack } from '@chakra-ui/react';

export default async function MyPage() {
  const profile = await fetchProfile();
  const PROFILE_IMAGE: string = profile?.profile_image
    ? profile.profile_image
    : '/img/default.png';

  return (
    <Box w='100%'>
      <Text fontSize='2xl' fontWeight='bold' mb='3' textAlign='center'>
        マイページ
      </Text>
      <HStack alignItems='center'>
        <Avatar size='lg' src={PROFILE_IMAGE} />
        <Text>{profile?.username}</Text>
      </HStack>
      <LinkButton
        link='/mypage/edit'
        colorScheme='blue'
        width='10%'
        mt='3'
        text='編集'
      />
    </Box>
  );
}
