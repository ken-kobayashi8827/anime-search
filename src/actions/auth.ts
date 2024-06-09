'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  LoginFormType,
  ResetPasswordFormType,
  SignUpFormType,
  UpdatePasswordFormType,
} from '@/types/types';
import { getIsAdmin } from '@/data/auth';

/**
 * ログイン
 * @param formData
 * @returns
 */
export async function login(formData: LoginFormType) {
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { data: signInData, error: signInError } =
    await supabase.auth.signInWithPassword(data);
  const isAdmin = await getIsAdmin();
  if (isAdmin) {
    // sessionを破棄するためにサインアウト
    const { error: signOutError } = await supabase.auth.signOut();
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
    return {
      error: 'ログインに失敗しました',
    };
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
      error: '新規登録に失敗しました',
    };
  }

  revalidatePath('/', 'layout');
  redirect('/signup/complete');
}

/**
 * パスワードリセットメール送信
 * @param formData
 */
export async function resetPasswordForEmail(formData: ResetPasswordFormType) {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/update-password`,
  });

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * パスワード更新
 * @param formData
 */
export async function updateUser(formData: UpdatePasswordFormType) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect('/login');
}

/**
 * ログアウト
 */
export async function logout(redirectUrl: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }

  redirect(redirectUrl);
}
