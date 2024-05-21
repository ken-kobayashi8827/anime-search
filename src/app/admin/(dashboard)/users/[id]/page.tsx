import MyPageEditForm from '@/app/(user)/(authenticated)/(mypage)/_components/MyPageEditForm';
import { fetchProfileByUserId } from '@/utils/supabase/admin/actions';
import { Box } from '@chakra-ui/react';

export default async function Edit({ params }: { params: { id: string } }) {
  const userId = params.id;
  const user = await fetchProfileByUserId(userId);

  return (
    <Box pt='6'>
      <MyPageEditForm
        username={user.username}
        profileImage={user.profile_image}
        redirectPath='/admin/users'
      />
    </Box>
  );
}
