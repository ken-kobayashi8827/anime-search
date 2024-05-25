import { Box, Grid, GridItem, HStack } from '@chakra-ui/react';
import { getUser } from '@/utils/supabase/auth';
import { fetchProfile } from '@/utils/supabase/actions';
import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  let profileImgPath = '';
  if (user) {
    const profile = await fetchProfile();
    if (profile.profile_image) {
      profileImgPath = profile.profile_image;
    }
  }

  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  `}
      gridTemplateRows={'auto 1fr'}
      gridTemplateColumns={'200px 1fr'}
      minH='100vh'
    >
      <GridItem borderBottom='2px' area={'header'} as='nav' px='16' py='5'>
        <Header user={user} profileImgPath={profileImgPath} />
      </GridItem>
      <GridItem borderRight='2px' area={'nav'} as='header'>
        <Sidebar />
      </GridItem>
      <GridItem area={'main'} as='main' px='16' py='10'>
        {children}
      </GridItem>
    </Grid>
  );
}
