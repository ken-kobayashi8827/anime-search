import { Grid, GridItem } from '@chakra-ui/react';
import Sidebar from './_components/Sidebar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Grid
      templateAreas={`
                  "nav main"
                  `}
      gridTemplateRows={'1fr'}
      gridTemplateColumns={'200px 1fr'}
      minH='100vh'
    >
      <GridItem area={'nav'} as='nav' bgColor={'gray.600'} py='8'>
        <Sidebar />
      </GridItem>
      <GridItem area={'main'} as='main' px='16' py='10'>
        {children}
      </GridItem>
    </Grid>
  );
}
