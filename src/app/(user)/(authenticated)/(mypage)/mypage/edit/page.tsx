import { fetchProfile } from '@/utils/supabase/actions';
import MyPageEditForm from '../../_components/MyPageEditForm';

export default async function MyPageEdit() {
  const profile = await fetchProfile();

  return (
    <MyPageEditForm
      userId={profile.user_id}
      username={profile.username}
      profileImage={profile.profile_image}
      redirectPath='/mypage'
    />
  );
}
