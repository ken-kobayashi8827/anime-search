'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { AdminLoginFormType, CreateUserFormType } from '@/types/types';
import { getIsAdmin } from '@/data/auth';

/**
 * ユーザー新規登録
 * @param formData
 * @returns
 */
export async function createUser(formData: CreateUserFormType) {
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
    return {
      error: 'ユーザーの作成に失敗しました',
    };
  }
  revalidatePath('/admin/users', 'layout');
  redirect('/admin/users');
}

/**
 * ログイン
 * @param formData
 * @returns
 */
export async function login(formData: AdminLoginFormType) {
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { data: signInData, error: signInError } =
    await supabase.auth.signInWithPassword(data);
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return {
      error: 'メールアドレスまたはパスワードが間違っています',
    };
  }

  if (signInError?.message === 'Invalid login credentials') {
    return {
      error: 'メールアドレスまたはパスワードが間違っています',
    };
  }

  if (signInError) {
    return { error: 'ログインに失敗しました' };
  }

  revalidatePath('/admin', 'layout');
  redirect('/admin');
}
