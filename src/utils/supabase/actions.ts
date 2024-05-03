'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { LoginFormType } from '@/types/types';

export async function login(formData: LoginFormType) {
  try {
    const supabase = createClient();

    //TODO: Sever Action側でバリデーション追加？
    const data = {
      email: formData.email,
      password: formData.password,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      throw new Error();
    }
  } catch (error) {
    redirect('/error');
  }
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
