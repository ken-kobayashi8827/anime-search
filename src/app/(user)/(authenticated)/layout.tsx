import { Grid, GridItem } from '@chakra-ui/react';
import { getUser } from '@/utils/supabase/auth';
import { fetchProfile } from '@/utils/supabase/actions';
import Header from '@/app/components/Header';

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
      templateAreas={`"header"
                  "main"
                  `}
      gridTemplateRows={'100px'}
      gridTemplateColumns={'1fr'}
      minH='100vh'
    >
      <GridItem
        borderBottom='2px'
        area={'header'}
        as='header'
        px='16'
        py='4'
        maxH='100px'
        placeContent='center'
      >
        <Header user={user} profileImgPath={profileImgPath} />
      </GridItem>
      <GridItem area={'main'} as='main' px='16' py='10'>
        {children}
      </GridItem>
    </Grid>
  );
}
