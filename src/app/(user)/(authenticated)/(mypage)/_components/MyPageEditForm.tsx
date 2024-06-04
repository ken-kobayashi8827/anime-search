'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Heading, Stack, useToast, VStack } from '@chakra-ui/react';
import { FormInput } from '@/app/components/FormInput';
import {
  MyPageEditFormSchema,
  MyPageEditFormType,
  ProfileType,
} from '@/types/types';
import { FormProfileImage } from '@/app/components/FormProfileImage';
import { v4 as uuidv4 } from 'uuid';
import { createPreviewImgPath, uploadImg } from '@/utils/utils';
import { useState } from 'react';
import { updateProfile } from '@/actions/profile';

type PropsType = {
  profile: ProfileType;
  redirectPath: string;
};

export default function MyPageEditForm({ profile, redirectPath }: PropsType) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm<MyPageEditFormType>({
    mode: 'onChange',
    resolver: zodResolver(MyPageEditFormSchema),
    defaultValues: {
      username: profile.username,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = async (params: MyPageEditFormType) => {
    setIsLoading(true);

    const uploadPath = `profile/${uuidv4()}`;
    const uploadImgUrl = await uploadImg(
      params.profileImage[0],
      uploadPath,
      profile.profile_image ? profile.profile_image : null
    );
    const updateData = {
      username: params.username,
      profile_image: uploadImgUrl ? uploadImgUrl : null,
    };
    await updateProfile(updateData, profile.user_id, redirectPath).catch(() => {
      toast({
        title: 'プロフィール更新に失敗しました',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
    setIsLoading(false);
  };

  const previewProfileImgPath = createPreviewImgPath(watch('profileImage'));

  return (
    <Stack maxW={{ lg: 'lg' }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading size='md' mb='4'>
            ユーザー名
          </Heading>
          <FormInput
            label=''
            type='text'
            register={register('username')}
            placeholder=''
            errMessage={errors.username?.message}
          />
          <VStack alignItems='flex-start'>
            <Heading size='md'>プロフィール画像</Heading>
            <FormProfileImage
              register={register('profileImage')}
              errMessage={errors.profileImage?.message}
              previewImgPath={
                previewProfileImgPath
                  ? previewProfileImgPath
                  : profile.profile_image
              }
            />
          </VStack>
          <Button
            type='submit'
            w={{ base: '100%', lg: '200px' }}
            colorScheme='teal'
            mt='4'
            isLoading={isLoading}
            loadingText='更新中'
          >
            編集完了
          </Button>
        </form>
      </FormProvider>
    </Stack>
  );
}
