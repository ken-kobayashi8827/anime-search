import { Avatar, Box, HStack, Link } from '@chakra-ui/react';
import LogoutButton from './LogoutButton';
import { User } from '@supabase/supabase-js';
import LoginButton from './LoginButton';

type Props = {
  user?:
    | {
        user: User;
      }
    | undefined;
  profileImgPath?: string;
};

export default async function Header({ user, profileImgPath }: Props) {
  return (
    <HStack spacing={4} justifyContent='space-between'>
      <Box>
        <Link p={2} href={'#'} fontSize={'sm'} fontWeight={500}>
          ロゴ
        </Link>
      </Box>
      <HStack spacing='4'>
        {user ? (
          <>
            <Link href='/mypage'>
              <Avatar
                size='md'
                name='プロフィール画像'
                src={profileImgPath}
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
