'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { FormInput } from '@/app/components/FormInput';
import { ResetPasswordFormSchema, ResetPasswordFormType } from '@/types/types';
import { resetPasswordForEmail } from '@/utils/supabase/actions';

export default function ResetPasswordForm() {
  const methods = useForm<ResetPasswordFormType>({
    mode: 'onChange',
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (params: ResetPasswordFormType) => {
    await resetPasswordForEmail(params);
  };

  return (
    <Flex
      minH='100vh'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Box w='100%' border='2px' rounded='md' p='10' maxWidth='lg'>
        <Text fontSize='2xl' fontWeight='bold' mb='4' textAlign='center'>
          パスワードリセット
        </Text>
        <Text fontSize='md' mb='5' textAlign='center'>
          登録時に使ったメールアドレスを入力してください。
          <br />
          パスワードをリセットするためのURLを送信します。
        </Text>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              type='email'
              register={register('email')}
              placeholder='メールアドレス'
              errMessage={errors.email?.message}
            />
            <Button type='submit' w='100%' colorScheme='teal' mt='4'>
              送信
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
