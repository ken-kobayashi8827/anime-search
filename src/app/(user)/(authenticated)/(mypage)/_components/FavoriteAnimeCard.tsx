'use client';

import VodTagList from '@/app/admin/(dashboard)/anime/_components/VodTagList';
import AnimeImage from '@/app/components/AnimeImage';
import { AnimeType } from '@/types/types';
import { updateFavorite } from '@/utils/supabase/actions';
import { convertSeasonName } from '@/utils/utils';
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import FavoriteIcon from '@mui/icons-material/Favorite';

type Props = {
  anime: AnimeType;
};

const toggleFavorite = async (animeId: number) => {
  await updateFavorite(animeId);
};

export default function FavoriteAnimeCard({ anime }: Props) {
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
