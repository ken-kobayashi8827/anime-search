import { HStack, Tag } from '@chakra-ui/react';
import { getVodDetails } from '@/utils/utils';

type PropsType = {
  vodData: number[];
};

export default function VodTagList({ vodData }: PropsType) {
  return (
    <HStack flexWrap='wrap'>
      {vodData.map((vod) => {
        const { name, color } = getVodDetails(vod);
        return (
          <Tag key={name} colorScheme={color}>
            {name}
          </Tag>
        );
      })}
    </HStack>
  );
}
