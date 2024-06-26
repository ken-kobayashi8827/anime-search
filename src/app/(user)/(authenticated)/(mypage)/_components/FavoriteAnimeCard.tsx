'use client';

import { updateFavorite } from '@/actions/favorite';
import VodTagList from '@/app/admin/(dashboard)/anime/_components/VodTagList';
import AnimeImage from '@/app/components/AnimeImage';
import { AnimeType } from '@/types/types';
import { convertSeasonName } from '@/utils/utils';
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import FavoriteIcon from '@mui/icons-material/Favorite';

type Props = {
  anime: AnimeType;
};

export default function FavoriteAnimeCard({ anime }: Props) {
  const toast = useToast();

  const toggleFavorite = async (animeId: number) => {
    await updateFavorite(animeId).catch(() => {
      toast({
        title: 'お気に入りを解除できませんでした',
        status: 'error',
        isClosable: true,
      });
    });
  };

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
          {anime.vods && (
            <VodTagList vodData={anime.vods} title={anime.title} />
          )}
        </Stack>
      </CardBody>
      <CardFooter>
        <FavoriteIcon
          style={{
            fill: 'red',
            cursor: 'pointer',
          }}
          onClick={() => toggleFavorite(anime.id)}
        />
      </CardFooter>
    </Card>
  );
}
