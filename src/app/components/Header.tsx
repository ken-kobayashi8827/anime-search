import { Avatar, Box, HStack, Link } from '@chakra-ui/react';
import LogoutButton from './LogoutButton';
import LinkButton from './LinkButton';
import { User } from '@supabase/supabase-js';

type Props = {
  user:
    | {
        user: User;
      }
    | undefined;
  profileImgPath: string;
};

export default async function Header({ user, profileImgPath }: Props) {
  return (
    <HStack
      spacing={4}
      justifyContent='space-between'
      backgroundColor={'orange.200'}
      p={4}
      as='header'
    >
      <Box>
        <Link p={2} color={'white'} href={'#'} fontSize={'sm'} fontWeight={500}>
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
            <LogoutButton />
          </>
        ) : (
          <LinkButton
            link='/login'
            text='ログイン'
            colorScheme='teal'
            width='100%'
          />
        )}
      </HStack>
    </HStack>
  );
}
