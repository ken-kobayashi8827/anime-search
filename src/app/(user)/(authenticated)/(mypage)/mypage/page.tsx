import {
  fetchFavoriteAnimeListPage,
  fetchProfile,
} from '@/utils/supabase/actions';
import MyPageList from '../_components/MyPageList';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import FavoriteAnimeCardList from '../_components/FavoriteAnimeCardList';
import Pagination from '@/app/components/Pagination';

type SearchParamsType = {
  searchParams?: {
    page?: string;
  };
};

export default async function MyPage({ searchParams }: SearchParamsType) {
  const profile = await fetchProfile();
  if (!profile) {
    return <div>プロフィールが見つかりませんでした</div>;
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
          <FavoriteAnimeCardList currentPage={currentPage} />
          <Pagination totalPages={totalPages} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
