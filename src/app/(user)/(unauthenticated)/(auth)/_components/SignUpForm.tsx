'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { signup } from '@/utils/supabase/actions';
import { SignUpFormSchema, SignUpFormType } from '@/types/types';
import { FormInput } from '@/app/components/FormInput';
import { useState } from 'react';

export default function SignUpForm() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setError,
  } = methods;

  const onSubmit = async (params: SignUpFormType) => {
    setIsLoading((value) => !value);

    const result = await signup(params);
    if (result && result.error) {
      setIsLoading((value) => !value);
      setError('email', { type: 'signUpError', message: result.error });
    } else {
      toast({
        title: '登録完了しました',
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
      <Box border='2px' rounded='md' p='10' maxWidth='md'>
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
            <Button
              type='submit'
              w='100%'
              colorScheme='teal'
              mt='4'
              isLoading={isLoading}
              loadingText='登録中'
            >
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
