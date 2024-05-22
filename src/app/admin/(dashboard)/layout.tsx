import { Box, HStack } from '@chakra-ui/react';
import Header from './_components/Header';
import Sidebar from './_components/Sidebar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <HStack alignItems='stretch'>
        <Sidebar />
        <Box flex='1' as='main' p='8'>
          {children}
        </Box>
      </HStack>
    </>
  );
}
