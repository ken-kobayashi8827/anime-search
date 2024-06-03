'use server';

import { createClient } from '@/utils/supabase/server';

/**
 * VODリスト取得
 * @returns
 */
export async function fetchVodLists() {
  const supabase = createClient();
  const { data, error } = await supabase.from('vods').select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
