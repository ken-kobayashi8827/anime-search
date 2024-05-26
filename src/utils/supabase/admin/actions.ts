'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { AdminLoginFormType, AppMetaDataType } from '@/types/types';
import jwt from 'jsonwebtoken';
import { getFilterSeason, STATUS_DELETED, STATUS_PUBLIC } from '@/utils/utils';
import { unstable_noStore as noStore } from 'next/cache';

/**
 * ログイン
 * @param formData
 */
export async function login(formData: AdminLoginFormType) {
  try {
    const supabase = createClient();

    const data = {
      email: formData.email,
      password: formData.password,
    };

    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword(data);
    if (signInData.session) {
      const accessToken = jwt.decode(
        signInData.session.access_token
      ) as AppMetaDataType;
      if (!accessToken.app_metadata.admin) {
        return {
          error: 'メールアドレスまたはパスワードが間違っています',
        };
      }
    }

    if (signInError?.message === 'Invalid login credentials') {
      return {
        error: 'メールアドレスまたはパスワードが間違っています',
      };
    }

    if (signInError) {
      throw new Error(signInError.message);
    }
  } catch (e) {
    redirect('/error');
  }

  revalidatePath('/admin', 'layout');
  redirect('/admin');
}

export async function fetchUsersList() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .order('id', { ascending: true });
    if (error) {
      console.log('users list fetch error');
      throw new Error();
    }
    return data;
  } catch (e) {
    redirect('/error');
  }
}

export async function fetchProfileByUserId(userId: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', userId);
    if (error) {
      throw new Error();
    }
    return data[0];
  } catch (e) {
    redirect('/error');
  }
}

/**
 * Annict APIから取得したデータをinsert
 */
export async function insertAnimeData(animeData: any) {
  try {
    const supabase = createClient();
    // insertするデータを作成
    const insertData: any[] = [];
    animeData.forEach((data: any) => {
      data.works.forEach((work: any) => {
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
      console.error('Error: insert anime failed', error.message);
      throw new Error();
    }
  } catch (e) {
    throw new Error();
  }
}

// 1ページで取得する件数
const ITEMS_PER_PAGE = 20;

/**
 * アニメ一覧のページ数を取得
 * @param query
 * @returns
 */
export async function fetchAnimeListPage(query: string) {
  noStore();
  const filterSeason = getFilterSeason();

  try {
    const supabase = createClient();
    const { count, error } = await supabase
      .from('animes')
      .select('*', {
        count: 'exact',
        head: true,
      })
      .eq('season_name', filterSeason)
      .like('title', `%${query}%`);
    if (error) {
      throw new Error(error.message);
    }
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (e) {
    console.error('Failed to fetch anime list from supabase:', e);
  }
}

/**
 * アニメ一覧取得
 * @param query
 * @param currentPage
 * @returns
 */
export async function fetchFilteredAnimeList(
  query: string,
  currentPage: number,
  sortBy?: string,
  order?: string
) {
  noStore();
  const filterSeason = getFilterSeason();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const endOffset = offset + ITEMS_PER_PAGE - 1;

  try {
    const supabase = createClient();
    let fetchQuery = supabase
      .from('animes')
      .select('*, vods(id, name)')
      .eq('season_name', filterSeason)
      .like('title', `%${query}%`)
      .range(offset, endOffset);

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
  } catch (e) {
    console.error('Failed to fetch anime list from supabase:', e);
  }
}

/**
 * IDからアニメデータ取得
 * @param animeId
 * @returns
 */
export async function fetchAnimeByAnimeId(animeId: string) {
  noStore();

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('animes')
      .select('*, vods(id, name)')
      .eq('id', animeId);
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  } catch (e) {
    console.error(`Failed to fetch anime ${animeId} from supabase:`, e);
  }
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
  //TODO: 関数を分割して可読性を上げる
  try {
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
    const { data: existingRecords, error: fetchExistingVodError } =
      await supabase
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
  } catch (e) {
    console.error(`Failed to update anime ${animeId}: `, e);
  }

  revalidatePath('/admin/anime');
  redirect('/admin/anime');
}

export async function fetchVodLists() {
  noStore();

  try {
    const supabase = createClient();

    const { data, error } = await supabase.from('vods').select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (e) {
    console.error(`Failed to fetch vod services: `, e);
  }
}

/**
 * アニメ削除
 * @param animeId
 */
export async function deleteAnime(animeId: number) {
  try {
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

    return true;
  } catch (e) {
    console.error(`Failed to delete anime by ${animeId}`, e);
  }
}
