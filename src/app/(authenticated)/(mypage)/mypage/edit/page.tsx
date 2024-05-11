import { fetchProfile } from '@/utils/supabase/actions';
import MyPageEditForm from '../../_components/MyPageEditForm';

export default async function MyPageEdit() {
  const profile = await fetchProfile();
  const PROFILE_IMAGE: string = profile?.profile_image
    ? profile.profile_image
    : '/img/default.png';

  return (
    <MyPageEditForm username={profile?.username} profileImage={PROFILE_IMAGE} />
  );
}
