'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { FormInput } from '@/app/components/FormInput';
import {
  AnimeEditFormSchema,
  AnimeEditFormType,
  AnimeType,
  VodListType,
} from '@/types/types';
import FormSelect from '@/app/components/FormSelect';
import { convertSeasonName, animeStatusOptions } from '@/utils/utils';
import { updateAnimeData } from '@/utils/supabase/admin/actions';
import { createClient } from '@/utils/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import AnimeEditFormImage from './AnimeEditFormImage';
import FormCheckbox from '@/app/components/FormCheckbox';

type PropsType = {
  anime: AnimeType | undefined;
  vodLists: VodListType[] | undefined;
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
    const imgPath = `anime/${uuidv4()}`;
    const { error } = await supabase.storage
      .from('images')
      .upload(imgPath, formImg);
    if (error) {
      throw new Error();
    }
    const { data } = supabase.storage.from('images').getPublicUrl(imgPath);
    return data.publicUrl;
  } catch (e) {
    console.error(`Failed to upload image`);
  }
}

export default function AnimeEditForm({ anime, vodLists }: PropsType) {
  const methods = useForm<AnimeEditFormType>({
    mode: 'onChange',
    resolver: zodResolver(AnimeEditFormSchema),
    defaultValues: {
      id: anime!.id,
      title: anime!.title,
      status: anime!.status,
      seasonName: convertSeasonName(anime!.season_name),
      createdAt: new Date(anime!.created_at).toLocaleString('ja-JP'),
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  // アップロード画像プレビュー
  const previewImg = watch('thumbnail');
  let previewImgPath = anime!.images;
  if (previewImg && previewImg.length > 0) {
    previewImgPath = window.URL.createObjectURL(previewImg[0]);
  }

  const onSubmit = async (params: AnimeEditFormType) => {
    const uploadImgUrl = await uploadImg(params.thumbnail[0]);
    const updateData = {
      images: uploadImgUrl,
      status: params.status,
      vod: params.vod,
    };
    await updateAnimeData(params.id, updateData);
  };

  return (
    <Box mx='auto' maxW='2xl'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading size='md' mb='3'>
            ID
          </Heading>
          <FormInput
            label=''
            type='text'
            register={register('id')}
            placeholder=''
            disabled={true}
            errMessage={errors.id?.message}
          />
          <Heading size='md' mb='3'>
            アニメタイトル
          </Heading>
          <FormInput
            label=''
            type='text'
            register={register('title')}
            placeholder=''
            disabled={true}
            errMessage={errors.title?.message}
          />
          <VStack alignItems='flex-start' mb='6'>
            <Heading size='md'>サムネイル画像</Heading>
            <AnimeEditFormImage
              label=''
              alt={anime!.title}
              type='file'
              register={register('thumbnail')}
              errMessage={errors.thumbnail?.message}
              previewImgPath={previewImgPath}
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
            defaultValue={anime!.vod}
            register={register('vod')}
            errMessage={errors.vod?.message}
          />
          <Heading size='md' mb='3'>
            作成日
          </Heading>
          <FormInput
            label=''
            type='text'
            register={register('createdAt')}
            placeholder=''
            disabled={true}
            errMessage={errors.createdAt?.message}
          />
          <Button type='submit' w='100%' colorScheme='teal' mt='4'>
            編集完了
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
}
