'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import {
  AnimeInsertDataType,
  AnnictAnimeWorksType,
  AnnictDataArr,
  AnnictResponse,
} from '@/types/types';
import { STATUS_DELETED, STATUS_PUBLIC } from '@/utils/utils';

/**
 * Annict APIから取得したデータをinsert
 * @param animeData
 */
export async function insertAnimeData(animeData: AnnictResponse) {
  const supabase = createClient();
  // insertするデータを作成
  const insertData: AnimeInsertDataType[] = [];
  animeData.forEach((data: AnnictDataArr) => {
    data.works.forEach((work: AnnictAnimeWorksType) => {
      if (!work.no_episodes) {
        insertData.push({
          title: work.title,
          status: STATUS_PUBLIC,
          season_name: work.season_name,
          images: work.images.facebook.og_image_url,
          no_episodes: work.no_episodes,
          episodes_count: work.episodes_count,
          twitter_username: work.twitter_username,
          twitter_hashtag: work.twitter_hashtag,
        });
      }
    });
  });

  // titleカラムのデータが重複していたらupdate / それ以外はinsert
  const { error } = await supabase
    .from('animes')
    .upsert(insertData, { onConflict: 'title' });

  if (error) {
    throw new Error();
  }
}

/**
 * アニメ作成
 * @param formData
 */
export async function createAnime(formData: {
  title: string;
  status: number;
  season_name: string;
  vods: number[];
  images: string;
}) {
  const supabase = createClient();
  const { error } = await supabase.rpc('create_anime', formData);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/admin/anime', 'layout');
  redirect('/admin/anime');
}

/**
 * アニメデータを更新
 * @param animeId
 * @param animeData
 * @param vodIds
 */
export async function updateAnimeData(
  animeId: number,
  animeData: { images?: string; status?: number },
  vodIds: number[]
) {
  // vod以外のアニメデータを更新
  const supabase = createClient();
  const { error: updateAnimeDataError } = await supabase
    .from('animes')
    .update(animeData)
    .eq('id', animeId);
  if (updateAnimeDataError) {
    throw new Error(updateAnimeDataError.message);
  }

  // チェックがついていないvodレコードを削除
  const { error: deleteNotChecked } = await supabase
    .from('animes_vods')
    .delete()
    .eq('anime_id', animeId)
    .not('vod_id', 'in', `(${vodIds.join(',')})`);

  if (deleteNotChecked) {
    throw new Error(deleteNotChecked.message);
  }

  // チェック済みか取得
  const { data: existingRecords, error: fetchExistingVodError } = await supabase
    .from('animes_vods')
    .select('vod_id')
    .eq('anime_id', animeId)
    .in('vod_id', vodIds);

  if (fetchExistingVodError) {
    throw new Error(fetchExistingVodError.message);
  }

  // チェック済みのvodIdを取得
  const existingVodIds = existingRecords.map((record) => record.vod_id);

  // 新たにチェックされたvodIdを取得
  const newVodIds = vodIds.filter((vodId) => !existingVodIds.includes(vodId));

  if (newVodIds.length > 0) {
    const insertData = newVodIds.map((vodId) => ({
      anime_id: animeId,
      vod_id: vodId,
    }));

    const { error: insertNewVodError } = await supabase
      .from('animes_vods')
      .insert(insertData);

    if (insertNewVodError) {
      throw new Error(insertNewVodError.message);
    }
  }

  revalidatePath('/admin/anime');
  redirect('/admin/anime');
}

/**
 * アニメ削除
 * @param animeId
 * @returns
 */
export async function deleteAnime(animeId: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from('animes')
    .update({
      status: STATUS_DELETED,
    })
    .eq('id', animeId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/admin/anime');
  return true;
}
