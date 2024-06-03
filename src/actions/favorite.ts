'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/data/auth';

/**
 * お気に入りボタン
 * @param animeId
 * @returns
 */
export async function updateFavorite(animeId: number) {
  const supabase = createClient();
  const user = await getUser();
  if (!user) {
    throw new Error();
  }

  // 既にお気に入り済みかチェック
  const { data, error } = await supabase
    .from('favorites')
    .select()
    .eq('user_id', user.id)
    .eq('anime_id', animeId);

  if (error) {
    throw new Error();
  }

  if (data.length > 0) {
    // お気に入り解除
    const result = await deleteFavorites(user.id, animeId);
    if (!result) {
      revalidatePath('/', 'layout');
      return;
    }
  } else {
    // お気に入り登録
    const result = await createFavorites(user.id, animeId);
    if (!result) {
      revalidatePath('/', 'layout');
      return;
    }
  }

  revalidatePath('/', 'layout');
}

/**
 * お気に入り登録
 * @param userId
 * @param animeId
 * @returns
 */
async function createFavorites(userId: string, animeId: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, anime_id: animeId });
  if (error) {
    throw new Error();
  }

  return error;
}

/**
 * お気に入り解除
 * @param userId
 * @param animeId
 * @returns
 */
async function deleteFavorites(userId: string, animeId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('anime_id', animeId)
    .select();
  if (error) {
    throw new Error();
  }

  return error;
}
