import NextLink from 'next/link';
import { HStack, Link, Tag } from '@chakra-ui/react';
import { getVodDetails } from '@/utils/utils';
import { AnimeVodType } from '@/types/types';

type PropsType = {
  vodData: AnimeVodType[];
  title?: string;
};

export default function VodTagList({ vodData, title }: PropsType) {
  return (
    <HStack flexWrap='wrap'>
      {vodData.map((vod) => {
        const { color, link } = getVodDetails(vod.id);
        return (
          <Link as={NextLink} href={`${link}${title}`} isExternal>
            <Tag key={vod.id} colorScheme={color}>
              {vod.name}
            </Tag>
          </Link>
        );
      })}
    </HStack>
  );
}
