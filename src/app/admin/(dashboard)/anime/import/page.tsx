'use client';

import { insertAnimeData } from '@/actions/anime';
import { Button, Heading, Text, useToast, VStack } from '@chakra-ui/react';
import { useState } from 'react';

export default function AnimeList() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
    const res = await fetch('/api/anime');
    const animeData = await res.json();
    toast.promise(insertAnimeData(animeData), {
      success: { title: 'アニメ取得に成功しました' },
      error: { title: 'アニメ取得に失敗しました' },
      loading: { title: 'アニメ取得中' },
    });
    setIsLoading(false);
  };

  return (
    <VStack>
      <Heading fontSize='3xl' fontWeight='bold' mb='5'>
        アニメデータ取得
      </Heading>
      <Text mb='5' textAlign='center'>
        Annict APIを使用してアニメデータを取得します。
      </Text>
      <Button
        colorScheme='blue'
        onClick={handleClick}
        isLoading={isLoading}
        loadingText='インポート中'
      >
        インポート
      </Button>
    </VStack>
  );
}
