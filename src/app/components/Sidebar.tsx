'use client';

import { Link } from '@chakra-ui/next-js';
import { Box, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

type Navigation = {
  pageName: string;
  path: string;
  icon: JSX.Element;
};

const navigations: Navigation[] = [
  {
    pageName: 'ホーム',
    path: '/',
    icon: <HomeOutlinedIcon />,
  },
  {
    pageName: 'マイページ',
    path: '/mypage',
    icon: <PermIdentityOutlinedIcon />,
  },
];

export default function Sidebar() {
  return (
    <VStack spacing={4} py={4}>
      {navigations.map((navigation) => (
        <Box key={navigation.pageName} w='100%'>
          <Link
            as={NextLink}
            href={navigation.path}
            py='3'
            color='black'
            display='flex'
            justifyContent='center'
            alignItems='center'
            gap='2'
            _hover={{
              bgColor: 'black',
              color: 'white',
            }}
          >
            {navigation.icon}
            {navigation.pageName}
          </Link>
        </Box>
      ))}
    </VStack>
  );
}
