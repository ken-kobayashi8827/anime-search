'use client';

import { Box, Button, Link, Stack, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ImportExportOutlinedIcon from '@mui/icons-material/ImportExportOutlined';
import LogoutButton from '@/app/components/LogoutButton';
import { usePathname } from 'next/navigation';

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
    pageName: 'ユーザーリスト',
    path: '/admin/users',
    icon: <PermIdentityOutlinedIcon />,
  },
  {
    pageName: 'アニメリスト',
    path: '/admin/anime',
    icon: <SearchOutlinedIcon />,
  },
  {
    pageName: 'インポート',
    path: '/admin/anime/import',
    icon: <ImportExportOutlinedIcon />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <VStack h='100%' justify='space-between'>
      <VStack spacing='4' w='100%'>
        {navigations.map((navigation) => (
          <Link
            key={navigation.pageName}
            as={NextLink}
            href={navigation.path}
            bgColor={pathname === navigation.path ? 'gray.800' : 'gray.600'}
            borderRadius='0'
            color='white'
            display='flex'
            justifyContent='center'
            alignItems='center'
            gap='2'
            h='50px'
            w='100%'
            _hover={{
              bgColor: 'gray.800',
            }}
          >
            {navigation.icon}
            {navigation.pageName}
          </Link>
        ))}
      </VStack>
      <LogoutButton
        redirectUrl='/admin/login'
        colorScheme='red'
        variant='solid'
        width='80%'
        hover={{ opacity: '0.8' }}
      />
    </VStack>
  );
}
