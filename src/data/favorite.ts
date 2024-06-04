'use server';

import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/data/auth';
import { STATUS_PUBLIC } from '@/utils/utils';

// 1ページで取得する件数
const ITEMS_PER_PAGE = 20;

/**
 * ユーザーのお気に入りしたアニメIDを取得
 * @returns
 */
export async function getFavoriteList() {
  const supabase = createClient();
  const user = await getUser();

  if (user) {
    const { data, error } = await supabase
      .from('favorites')
      .select('anime_id')
      .eq('user_id', user.id);

    if (error) {
      throw new Error(error.message);
    }

    const favoriteIds = data.map((item) => item.anime_id);

    return favoriteIds;
  }

  return [];
}

/**
 * ユーザーのお気に入りしたアニメを取得
 * @param currentPage
 * @returns
 */
export async function getFavoriteAnimeList(currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const endOffset = offset + ITEMS_PER_PAGE - 1;
  const supabase = createClient();
  const user = await getUser();

  if (user) {
    const { data, error } = await supabase
      .from('animes')
      .select('*, vods(id, name), favorites!inner()')
      .eq('favorites.user_id', user.id)
      .range(offset, endOffset);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  return [];
}

/**
 * お気に入り一覧のページ数を取得
 * @returns
 */
export async function fetchFavoriteAnimeListPage() {
  const supabase = createClient();
  const user = await getUser();

  if (user) {
    const { count, error } = await supabase
      .from('animes')
      .select('*, favorites!inner()', {
        count: 'exact',
        head: true,
      })
      .eq('favorites.user_id', user.id)
      .eq('status', STATUS_PUBLIC);

    if (error) {
      throw new Error(error.message);
    }
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  }
}
