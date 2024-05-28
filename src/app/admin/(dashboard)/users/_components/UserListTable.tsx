'use client';

import LinkButton from '@/app/components/LinkButton';
import {
  HStack,
  Table,
  Text,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Avatar,
} from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { UserType } from '@/types/types';
import { PROFILE_NO_IMG_PATH } from '@/utils/utils';

type Props = {
  users: UserType[] | undefined;
};

export default function UserListTable({ users }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleSort = (key: string) => {
    if (key) {
      params.set('sortBy', key);

      if (params.has('order')) {
        const currentOrder = params.get('order');
        params.set('order', currentOrder === 'asc' ? 'desc' : 'asc');
      } else {
        params.set('order', 'desc');
      }
    } else {
      params.delete('sortBy');
      params.delete('order');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <TableContainer>
      <Table variant='striped' colorScheme='gray'>
        <Thead>
          <Tr>
            <Th cursor='pointer' onClick={() => handleSort('id')}>
              <HStack>
                <Text>ID</Text>
                {params.get('order') === 'desc' &&
                params.get('sortBy') === 'id' ? (
                  <ChevronUpIcon />
                ) : (
                  <ChevronDownIcon />
                )}
              </HStack>
            </Th>
            <Th>プロフィール画像</Th>
            <Th>ユーザー名</Th>
            <Th>権限</Th>
            <Th cursor='pointer' onClick={() => handleSort('created_at')}>
              <HStack>
                <Text>作成日</Text>
                {params.get('order') === 'desc' &&
                params.get('sortBy') === 'created_at' ? (
                  <ChevronUpIcon />
                ) : (
                  <ChevronDownIcon />
                )}
              </HStack>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users &&
            users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>
                  <Avatar
                    size='lg'
                    src={
                      user.profile_image
                        ? user.profile_image
                        : PROFILE_NO_IMG_PATH
                    }
                  />
                </Td>
                <Td>{user.username}</Td>
                <Td>{user.is_admin ? '管理者' : '一般ユーザー'}</Td>
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
  );
}
