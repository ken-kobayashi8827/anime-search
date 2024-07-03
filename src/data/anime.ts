'use server';

import { createClient } from '@/utils/supabase/server';
import { getFilterSeason, STATUS_PUBLIC } from '@/utils/utils';

// 1ページで取得する件数
const ITEMS_PER_PAGE = 20;

/**
 * 公開済みアニメのページ数を取得
 * @param title
 * @param vodId
 * @returns
 */
export async function fetchPublicAnimeListPage(
  title: string,
  vodId: number | null
) {
  const filterSeason = getFilterSeason();

  const supabase = createClient();

  if (vodId) {
    const { count: vodAnimeCount, error: vodAnimeCountError } = await supabase
      .from('animes')
      .select('*, animes_vods!inner(vod_id)', {count: 'exact', head: true})
      .eq('season_name', filterSeason)
      .eq('status', STATUS_PUBLIC)
      .eq('animes_vods.vod_id', vodId)

    const totalPages = Math.ceil(Number(vodAnimeCount) / ITEMS_PER_PAGE);
    return totalPages;
  }

  const { count, error } = await supabase
    .from('animes')
    .select('*', {
      count: 'exact',
      head: true,
    })
    .eq('season_name', filterSeason)
    .eq('status', STATUS_PUBLIC)
    .like('title', `%${title}%`);

  if (error) {
    throw new Error(error.message);
  }
  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

/**
 * 公開済みアニメ一覧取得
 * @param title
 * @param vodId
 * @param currentPage
 * @param sortBy
 * @param order
 * @returns
 */
export async function fetchFilteredAnimeList(
  title: string,
  vodId: number | null,
  currentPage: number,
  sortBy?: string,
  order?: string
) {
  const filterSeason = getFilterSeason();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const endOffset = offset + ITEMS_PER_PAGE - 1;

  const supabase = createClient();
  let fetchQuery = supabase
    .from('animes')
    .select('*, vods(id, name)')
    .eq('status', STATUS_PUBLIC)
    .eq('season_name', filterSeason)
    .like('title', `%${title}%`)
    .range(offset, endOffset);

  if (vodId) {
    fetchQuery = supabase
      .from('animes')
      .select('*, animes_vods!inner(vod_id), vods(id, name)')
      .eq('season_name', filterSeason)
      .eq('animes_vods.vod_id', vodId)
      .like('title', `%${title}%`)
      .range(offset, endOffset);
  }

  if (sortBy) {
    fetchQuery = fetchQuery.order(sortBy, { ascending: order === 'asc' });
  }

  if (sortBy !== 'id') {
    fetchQuery = fetchQuery.order('id', { ascending: true });
  }

  const { data, error } = await fetchQuery;
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * アニメ一覧のページ数を取得
 * @param title
 * @param vodId
 * @returns
 */
export async function fetchAnimeListPage(title: string, vodId: number | null) {
  const filterSeason = getFilterSeason();

  const supabase = createClient();
  if (vodId) {
    const { count: vodAnimeCount, error: vodAnimeCountError } = await supabase
      .from('animes')
      .select('*, animes_vods!inner(vod_id)', {count: 'exact', head: true})
      .eq('season_name', filterSeason)
      .eq('status', STATUS_PUBLIC)
      .eq('animes_vods.vod_id', vodId)

    if (vodAnimeCountError) {
      throw new Error(vodAnimeCountError.message);
    }

    const totalPages = Math.ceil(Number(vodAnimeCount) / ITEMS_PER_PAGE);
    return totalPages;
  }

  const { count, error } = await supabase
    .from('animes')
    .select('*', {
      count: 'exact',
      head: true,
    })
    .eq('season_name', filterSeason)
    .like('title', `%${title}%`);

  if (error) {
    throw new Error(error.message);
  }
  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

/**
 * アニメ一覧取得
 * @param title
 * @param vodId
 * @param currentPage
 * @param sortBy
 * @param order
 * @returns
 */
export async function fetchFilteredAdminAnimeList(
  title: string,
  vodId: number | null,
  currentPage: number,
  sortBy?: string,
  order?: string
) {
  const filterSeason = getFilterSeason();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const endOffset = offset + ITEMS_PER_PAGE - 1;

  const supabase = createClient();
  let fetchQuery = supabase
    .from('animes')
    .select('*, vods(id, name)')
    .eq('season_name', filterSeason)
    .like('title', `%${title}%`)
    .range(offset, endOffset);

  if (vodId) {
    fetchQuery = supabase
      .from('animes')
      .select('*, animes_vods!inner(vod_id), vods(id, name)')
      .eq('season_name', filterSeason)
      .eq('animes_vods.vod_id', vodId)
      .like('title', `%${title}%`)
      .range(offset, endOffset);
  }

  if (sortBy) {
    fetchQuery = fetchQuery.order(sortBy, { ascending: order === 'asc' });
  }

  if (sortBy !== 'id') {
    fetchQuery = fetchQuery.order('id', { ascending: true });
  }

  const { data, error } = await fetchQuery;
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * IDからアニメデータ取得
 * @param animeId
 * @returns
 */
export async function fetchAnimeByAnimeId(animeId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('animes')
    .select('*, vods(id, name)')
    .eq('id', animeId)
    .limit(1)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
