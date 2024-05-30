'use client';

import { Button, VStack, Text } from '@chakra-ui/react';
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
    <VStack>
      <Text fontSize='xl' fontWeight='bold' mb='4'>
        エラーが発生しました
      </Text>
      <Button colorScheme='blue' w='100px' onClick={() => reset()}>
        戻る
      </Button>
    </VStack>
  );
}
