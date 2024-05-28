import { fetchFilteredUserList } from '@/utils/supabase/admin/actions';
import UserListTable from './UserListTable';

type Props = {
  username: string;
  sortBy: string;
  order: string;
  currentPage: number;
};

export default async function UserList({
  username,
  currentPage,
  sortBy,
  order,
}: Props) {
  const users = await fetchFilteredUserList(
    username,
    currentPage,
    sortBy,
    order
  );
  return <UserListTable users={users} />;
}
