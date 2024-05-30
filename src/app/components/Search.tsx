'use client';

import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [prevPage, setPrevPage] = useState<string>('1');

  // 500ミリ秒経過したら実行
  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      if (e.target.value) {
        // 1ページ目でなければpageを保持
        if (params.has('page') && params.get('page') !== '1') {
          setPrevPage(params.get('page') || '1');
        }

        params.set('page', '1');
        params.set('title', e.target.value);
      } else {
        params.delete('title');
        if (params.has('page') && prevPage !== '1') {
          params.set('page', prevPage);
        }
      }
      replace(`${pathname}?${params.toString()}`);
    },
    500
  );

  return (
    <InputGroup w='50%'>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon />
      </InputLeftElement>
      <Input
        variant='outline'
        placeholder='アニメタイトル入力...'
        onChange={handleSearch}
        defaultValue={searchParams.get('title')?.toString()}
      />
    </InputGroup>
  );
}
