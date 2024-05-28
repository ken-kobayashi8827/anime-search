'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, HStack, useToast } from '@chakra-ui/react';
import { CreateUserFormSchema, CreateUserFormType } from '@/types/types';
import { FormInput } from '@/app/components/FormInput';
import LinkButton from '@/app/components/LinkButton';
import { createUser } from '@/utils/supabase/admin/actions';

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
          <HStack>
            <Button type='submit' w='30%' colorScheme='teal'>
              登録
            </Button>
            <LinkButton link={'/admin/users'} colorScheme='blue' text='戻る' />
          </HStack>
        </form>
      </FormProvider>
    </Box>
  );
}
