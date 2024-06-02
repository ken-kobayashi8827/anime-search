'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Heading, HStack, useToast } from '@chakra-ui/react';
import { CreateUserFormSchema, CreateUserFormType } from '@/types/types';
import { FormInput } from '@/app/components/FormInput';
import { createUser } from '@/utils/supabase/admin/actions';
import NextLink from 'next/link';

export default function CreateUserForm() {
  const toast = useToast();

  const methods = useForm<CreateUserFormType>({
    mode: 'onChange',
    resolver: zodResolver(CreateUserFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (params: CreateUserFormType) => {
    const result = await createUser(params);
    if (result && result.error) {
      toast({
        title: result.error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'ユーザー作成完了しました。',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW='xl'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading size='md' mb='4'>
            メールアドレス
          </Heading>
          <FormInput
            type='email'
            register={register('email')}
            label=''
            placeholder='example@example.com'
            errMessage={errors.email?.message}
          />
          <Heading size='md' mb='4'>
            パスワード
          </Heading>
          <FormInput
            type='password'
            register={register('password')}
            label=''
            placeholder='パスワードを入力'
            errMessage={errors.password?.message}
          />
          <Heading size='md' mb='4'>
            確認用パスワード
          </Heading>
          <FormInput
            type='password'
            register={register('confirmPassword')}
            label=''
            placeholder='確認用パスワードを入力'
            errMessage={errors.confirmPassword?.message}
          />
          <HStack>
            <Button type='submit' w='150px' colorScheme='teal'>
              登録
            </Button>
            <Button
              as={NextLink}
              href='/admin/users'
              w='100px'
              colorScheme='blue'
            >
              戻る
            </Button>
          </HStack>
        </form>
      </FormProvider>
    </Box>
  );
}
