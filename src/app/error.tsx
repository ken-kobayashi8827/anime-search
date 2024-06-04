'use client';

import { Button, VStack, Text, Box } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <VStack justify='center' align='center' minH='100vh'>
      <Text fontSize='xl' fontWeight='bold' mb='4' textAlign='center'>
        エラーが発生しました。
        <br />
        しばらくしてからもう一度お試しください。
      </Text>
      <Button colorScheme='blue' w='100px' onClick={() => reset()}>
        戻る
      </Button>
    </VStack>
  );
}
