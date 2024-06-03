import {
  HStack,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export function AnimeCardListSkeleton() {
  return (
    <SimpleGrid
      spacing='40px'
      templateColumns='repeat(auto-fill, minmax(320px, 1fr))'
    >
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
    </SimpleGrid>
  );
}

export function FavoriteAnimeCardListSkeleton() {
  return (
    <SimpleGrid
      spacing='40px'
      templateColumns='repeat(auto-fill, minmax(320px, 1fr))'
    >
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
      <Skeleton height='420px' borderRadius='md' />
    </SimpleGrid>
  );
}

export function VodFilterSkeleton() {
  return (
    <HStack justify='center' align='center' wrap='wrap' mb='8'>
      <Skeleton height='40px' width='100px' borderRadius='md' />
      <Skeleton height='40px' width='100px' borderRadius='md' />
      <Skeleton height='40px' width='100px' borderRadius='md' />
      <Skeleton height='40px' width='100px' borderRadius='md' />
      <Skeleton height='40px' width='100px' borderRadius='md' />
      <Skeleton height='40px' width='100px' borderRadius='md' />
    </HStack>
  );
}
