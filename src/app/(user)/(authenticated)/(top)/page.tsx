import { HStack, Stack } from '@chakra-ui/react';
import Pagination from '@/app/components/Pagination';
import Search from '@/app/components/Search';
import { fetchPublicAnimeListPage } from '@/utils/supabase/actions';
import { fetchVodLists } from '@/utils/supabase/admin/actions';
import VodFilter from '@/app/components/VodFilter';
import AnimeCardList from './_components/AnimeCardList';

type SearchParamsType = {
  searchParams?: {
    title?: string;
    vod?: string;
    sortBy?: string;
    order?: string;
    page?: string;
  };
};

export default async function Home({ searchParams }: SearchParamsType) {
  const title = searchParams?.title || '';
  const vodId = Number(searchParams?.vod) || null;
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPublicAnimeListPage(title, vodId);
  const vodLists = await fetchVodLists();

  return (
    <Stack>
      <HStack align='center' justify='center' w='100%' mb='6'>
        <Search />
      </HStack>
      <VodFilter vodLists={vodLists} vodId={vodId} />
      <AnimeCardList title={title} vodId={vodId} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </Stack>
  );
}
