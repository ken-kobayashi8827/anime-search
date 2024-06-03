'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { FormInput } from '@/app/components/FormInput';
import {
  UpdatePasswordFormSchema,
  UpdatePasswordFormType,
} from '@/types/types';
import { updateUser } from '@/actions/auth';

export default function UpdatePasswordForm() {
  const toast = useToast();

  const methods = useForm<UpdatePasswordFormType>({
    mode: 'onChange',
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (params: UpdatePasswordFormType) => {
    await updateUser(params)
      .then(() => {
        toast({
          title: 'パスワード変更完了',
          description: 'パスワードの変更が完了しました',
          status: 'success',
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: 'パスワード変更失敗',
          description: 'パスワードの変更に失敗しました',
          status: 'error',
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      minH='100vh'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Box w='100%' border='2px' rounded='md' p='10' maxWidth='lg'>
        <Text fontSize='md' mb='5' textAlign='center' fontWeight='bold'>
          新しいパスワードを入力してください
        </Text>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button type='submit' w='100%' colorScheme='blue' mt='4'>
              パスワード変更
            </Button>
          </form>
        </FormProvider>
      </Box>
    </Flex>
  );
}
