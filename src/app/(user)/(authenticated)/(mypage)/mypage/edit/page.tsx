import { fetchProfile } from '@/utils/supabase/actions';
import MyPageEditForm from '../../_components/MyPageEditForm';

export default async function MyPageEdit() {
  const profile = await fetchProfile();
  if (!profile) {
    return <div>プロフィールが見つかりませんでした</div>;
  }
  return <MyPageEditForm profile={profile} redirectPath='/mypage' />;
}
