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
import { User } from '@supabase/supabase-js';

type Props = {
  anime: AnimeType;
  favoriteIds: number[];
  user: User | null;
  isAdmin?: boolean;
};

export default function AnimeCard({
  anime,
  favoriteIds,
  user,
  isAdmin,
}: Props) {
  const toast = useToast();

  const toggleFavorite = async (animeId: number) => {
    await updateFavorite(animeId).catch(() => {
      toast({
        title: 'お気に入りを変更できませんでした',
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
      {user && !isAdmin && (
        <CardFooter>
          <FavoriteIcon
            style={{
              fill: favoriteIds.includes(anime.id) ? 'red' : 'gray',
              cursor: 'pointer',
            }}
            onClick={() => toggleFavorite(anime.id)}
          />
        </CardFooter>
      )}
    </Card>
  );
}
