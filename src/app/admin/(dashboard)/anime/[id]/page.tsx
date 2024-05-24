import {
  fetchAnimeByAnimeId,
  fetchVodLists,
} from '@/utils/supabase/admin/actions';
import AnimeEditForm from '../_components/AnimeEditForm';

export default async function AnimeEdit({
  params,
}: {
  params: { id: string };
}) {
  const animeId = params.id;
  const anime = await fetchAnimeByAnimeId(animeId);
  const vodLists = await fetchVodLists();

  return <AnimeEditForm anime={anime} vodLists={vodLists} />;
}
