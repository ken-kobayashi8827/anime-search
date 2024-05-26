'use client';

import { getAnimeStatusName, convertSeasonName } from '@/utils/utils';
import LinkButton from '@/app/components/LinkButton';
import {
  HStack,
  Table,
  Text,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import AnimeImage from '../../../../components/AnimeImage';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { AnimeType } from '@/types/types';
import VodTagList from './VodTagList';

type Props = {
  animes: AnimeType[] | undefined;
};

export default function AnimeListTable({ animes }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleSort = (key: string) => {
    if (key) {
      params.set('sortBy', key);

      if (params.has('order')) {
        const currentOrder = params.get('order');
        params.set('order', currentOrder === 'asc' ? 'desc' : 'asc');
      } else {
        params.set('order', 'desc');
      }
    } else {
      params.delete('sortBy');
      params.delete('order');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <TableContainer maxWidth='100%' whiteSpace='normal'>
      <Table variant='striped' colorScheme='gray' size='md'>
        <Thead>
          <Tr>
            <Th cursor='pointer' onClick={() => handleSort('id')}>
              <HStack>
                <Text>ID</Text>
                {params.get('order') === 'desc' &&
                params.get('sortBy') === 'id' ? (
                  <ChevronUpIcon />
                ) : (
                  <ChevronDownIcon />
                )}
              </HStack>
            </Th>
            <Th>画像</Th>
            <Th>アニメタイトル</Th>
            <Th
              cursor='pointer'
              onClick={() => handleSort('status')}
              whiteSpace='nowrap'
            >
              <HStack>
                <Text>ステータス</Text>
                {params.get('order') === 'desc' &&
                params.get('sortBy') === 'status' ? (
                  <ChevronUpIcon />
                ) : (
                  <ChevronDownIcon />
                )}
              </HStack>
            </Th>
            <Th>クール</Th>
            <Th>VOD</Th>
            <Th cursor='pointer' onClick={() => handleSort('created_at')}>
              <HStack>
                <Text>作成日</Text>
                {params.get('order') === 'desc' &&
                params.get('sortBy') === 'created_at' ? (
                  <ChevronUpIcon />
                ) : (
                  <ChevronDownIcon />
                )}
              </HStack>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {animes!.map((anime) => (
            <Tr key={anime.id}>
              <Td>{anime.id}</Td>
              <Td>
                <AnimeImage
                  src={anime.images ? anime.images : '/img/no-image01.png'}
                  alt={anime.title}
                  height='100px'
                  width='200px'
                />
              </Td>
              <Td>{anime.title}</Td>
              <Td>{getAnimeStatusName(anime.status)}</Td>
              <Td whiteSpace='nowrap'>
                {convertSeasonName(anime.season_name)}
              </Td>
              <Td>{anime.vods && <VodTagList vodData={anime.vods} />}</Td>
              <Td>{new Date(anime.created_at).toLocaleString('ja-JP')}</Td>
              <Td>
                <LinkButton
                  link={`/admin/anime/${anime.id}`}
                  colorScheme='blue'
                  width='100%'
                  text='編集'
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
