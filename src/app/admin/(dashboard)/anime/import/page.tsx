'use client';

import { insertAnimeData } from '@/utils/supabase/admin/actions';
import { Button, Heading, Text, useToast, VStack } from '@chakra-ui/react';

export default function AnimeList() {
  const toast = useToast();

  const handleClick = async () => {
    const res = await fetch('/api/anime');
    const animeData = await res.json();
    toast.promise(insertAnimeData(animeData), {
      success: { title: 'Promise resolved', description: 'Looks great' },
      error: { title: 'Promise rejected', description: 'Something wrong' },
      loading: { title: 'Promise pending', description: 'Please wait' },
    });
  };

  return (
    <VStack>
      <Heading fontSize='3xl' fontWeight='bold' mb='5'>
        アニメデータ取得
      </Heading>
      <Text mb='5' textAlign='center'>
        Annict APIを使用してアニメデータを取得します。
      </Text>
      <Button colorScheme='blue' onClick={handleClick}>
        インポート
      </Button>
    </VStack>
  );
}
