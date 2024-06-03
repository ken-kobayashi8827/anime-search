'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { FormInput } from '@/app/components/FormInput';
import { AdminLoginFormSchema, AdminLoginFormType } from '@/types/types';
import NextLink from 'next/link';
import { useState } from 'react';
import { login } from '@/actions/admin-auth';

export default function AdminLoginForm() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm<AdminLoginFormType>({
    mode: 'onChange',
    resolver: zodResolver(AdminLoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const onSubmit = async (params: AdminLoginFormType) => {
    setIsLoading(true);
    const result = await login(params);
    if (result && result.error) {
      setIsLoading(false);
      setError('password', { type: 'loginError', message: result.error });
    } else {
      toast({
        title: 'ログインしました。',
        status: 'success',
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH='100vh'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Box w='100%' border='2px' rounded='md' p='10' maxWidth='md'>
        <Text fontSize='2xl' fontWeight='bold' mb='3' textAlign='center'>
          管理者ページログイン
        </Text>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              type='email'
              register={register('email')}
              placeholder='メールアドレス'
              errMessage={errors.email?.message}
            />
            <FormInput
              type='password'
              register={register('password')}
              placeholder='パスワード'
              errMessage={errors.password?.message}
            />
            <Button
              type='submit'
              w='100%'
              colorScheme='teal'
              mt='4'
              isLoading={isLoading}
              loadingText='ログイン中'
            >
              ログイン
            </Button>
          </form>
        </FormProvider>
        <Button as={NextLink} href='/' w='100%' colorScheme='blue' mt='3'>
          ユーザーページへ
        </Button>
      </Box>
    </Flex>
  );
}
