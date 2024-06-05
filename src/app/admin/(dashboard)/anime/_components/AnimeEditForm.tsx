'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Heading, useToast, VStack } from '@chakra-ui/react';
import { FormInput } from '@/app/components/FormInput';
import {
  AnimeEditFormSchema,
  AnimeEditFormType,
  AnimeType,
  VodListType,
} from '@/types/types';
import FormSelect from '@/app/components/FormSelect';
import {
  convertSeasonName,
  animeStatusOptions,
  uploadImg,
  createPreviewImgPath,
} from '@/utils/utils';
import { v4 as uuidv4 } from 'uuid';
import AnimeEditFormImage from './AnimeEditFormImage';
import FormCheckbox from '@/app/components/FormCheckbox';
import { useState } from 'react';
import { updateAnimeData } from '@/actions/anime';

type PropsType = {
  anime: AnimeType;
  vodLists: VodListType[] | undefined;
};

export default function AnimeEditForm({ anime, vodLists }: PropsType) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm<AnimeEditFormType>({
    mode: 'onChange',
    resolver: zodResolver(AnimeEditFormSchema),
    defaultValues: {
      id: anime.id,
      title: anime.title,
      status: anime.status,
      seasonName: convertSeasonName(anime.season_name),
      createdAt: new Date(anime.created_at).toLocaleString('ja-JP'),
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = async (params: AnimeEditFormType) => {
    setIsLoading(true);
    const imgPath = `anime/${uuidv4()}`;
    const uploadImgUrl = await uploadImg(
      params.thumbnail[0],
      imgPath,
      anime.images
    );
    const updateData = {
      images: uploadImgUrl,
      status: params.status,
    };
    await updateAnimeData(params.id, updateData, params.vod).catch(() => {
      toast({
        title: 'エラー',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom',
        description: 'アニメの更新に失敗しました',
      });
      setIsLoading(false);
    });
  };

  const previewThumbnailPath = createPreviewImgPath(watch('thumbnail'));

  return (
    <Box maxW='xl'>
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
              alt={anime.title}
              register={register('thumbnail')}
              errMessage={errors.thumbnail?.message}
              previewImgPath={
                previewThumbnailPath ? previewThumbnailPath : anime.images
              }
            />
          </VStack>
          <Heading size='md' mb='3'>
            ステータス
          </Heading>
          <FormSelect
            label=''
            register={register('status', { valueAsNumber: true })}
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
            defaultValue={anime.vods}
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
          <Button
            type='submit'
            w='50%'
            colorScheme='teal'
            mt='4'
            isLoading={isLoading}
            loadingText='更新中'
          >
            編集完了
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
}
