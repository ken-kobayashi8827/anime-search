'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import {
  AppMetaDataType,
  LoginFormType,
  MyPageUpdateType,
  ResetPasswordFormType,
  SignUpFormType,
  UpdatePasswordFormType,
} from '@/types/types';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

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
  const headersList = headers();
  const origin = headersList.get('x-origin');
  try {
    const supabase = createClient();
    const { error: resetPasswordError } =
      await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${origin}/update-password`,
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

/**
 * ログアウト
 */
export async function logout(redirectUrl: string) {
  try {
    const supabase = createClient();
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      throw new Error(signOutError.message);
    }
  } catch (e) {
    redirect('/error');
  }
  redirect(redirectUrl);
}

/**
 * プロフィール取得
 * @returns
 */
export async function fetchProfile() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('username, profile_image')
      .limit(1)
      .single();
    if (error) {
      throw new Error();
    }
    return data;
  } catch (e) {
    redirect('/error');
  }
}

/**
 * プロフィール更新
 * @param formData
 */
export async function updateProfile(
  formData: MyPageUpdateType,
  redirectPath: string
) {
  try {
    const supabase = createClient();
    const { data: userData, error: getUserError } =
      await supabase.auth.getUser();
    if (getUserError) {
      throw new Error();
    }

    const updateData: MyPageUpdateType = {
      username: formData.username,
    };

    if (formData.profile_image) {
      updateData.profile_image = formData.profile_image;
    }

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('user_id', userData.user.id);
    if (error) {
      throw new Error();
    }
  } catch (e) {
    redirect('/error');
  }
  revalidatePath(redirectPath);
  redirect(redirectPath);
}
