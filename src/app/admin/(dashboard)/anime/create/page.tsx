import { fetchVodLists } from '@/utils/supabase/admin/actions';
import AnimeCreateForm from '../_components/AnimeCreateForm';

export default async function page() {
  const vodLists = await fetchVodLists();
  return <AnimeCreateForm vodLists={vodLists} />;
}
