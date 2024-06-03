'use server';

import { createClient } from '@/utils/supabase/server';
import { cache } from 'react';
import jwt from 'jsonwebtoken';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  AppMetaDataType,
  LoginFormType,
  ResetPasswordFormType,
  SignUpFormType,
  UpdatePasswordFormType,
} from '@/types/types';

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
    throw new Error();
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
    throw new Error();
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
    throw new Error();
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
