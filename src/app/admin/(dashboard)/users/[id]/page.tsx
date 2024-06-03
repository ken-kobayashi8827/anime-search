import MyPageEditForm from '@/app/(user)/(authenticated)/(mypage)/_components/MyPageEditForm';
import { fetchProfileByUserId } from '@/data/profile';

export default async function Edit({ params }: { params: { id: string } }) {
  const userId = params.id;
  const profile = await fetchProfileByUserId(userId);

  return <MyPageEditForm profile={profile} redirectPath='/admin/users' />;
}
