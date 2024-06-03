import { HStack, Stack } from '@chakra-ui/react';
import Pagination from '@/app/components/Pagination';
import Search from '@/app/components/Search';
import VodFilter from '@/app/components/VodFilter';
import AnimeCardList from './_components/AnimeCardList';
import { Suspense } from 'react';
import {
  AnimeCardListSkeleton,
  VodFilterSkeleton,
} from '@/app/components/Skeletons';
import { fetchPublicAnimeListPage } from '@/data/anime';
import { fetchVodLists } from '@/data/vod';

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
      <Suspense fallback={<VodFilterSkeleton />}>
        <VodFilter vodLists={vodLists} vodId={vodId} />
      </Suspense>
      <Suspense fallback={<AnimeCardListSkeleton />}>
        <AnimeCardList title={title} vodId={vodId} currentPage={currentPage} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </Stack>
  );
}
