import LogoutButton from '@/app/components/LogoutButton';
import { HStack, Box, Link } from '@chakra-ui/react';

export default function Header() {
  return (
    <HStack
      spacing={4}
      justifyContent='space-between'
      backgroundColor={'gray.700'}
      p={4}
      as='header'
    >
      <Box>
        <Link p={2} color={'white'} href={'#'} fontSize={'sm'} fontWeight={500}>
          ロゴ
        </Link>
      </Box>
      <LogoutButton
        redirectUrl='/admin/login'
        colorScheme='red'
        variant='solid'
        hover={{ opacity: '0.8' }}
      />
    </HStack>
  );
}
