import { Spinner, Stack } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Stack justify='center' align='center' h='100%'>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Stack>
  );
}
