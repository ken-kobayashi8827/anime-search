'use client';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Image,
  Link,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRef } from 'react';
import NextLink from 'next/link';
import { ProfileType } from '@/types/types';
import LogoutButton from '@/app/components/LogoutButton';
import LoginButton from '@/app/components/LoginButton';
import { PROFILE_NO_IMG_PATH } from '@/utils/utils';

type Props = {
  profile: ProfileType | null;
  isAdmin?: boolean;
};

const linkList = [
  {
    text: 'トップページ',
    href: '/',
  },
  {
    text: 'マイページ',
    href: '/mypage',
  },
];

export default function HamburgerMenu({ profile, isAdmin }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <HStack justifyContent='space-between'>
        <Box>
          <Link
            as={NextLink}
            p={2}
            href={'/'}
            fontSize={'xl'}
            fontWeight='bold'
          >
            あにめさ～ち
          </Link>
        </Box>
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
          <HamburgerIcon />
        </Button>
      </HStack>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <VStack as='nav' gap='4'>
              {linkList.map((link) => {
                return (
                  <Link
                    as={NextLink}
                    key={link.text}
                    href={link.href}
                    textAlign='center'
                    borderBottom='1px'
                    py='2'
                    fontSize='lg'
                    fontWeight='bold'
                    w='100%'
                    _hover={{
                      textDecoration: 'none',
                    }}
                    onClick={() => onClose()}
                  >
                    {link.text}
                  </Link>
                );
              })}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            {profile && !isAdmin ? (
              <VStack
                gap='4'
                w='100%'
                alignItems='flex-start'
                onClick={() => onClose()}
              >
                <HStack>
                  <Link href='/mypage' as={NextLink}>
                    <Box w='50px'>
                      <Image
                        borderRadius='full'
                        alt='プロフィール画像'
                        boxSize='50px'
                        src={
                          profile?.profile_image
                            ? profile.profile_image
                            : PROFILE_NO_IMG_PATH
                        }
                      />
                    </Box>
                  </Link>
                  <Text>{profile.username}</Text>
                </HStack>
                <LogoutButton redirectUrl='/login' />
              </VStack>
            ) : (
              <LoginButton redirectUrl='/login' />
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
