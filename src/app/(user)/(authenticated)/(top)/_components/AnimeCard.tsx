'use client';

import VodTagList from '@/app/admin/(dashboard)/anime/_components/VodTagList';
import AnimeImage from '@/app/components/AnimeImage';
import { AnimeType } from '@/types/types';
import { addFavorite } from '@/utils/supabase/actions';
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
  favoriteIds: number[];
};

export default function AnimeCard({ anime, favoriteIds }: Props) {
  const toggleFavorite = (animeId: number) => {
    addFavorite(animeId);
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
            fill: favoriteIds.includes(anime.id) ? 'red' : 'gray',
            cursor: 'pointer',
          }}
          onClick={() => toggleFavorite(anime.id)}
        />
      </CardFooter>
    </Card>
  );
}
