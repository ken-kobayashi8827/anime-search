'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

/**
 * プロフィール更新
 * @param formData
 * @param userId
 * @param redirectPath
 */
export async function updateProfile(
  formData: {
    username: string;
    profile_image: string | null;
  },
  userId: string,
  redirectPath: string
) {
  const supabase = createClient();
  const { error } = await supabase
    .from('profiles')
    .update(formData)
    .eq('user_id', userId);
  if (error) {
    throw new Error();
  }

  revalidatePath(redirectPath);
  redirect(redirectPath);
}
