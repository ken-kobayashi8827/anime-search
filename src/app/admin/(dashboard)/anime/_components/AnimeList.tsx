import { getAnimeStatusName, convertSeasonName } from '@/utils/utils';
import LinkButton from '@/app/components/LinkButton';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import AnimeImage from './AnimeImage';
import { fetchFilteredAnimeList } from '@/utils/supabase/admin/actions';

type Props = {
  query: string;
  currentPage: number;
};

export default async function AnimeList({ query, currentPage }: Props) {
  const animes = await fetchFilteredAnimeList(query, currentPage);

  return (
    <TableContainer maxWidth='100%' whiteSpace='normal'>
      <Table variant='striped' colorScheme='gray' size='md'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>画像</Th>
            <Th>アニメタイトル</Th>
            <Th>ステータス</Th>
            <Th>クール</Th>
            <Th>VOD</Th>
            <Th>作成日</Th>
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
                  width='100px'
                />
              </Td>
              <Td>{anime.title}</Td>
              <Td>{getAnimeStatusName(anime.status)}</Td>
              <Td>{convertSeasonName(anime.season_name)}</Td>
              <Td>{anime.vod}</Td>
              <Td>{new Date(anime.created_at).toLocaleString()}</Td>
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
