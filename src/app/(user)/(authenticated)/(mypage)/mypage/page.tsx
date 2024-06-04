import MyPageList from '../_components/MyPageList';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import FavoriteAnimeCardList from '../_components/FavoriteAnimeCardList';
import Pagination from '@/app/components/Pagination';
import { Suspense } from 'react';
import { FavoriteAnimeCardListSkeleton } from '@/app/components/Skeletons';
import { fetchProfile } from '@/data/profile';
import { fetchFavoriteAnimeListPage } from '@/data/favorite';

type SearchParamsType = {
  searchParams?: {
    page?: string;
  };
};

export default async function MyPage({ searchParams }: SearchParamsType) {
  const profile = await fetchProfile();
  if (!profile) {
    throw new Error();
  }
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchFavoriteAnimeListPage();

  return (
    <Tabs isFitted variant='enclosed'>
      <TabList mb='1em'>
        <Tab>プロフィール</Tab>
        <Tab>お気に入りアニメ</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <MyPageList profile={profile} />
        </TabPanel>
        <TabPanel>
          <Suspense fallback={<FavoriteAnimeCardListSkeleton />}>
            <FavoriteAnimeCardList currentPage={currentPage} />
          </Suspense>
          <Pagination totalPages={totalPages} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
