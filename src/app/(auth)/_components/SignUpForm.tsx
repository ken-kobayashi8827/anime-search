'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { signup } from '@/utils/supabase/actions';
import { SignUpFormSchema, SignUpFormType } from '@/types/types';
import { FormInput } from '@/app/components/FormInput';

export default function SignUpForm() {
  const methods = useForm<SignUpFormType>({
    mode: 'onChange',
    resolver: zodResolver(SignUpFormSchema),
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

  const onSubmit = async (params: SignUpFormType) => {
    console.log(params);
    await signup(params);
  };

  return (
    <Flex
      minH='100vh'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Box mw='100%' border='2px' rounded='md' p='10' maxWidth='md'>
        <Text fontSize='2xl' fontWeight='bold' mb='3' textAlign='center'>
          新規登録
        </Text>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              type='email'
              register={register('email')}
              label='メールアドレス'
              placeholder='example@example.com'
              errMessage={errors.email?.message}
            />
            <FormInput
              type='password'
              register={register('password')}
              label='パスワード'
              placeholder='パスワードを入力'
              errMessage={errors.password?.message}
            />
            <FormInput
              type='password'
              register={register('confirmPassword')}
              label='確認用パスワード'
              placeholder='確認用パスワードを入力'
              errMessage={errors.confirmPassword?.message}
            />
            <Button type='submit' w='100%' colorScheme='teal' mt='4'>
              登録
            </Button>
          </form>
        </FormProvider>
        <Link href='/login'>
          <Button w='100%' colorScheme='blue' mt='3'>
            ログインページへ
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}
