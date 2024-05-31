import { Avatar, Box, HStack, Link } from '@chakra-ui/react';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import NextLink from 'next/link';
import { getIsAdmin } from '@/utils/supabase/auth';
import { fetchProfile } from '@/utils/supabase/actions';
import { PROFILE_NO_IMG_PATH } from '@/utils/utils';

export default async function Header() {
  const isAdmin = await getIsAdmin();
  const profile = await fetchProfile();

  return (
    <HStack spacing={4} justifyContent='space-between'>
      <Box>
        <Link
          as={NextLink}
          p={2}
          href={'/'}
          fontSize={'xl'}
          fontWeight='bold'
          _hover={{
            opacity: '0.8',
          }}
        >
          あにめさ～ち
        </Link>
      </Box>
      <HStack spacing='4'>
        {profile && !isAdmin ? (
          <>
            <Link href='/mypage'>
              <Avatar
                size='md'
                name='プロフィール画像'
                src={
                  profile?.profile_image
                    ? profile.profile_image
                    : PROFILE_NO_IMG_PATH
                }
                showBorder
              />
            </Link>
            <LogoutButton redirectUrl='/login' />
          </>
        ) : (
          <LoginButton redirectUrl='/login' />
        )}
      </HStack>
    </HStack>
  );
}
