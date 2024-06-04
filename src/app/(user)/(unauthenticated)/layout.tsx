import { Box } from '@chakra-ui/react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box as='main' px='5'>
      {children}
    </Box>
  );
}
