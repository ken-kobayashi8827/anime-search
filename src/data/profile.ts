'use server';

import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/data/auth';

// 1ページで取得する件数
const ITEMS_PER_PAGE = 20;

/**
 * プロフィール取得
 * @returns
 */
export async function fetchProfile() {
  const supabase = createClient();
  const user = await getUser();
  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('user_id, username, profile_image')
    .eq('user_id', user.id)
    .eq('is_admin', false)
    .limit(1)
    .single();

  if (!data) {
    return data;
  }

  if (error) {
    throw new Error();
  }
  return data;
}

/**
 * ユーザーIDからプロフィール取得
 * @param userId
 * @returns
 */
export async function fetchProfileByUserId(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', userId)
    .limit(1)
    .single();
  if (error) {
    throw new Error();
  }
  return data;
}

/**
 * ユーザー一覧のページ数を取得
 * @param username
 * @returns
 */
export async function fetchUsersListPage(username: string) {
  const supabase = createClient();

  const { count, error } = await supabase
    .from('profiles')
    .select('*', {
      count: 'exact',
      head: true,
    })
    .like('username', `%${username}%`);
  if (error) {
    throw new Error(error.message);
  }
  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

/**
 * ユーザー一覧取得
 * @param username
 * @param currentPage
 * @param sortBy
 * @param order
 * @returns
 */
export async function fetchFilteredUserList(
  username: string,
  currentPage: number,
  sortBy?: string,
  order?: string
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const endOffset = offset + ITEMS_PER_PAGE - 1;

  const supabase = createClient();
  let fetchQuery = supabase
    .from('profiles')
    .select('*')
    .like('username', `%${username}%`)
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
}
