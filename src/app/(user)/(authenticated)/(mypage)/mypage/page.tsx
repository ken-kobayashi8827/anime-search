import { fetchProfile } from '@/utils/supabase/actions';
import MyPageList from '../_components/MyPageList';

export default async function MyPage() {
  const profile = await fetchProfile();

  return <MyPageList profile={profile} />;
}
