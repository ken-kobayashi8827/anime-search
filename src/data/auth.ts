'use server';

import { createClient } from '@/utils/supabase/server';
import { cache } from 'react';
import jwt from 'jsonwebtoken';
import { AppMetaDataType } from '@/types/types';

/**
 * 認証しているユーザーを取得
 */
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

/**
 * 管理者かどうか判定
 */
export const getIsAdmin = cache(async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();
  if (!data.session) {
    return false;
  }

  if (error) {
    throw new Error();
  }

  if (data.session) {
    const accessToken = jwt.decode(
      data.session.access_token
    ) as AppMetaDataType;
    return accessToken.app_metadata.admin;
  }
});
