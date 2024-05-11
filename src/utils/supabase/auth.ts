'use server';

import { createClient } from '@/utils/supabase/server';

export async function getUser() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error();
    }
    return data;
  } catch (e) {
    console.log('getUser Error');
  }
}
