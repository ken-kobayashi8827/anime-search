'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { FormInput } from '@/app/components/FormInput';
import { MyPageEditFormSchema, MyPageEditFormType } from '@/types/types';
import { FormImage } from '@/app/components/FormImage';
import { updateProfile } from '@/utils/supabase/actions';
import { createClient } from '@/utils/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';

type PropsType = {
  username?: string;
  profileImage?: string;
};

/**
 * 画像アップロード
 * @param formImg
 * @returns
 */
async function uploadImg(formImg: File) {
  if (!formImg) return;
  try {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    const imgPath = `profile/${userData.user?.id}/${uuidv4()}`;
    const { error } = await supabase.storage
      .from('images')
      .upload(imgPath, formImg);
    if (error) {
      throw new Error();
    }
    const { data } = supabase.storage.from('images').getPublicUrl(imgPath);
    return data.publicUrl;
  } catch (e) {
    redirect('/error');
  }
}

export default function MyPageEditForm({ username, profileImage }: PropsType) {
  const methods = useForm<MyPageEditFormType>({
    mode: 'onChange',
    resolver: zodResolver(MyPageEditFormSchema),
    defaultValues: {
      username: username,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (params: MyPageEditFormType) => {
    const uploadImgUrl = await uploadImg(params.profileImage);
    const updateData = {
      username: params.username,
      profile_image: uploadImgUrl,
    };
    await updateProfile(updateData);
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
          マイページ
        </Text>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label='ユーザー名'
              type='text'
              register={register('username')}
              placeholder=''
              errMessage={errors.username?.message}
            />
            <VStack alignItems='flex-start'>
              <Text>プロフィール画像</Text>
              <Image
                src={profileImage}
                alt='プロフィール画像'
                width='40px'
                h='40px'
                borderRadius='50%'
              />
            </VStack>
            <FormImage
              label=''
              type='file'
              register={register('profileImage')}
              errMessage={errors.profileImage?.message}
            />
            <Button type='submit' w='100%' colorScheme='teal' mt='4'>
              編集完了
            </Button>
          </form>
        </FormProvider>
        <Button w='100%' colorScheme='red' mt='3'>
          アカウント削除
        </Button>
      </Box>
    </Flex>
  );
}
