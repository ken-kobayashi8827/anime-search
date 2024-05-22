import LinkButton from '@/app/components/LinkButton';
import { fetchUsersList } from '@/utils/supabase/admin/actions';
import {
  Avatar,
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export default async function Users() {
  const users = await fetchUsersList();

  return (
    <Box w='100%'>
      <Text fontSize='3xl' fontWeight='bold' mb='5' textAlign='center'>
        ユーザー一覧
      </Text>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>プロフィール画像</Th>
              <Th>ユーザー名</Th>
              <Th>作成日</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>
                  <Avatar size='lg' src={user.profile_image} />
                </Td>
                <Td>{user.username}</Td>
                <Td>{new Date(user.created_at).toLocaleString()}</Td>
                <Td>
                  <LinkButton
                    link={`/admin/users/${user.id}`}
                    colorScheme='blue'
                    width='40%'
                    text='編集'
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
