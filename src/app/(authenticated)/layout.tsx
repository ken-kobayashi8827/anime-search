import { Box, HStack } from '@chakra-ui/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { getUser } from '@/utils/supabase/auth';
import { fetchProfile } from '@/utils/supabase/actions';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  let profileImgPath = '';
  if (user) {
    const profile = await fetchProfile();
    profileImgPath = profile.profile_image;
  }

  return (
    <>
      <Header user={user} profileImgPath={profileImgPath} />
      <HStack alignItems='flex-start'>
        <Sidebar />
        <Box flex='1' as='main' p='4'>
          {children}
        </Box>
      </HStack>
    </>
  );
}
