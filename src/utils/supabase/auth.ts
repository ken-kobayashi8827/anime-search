'use server';

import { createClient } from '@/utils/supabase/server';

export async function getUser() {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      throw new Error();
    }
    return user;
  } catch (e) {
    console.log('getUser Error');
    throw new Error();
  }
}
