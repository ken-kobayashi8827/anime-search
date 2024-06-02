import { Box, Grid, GridItem } from '@chakra-ui/react';
import Header from '@/app/(user)/_components/Header';
import HamburgerMenu from '../_components/Drawer';
import { getIsAdmin } from '@/utils/supabase/auth';
import { fetchProfile } from '@/utils/supabase/actions';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await getIsAdmin();
  const profile = await fetchProfile();

  return (
    <Grid
      templateAreas={`"header"
                  "main"
                  `}
      gridTemplateRows={{ base: '80px', md: '100px' }}
      gridTemplateColumns={'1fr'}
      minH='100vh'
    >
      <GridItem
        borderBottom={{ base: '1px', md: '2px' }}
        area={'header'}
        as='header'
        px={{ base: '5', md: '16' }}
        py={{ md: '4' }}
        maxH={{ md: '100px' }}
        placeContent='center'
      >
        <Box display={{ base: 'none', md: 'block' }}>
          <Header profile={profile} isAdmin={isAdmin} />
        </Box>
        <Box display={{ base: 'block', md: 'none' }}>
          <HamburgerMenu profile={profile} isAdmin={isAdmin} />
        </Box>
      </GridItem>
      <GridItem
        area={'main'}
        as='main'
        px={{ base: '5', md: '16' }}
        py={{ base: '8', md: '10' }}
      >
        {children}
      </GridItem>
    </Grid>
  );
}
