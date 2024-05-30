'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import {
  AppMetaDataType,
  LoginFormType,
  MyPageUpdateType,
  ResetPasswordFormType,
  SignUpFormType,
  UpdatePasswordFormType,
} from '@/types/types';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getFilterSeason, STATUS_PUBLIC } from '@/utils/utils';
import { unstable_noStore as noStore } from 'next/cache';
import { getUser } from './auth';

// 1ページで取得する件数
const ITEMS_PER_PAGE = 20;

/**
 * ログイン
 * @param formData
 */
export async function login(formData: LoginFormType) {
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
      if (accessToken.app_metadata.admin) {
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
  revalidatePath('/', 'layout');
  redirect('/');
}

/**
 * 新規登録
 * @param formData
 * @returns
 */
export async function signup(formData: SignUpFormType) {
  try {
    const supabase = createClient();

    const data = {
      email: formData.email,
      password: formData.password,
    };

    const { error: signUpError } = await supabase.auth.signUp(data);

    if (signUpError?.code === 'user_already_exists') {
      return {
        error: '既に登録されているメールアドレスです',
      };
    }

    if (signUpError) {
      throw new Error();
    }
  } catch (e) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/signup/complete');
}

/**
 * パスワードリセットメール送信
 * @param formData
 */
export async function resetPasswordForEmail(formData: ResetPasswordFormType) {
  const headersList = headers();
  const origin = headersList.get('x-origin');
  try {
    const supabase = createClient();
    const { error: resetPasswordError } =
      await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${origin}/update-password`,
      });

    if (resetPasswordError) {
      throw new Error();
    }
  } catch (e) {
    redirect('/error');
  }
  redirect('/reset-password/success');
}

export async function updateUser(formData: UpdatePasswordFormType) {
  try {
    const supabase = createClient();
    const { error: updateUserError } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (updateUserError) {
      throw new Error();
    }
  } catch (e) {
    redirect('/error');
  }
  redirect('/update-password/success');
}

/**
 * ログアウト
 */
export async function logout(redirectUrl: string) {
  try {
    const supabase = createClient();
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      throw new Error(signOutError.message);
    }
  } catch (e) {
    redirect('/error');
  }
  redirect(redirectUrl);
}

/**
 * プロフィール取得
 * @returns
 */
export async function fetchProfile() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('username, profile_image')
      .limit(1)
      .single();
    if (error) {
      throw new Error();
    }
    return data;
  } catch (e) {
    redirect('/error');
  }
}

/**
 * プロフィール更新
 * @param formData
 */
export async function updateProfile(
  formData: MyPageUpdateType,
  redirectPath: string
) {
  try {
    const supabase = createClient();
    const user = await getUser();

    if (!user) {
      throw new Error();
    }

    const updateData: MyPageUpdateType = {
      username: formData.username,
    };

    if (formData.profile_image) {
      updateData.profile_image = formData.profile_image;
    }

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('user_id', user.id);
    if (error) {
      throw new Error();
    }
  } catch (e) {
    redirect('/error');
  }
  revalidatePath(redirectPath);
  redirect(redirectPath);
}

/**
 * 公開済みアニメを取得
 * @param title
 * @param vodId
 * @returns
 */
export async function fetchPublicAnimeListPage(
  title: string,
  vodId: number | null
) {
  noStore();
  const filterSeason = getFilterSeason();
  try {
    const supabase = createClient();

    if (vodId) {
      const { count: vodAnimeCount, error: vodAnimeCountError } = await supabase
        .from('animes_vods')
        .select('*', {
          count: 'exact',
          head: true,
        })
        .eq('vod_id', vodId);
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
  } catch (e) {
    console.error('Failed to fetch public anime list from supabase:', e);
  }
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
  noStore();
  const filterSeason = getFilterSeason();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const endOffset = offset + ITEMS_PER_PAGE - 1;

  try {
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
  } catch (e) {
    console.error('Failed to fetch public anime list from supabase:', e);
  }
}

/**
 * お気に入りボタン
 * @param animeId
 */
export async function addFavorite(animeId: number) {
  const supabase = createClient();
  const user = await getUser();

  if (user) {
    // 既にイイネ済みかどうか判定

    const { error: insertFavoritesError } = await supabase
      .from('favorites')
      .insert({ user_id: user.id, anime_id: animeId });

    if (insertFavoritesError) {
      throw new Error(insertFavoritesError.message);
    }
  }

  revalidatePath('/', 'layout');
}

/**
 * ユーザーのいいねしたアニメIDを取得
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
 * ユーザーのいいねしたアニメを取得
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
  noStore();

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
