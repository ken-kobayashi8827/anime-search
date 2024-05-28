import MyPageEditForm from '@/app/(user)/(authenticated)/(mypage)/_components/MyPageEditForm';
import { fetchProfileByUserId } from '@/utils/supabase/admin/actions';
import { PROFILE_NO_IMG_PATH } from '@/utils/utils';

export default async function Edit({ params }: { params: { id: string } }) {
  const userId = params.id;
  const user = await fetchProfileByUserId(userId);

  return (
    <MyPageEditForm
      username={user.username}
      profileImage={
        user.profile_image ? user.profile_image : PROFILE_NO_IMG_PATH
      }
      redirectPath='/admin/users'
    />
  );
}
