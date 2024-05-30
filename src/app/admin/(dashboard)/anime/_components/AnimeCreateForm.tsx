'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { FormInput } from '@/app/components/FormInput';
import {
  AnimeCreateFormSchema,
  AnimeCreateFormType,
  VodListType,
} from '@/types/types';
import FormSelect from '@/app/components/FormSelect';
import {
  animeStatusOptions,
  createPreviewImgPath,
  getFilterSeason,
  uploadImg,
} from '@/utils/utils';
import { createAnime } from '@/utils/supabase/admin/actions';
import AnimeEditFormImage from './AnimeEditFormImage';
import FormCheckbox from '@/app/components/FormCheckbox';
import { v4 as uuidv4 } from 'uuid';

type PropsType = {
  vodLists: VodListType[] | undefined;
};

export default function AnimeCreateForm({ vodLists }: PropsType) {
  const currentSeason = getFilterSeason();

  const methods = useForm<AnimeCreateFormType>({
    mode: 'onChange',
    resolver: zodResolver(AnimeCreateFormSchema),
    defaultValues: {
      seasonName: currentSeason,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = async (params: AnimeCreateFormType) => {
    const imgPath = `anime/${uuidv4()}`;
    const uploadImgUrl = await uploadImg(params.thumbnail[0], imgPath);
    const data = {
      title: params.title,
      status: params.status,
      season_name: params.seasonName,
      vods: params.vod,
      images: uploadImgUrl ? uploadImgUrl : '',
    };
    await createAnime(data);
  };

  return (
    <Box maxW='xl'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading size='md' mb='3'>
            アニメタイトル
          </Heading>
          <FormInput
            label=''
            type='text'
            register={register('title')}
            placeholder=''
            errMessage={errors.title?.message}
          />
          <VStack alignItems='flex-start' mb='6'>
            <Heading size='md'>サムネイル画像</Heading>
            <AnimeEditFormImage
              label=''
              type='file'
              register={register('thumbnail')}
              errMessage={errors.thumbnail?.message}
              previewImgPath={createPreviewImgPath(watch('thumbnail'))}
            />
          </VStack>
          <Heading size='md' mb='3'>
            ステータス
          </Heading>
          <FormSelect
            label=''
            register={register('status')}
            options={animeStatusOptions}
            errMessage={errors.status?.message}
          />
          <Heading size='md' mb='3'>
            クール
          </Heading>
          <FormInput
            label=''
            type='text'
            register={register('seasonName')}
            placeholder=''
            disabled={true}
            errMessage={errors.seasonName?.message}
          />
          <Heading size='md' mb='3'>
            Vod
          </Heading>
          <FormCheckbox
            options={vodLists}
            register={register('vod')}
            errMessage={errors.vod?.message}
          />
          <Button type='submit' w='50%' colorScheme='teal' mt='4'>
            作成
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
}
