'use client';

import { Link } from '@chakra-ui/next-js';
import { Box, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ImportExportOutlinedIcon from '@mui/icons-material/ImportExportOutlined';

type Navigation = {
  pageName: string;
  path: string;
  icon: JSX.Element;
};

const navigations: Navigation[] = [
  {
    pageName: 'ホーム',
    path: '/admin',
    icon: <HomeOutlinedIcon />,
  },
  {
    pageName: 'ユーザー一覧',
    path: '/admin/users',
    icon: <PermIdentityOutlinedIcon />,
  },
  {
    pageName: 'アニメ一覧',
    path: '/admin/anime',
    icon: <SearchOutlinedIcon />,
  },
  {
    pageName: 'アニメ取得',
    path: '/admin/anime/import',
    icon: <ImportExportOutlinedIcon />,
  },
];

export default function Sidebar() {
  return (
    <VStack
      spacing={4}
      backgroundColor={'gray.600'}
      py={4}
      minH='100vh'
      minW='12%'
      as='nav'
    >
      {navigations.map((navigation) => (
        <Box key={navigation.pageName} w='100%'>
          <Link
            as={NextLink}
            href={navigation.path}
            py='3'
            px='3'
            color='white'
            display='flex'
            justifyContent='center'
            alignItems='center'
            gap='2'
            _hover={{
              textDecoration: 'none',
              bgColor: 'gray.700',
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
