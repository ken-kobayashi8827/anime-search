import { HStack, Tag } from '@chakra-ui/react';
import { getVodDetails } from '@/utils/utils';
import { AnimeVodType } from '@/types/types';

type PropsType = {
  vodData: AnimeVodType[];
};

export default function VodTagList({ vodData }: PropsType) {
  return (
    <HStack flexWrap='wrap'>
      {vodData.map((vod) => {
        const color = getVodDetails(vod.id);
        return (
          <Tag key={vod.id} colorScheme={color}>
            {vod.name}
          </Tag>
        );
      })}
    </HStack>
  );
}
