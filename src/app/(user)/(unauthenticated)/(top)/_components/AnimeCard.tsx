'use client';

import VodTagList from '@/app/admin/(dashboard)/anime/_components/VodTagList';
import AnimeImage from '@/app/components/AnimeImage';
import { AnimeType } from '@/types/types';
import { convertSeasonName } from '@/utils/utils';
import { Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react';

type Props = {
  anime: AnimeType;
};

export default function AnimeCard({ anime }: Props) {
  return (
    <Card>
      <CardBody>
        <AnimeImage
          src={anime.images}
          alt={anime.title}
          borderRadius='lg'
          align='center'
          height='150px'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{anime.title}</Heading>
          <Text fontSize='md'>{convertSeasonName(anime.season_name)}</Text>
          {anime.vods && <VodTagList vodData={anime.vods} />}
        </Stack>
      </CardBody>
    </Card>
  );
}
