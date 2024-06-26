'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Heading, useToast, VStack } from '@chakra-ui/react';
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
import AnimeEditFormImage from './AnimeEditFormImage';
import FormCheckbox from '@/app/components/FormCheckbox';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { createAnime } from '@/actions/anime';

type PropsType = {
  vodLists: VodListType[] | undefined;
};

export default function AnimeCreateForm({ vodLists }: PropsType) {
  const currentSeason = getFilterSeason();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);
    const imgPath = `anime/${uuidv4()}`;
    const uploadImgUrl = await uploadImg(params.thumbnail[0], imgPath);
    const data = {
      title: params.title,
      status: params.status,
      season_name: params.seasonName,
      vods: params.vod,
      images: uploadImgUrl ? uploadImgUrl : '',
    };
    await createAnime(data).catch(() => {
      toast({
        title: 'エラー',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom',
        description: 'アニメの登録に失敗しました',
      });
    });
    setIsLoading(false);
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
            register={register('vod')}
            errMessage={errors.vod?.message}
          />
          <Button
            type='submit'
            w='50%'
            colorScheme='teal'
            mt='4'
            isLoading={isLoading}
            loadingText='作成中'
          >
            作成
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
}
