import { Grid, GridItem } from '@chakra-ui/react';
import Header from '@/app/components/Header';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <Header />
      </GridItem>
      <GridItem area={'main'} as='main' px='16' py='10'>
        {children}
      </GridItem>
    </Grid>
  );
}
