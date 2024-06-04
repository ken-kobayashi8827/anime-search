import { Box, HStack, Image, Link } from '@chakra-ui/react';
import LogoutButton from '../../components/LogoutButton';
import LoginButton from '../../components/LoginButton';
import NextLink from 'next/link';
import { PROFILE_NO_IMG_PATH } from '@/utils/utils';
import { ProfileType } from '@/types/types';

type Props = {
  profile: ProfileType | null;
  isAdmin?: boolean;
};

export default async function Header({ profile, isAdmin }: Props) {
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
            <Link href='/mypage' as={NextLink}>
              <Box w='50px'>
                <Image
                  borderRadius='full'
                  alt='プロフィール画像'
                  boxSize='50px'
                  src={
                    profile?.profile_image
                      ? profile.profile_image
                      : PROFILE_NO_IMG_PATH
                  }
                />
              </Box>
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
