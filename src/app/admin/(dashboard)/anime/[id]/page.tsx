import { fetchVodLists } from '@/data/vod';
import AnimeEditForm from '../_components/AnimeEditForm';
import { fetchAnimeByAnimeId } from '@/data/anime';

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
