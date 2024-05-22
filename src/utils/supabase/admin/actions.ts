'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { AdminLoginFormType, AppMetaDataType } from '@/types/types';
import jwt from 'jsonwebtoken';
import { getFilterSeason } from '@/utils/utils';
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
  const STATUS_PUBLIC = 1;
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

    // animesテーブルへinsert
    // titleカラムのデータが重複していたらupdate / それ以外はinsert
    // TODO: idが飛んでいる時がある
    const { error } = await supabase
      .from('animes')
      .upsert(insertData, { onConflict: 'title' });

    if (error) {
      throw new Error();
    }
  } catch (e) {
    console.log('Error: insert animes failed');
    redirect('./error');
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
  currentPage: number
) {
  noStore();
  const filterSeason = getFilterSeason();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const endOffset = offset + ITEMS_PER_PAGE - 1;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('animes')
      .select()
      .eq('season_name', filterSeason)
      .like('title', `%${query}%`)
      .order('id', { ascending: true })
      .range(offset, endOffset);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (e) {
    console.error('Failed to fetch anime list from supabase:', e);
  }
}
