'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { login } from '@/utils/supabase/actions';
import { FormInput } from '@/app/components/FormInput';
import { LoginFormSchema, LoginFormType } from '@/types/types';

export default function LoginForm() {
  const toast = useToast();

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
    if (!result) {
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
      </Box>
    </Flex>
  );
}
