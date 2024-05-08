'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { login } from '@/utils/supabase/actions';
import { FormInput } from '@/app/components/FormInput';
import { LoginFormSchema, LoginFormType } from '@/types/types';

export default function LoginForm() {
  const methods = useForm<LoginFormType>({
    mode: 'onChange',
    resolver: zodResolver(LoginFormSchema),
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

  const onSubmit = async (params: LoginFormType) => {
    const result = await login(params);
    if (result && result.error) {
      setError('password', { type: 'loginError', message: result.error });
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
          ログイン
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
            <Button type='submit' w='100%' colorScheme='teal' mt='4'>
              ログイン
            </Button>
          </form>
        </FormProvider>
        <Link href='/signup'>
          <Button w='100%' colorScheme='blue' mt='3'>
            新規登録
          </Button>
        </Link>
        <Link
          href='/reset-password'
          _hover={{
            textDecoration: 'none',
            opacity: '0.8',
          }}
        >
          <Text
            w='100%'
            mt='4'
            textAlign='center'
            color='blue.400'
            fontSize='sm'
          >
            パスワードを忘れた方
          </Text>
        </Link>
      </Box>
    </Flex>
  );
}
