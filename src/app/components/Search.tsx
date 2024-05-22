'use client';

import { SearchIcon } from '@chakra-ui/icons';
import { HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 500ミリ秒経過したら実行
  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      if (e.target.value) {
        params.set('query', e.target.value);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    },
    500
  );

  return (
    <HStack align='center' justify='center' mb='8'>
      <InputGroup w='50%'>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon />
        </InputLeftElement>
        <Input
          variant='outline'
          placeholder='アニメタイトル入力'
          onChange={handleSearch}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </InputGroup>
    </HStack>
  );
}
