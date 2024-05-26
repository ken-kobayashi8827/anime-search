import MyPageEditForm from '@/app/(user)/(authenticated)/(mypage)/_components/MyPageEditForm';
import { fetchProfileByUserId } from '@/utils/supabase/admin/actions';

export default async function Edit({ params }: { params: { id: string } }) {
  const userId = params.id;
  const user = await fetchProfileByUserId(userId);

  return (
    <MyPageEditForm
      username={user.username}
      profileImage={user.profile_image}
      redirectPath='/admin/users'
    />
  );
}
