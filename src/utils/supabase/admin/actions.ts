'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { AdminLoginFormType, AppMetaDataType } from '@/types/types';
import jwt from 'jsonwebtoken';

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
