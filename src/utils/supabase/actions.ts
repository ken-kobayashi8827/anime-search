'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { LoginFormType, SignUpFormType } from '@/types/types';

const EMAIL_REDIRECT_URL = 'http://localhost:3000/signup/complete';

export async function login(formData: LoginFormType) {
  try {
    const supabase = createClient();

    //TODO: Sever Action側でバリデーション追加？
    const data = {
      email: formData.email,
      password: formData.password,
    };

    const { error: signInError } = await supabase.auth.signInWithPassword(data);

    if (signInError) {
      throw new Error();
    }
  } catch (error) {
    redirect('/error');
  }
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: SignUpFormType) {
  try {
    const supabase = createClient();

    //TODO: Sever Action側でバリデーション追加？
    const data = {
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: EMAIL_REDIRECT_URL,
      },
    };

    const { error: signUpError } = await supabase.auth.signUp(data);

    if (signUpError) {
      console.log(signUpError);
      throw new Error();
    }
  } catch (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/confirm');
}
