'use server';

import { createClient } from '@/utils/supabase/server';
import { cache } from 'react';

export const getUser = cache(async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    return user;
  }

  if (error) {
    throw new Error();
  }

  return user;
});
