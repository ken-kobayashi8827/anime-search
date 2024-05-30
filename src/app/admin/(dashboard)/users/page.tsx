import { fetchUsersListPage } from '@/utils/supabase/admin/actions';
import { Box, HStack, Text } from '@chakra-ui/react';
import UserList from './_components/UserList';
import Pagination from '@/app/components/Pagination';
import UserSearch from './_components/UserSearch';
import CreateButton from '@/app/components/CreateButton';

type SearchParamsType = {
  searchParams?: {
    username?: string;
    sortBy?: string;
    order?: string;
    page?: string;
  };
};

export default async function Users({ searchParams }: SearchParamsType) {
  const username = searchParams?.username || '';
  const sortBy = searchParams?.sortBy || 'id';
  const order = searchParams?.order || 'asc';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchUsersListPage(username);

  return (
    <Box w='100%'>
      <Text fontSize='3xl' fontWeight='bold' mb='5' textAlign='center'>
        ユーザーリスト
      </Text>
      <HStack align='center' justify='center' w='100%' mb='6'>
        <UserSearch />
        <CreateButton link='/admin/users/create' />
      </HStack>
      <UserList
        username={username}
        sortBy={sortBy}
        order={order}
        currentPage={currentPage}
      />
      {totalPages !== 0 && <Pagination totalPages={totalPages} />}
    </Box>
  );
}
