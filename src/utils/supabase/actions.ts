'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import {
  LoginFormType,
  ResetPasswordFormType,
  SignUpFormType,
  UpdatePasswordFormType,
} from '@/types/types';

/**
 * ログイン
 * @param formData
 */
export async function login(formData: LoginFormType) {
  try {
    const supabase = createClient();

    const data = {
      email: formData.email,
      password: formData.password,
    };

    const { error: signInError } = await supabase.auth.signInWithPassword(data);
    if (signInError?.message === 'Invalid login credentials') {
      return {
        error: 'メールアドレスまたはパスワードが間違っています',
      };
    }
    if (signInError) {
      throw new Error();
    }
  } catch (e) {
    redirect('/error');
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
  try {
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
  } catch (e) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/signup/complete');
}

/**
 * パスワードリセットメール送信
 * @param formData
 */
export async function resetPasswordForEmail(formData: ResetPasswordFormType) {
  try {
    const supabase = createClient();
    const { error: resetPasswordError } =
      await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: 'http://localhost:3000/update-password',
      });

    if (resetPasswordError) {
      throw new Error();
    }
  } catch (e) {
    redirect('/error');
  }
  redirect('/reset-password/success');
}

export async function updateUser(formData: UpdatePasswordFormType) {
  try {
    const supabase = createClient();
    const { error: updateUserError } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (updateUserError) {
      throw new Error();
    }
  } catch (e) {
    redirect('/error');
  }
  redirect('/update-password/success');
}
