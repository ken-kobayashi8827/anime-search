import { fetchProfile } from '@/data/profile';
import MyPageEditForm from '../../_components/MyPageEditForm';

export default async function MyPageEdit() {
  const profile = await fetchProfile();
  if (!profile) {
    throw new Error();
  }
  return <MyPageEditForm profile={profile} redirectPath='/mypage' />;
}
