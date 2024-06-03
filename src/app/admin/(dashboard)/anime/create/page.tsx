import { fetchVodLists } from '@/data/vod';
import AnimeCreateForm from '../_components/AnimeCreateForm';

export default async function page() {
  const vodLists = await fetchVodLists();
  return <AnimeCreateForm vodLists={vodLists} />;
}
