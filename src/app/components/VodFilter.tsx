'use client';

import { VodListType } from '@/types/types';
import { getVodDetails } from '@/utils/utils';
import { Button, HStack } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PropsType = {
  vodLists?: VodListType[];
  vodId?: number | null;
};

export default function VodFilter({ vodLists, vodId }: PropsType) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilterVod = (vodId: number) => {
    const params = new URLSearchParams(searchParams);
    if (vodId) {
      if (params.has('vod') && Number(params.get('vod')) === vodId) {
        params.delete('vod');
        replace(`${pathname}?${params.toString()}`);
        return;
      }

      params.set('page', '1');
      params.set('vod', vodId.toString());
    } else {
      params.delete('vod');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <HStack justify='center' align='center' wrap='wrap' mb='8'>
      {vodLists &&
        vodLists.map((vod) => {
          const { color } = getVodDetails(vod.id);
          return (
            <Button
              key={vod.id}
              colorScheme={color}
              variant={vod.id === vodId ? 'solid' : 'outline'}
              onClick={() => handleFilterVod(vod.id)}
            >
              {vod.name}
            </Button>
          );
        })}
    </HStack>
  );
}
