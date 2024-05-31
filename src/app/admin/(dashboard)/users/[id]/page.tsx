import MyPageEditForm from '@/app/(user)/(authenticated)/(mypage)/_components/MyPageEditForm';
import { fetchProfileByUserId } from '@/utils/supabase/admin/actions';

export default async function Edit({ params }: { params: { id: string } }) {
  const userId = params.id;
  const profile = await fetchProfileByUserId(userId);

  return (
    <MyPageEditForm
      userId={profile.user_id}
      username={profile.username}
      profileImage={profile.profile_image}
      redirectPath='/admin/users'
    />
  );
}
