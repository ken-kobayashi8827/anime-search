import { deleteAnime } from '@/actions/anime';
import { Button, useToast } from '@chakra-ui/react';

type PropsType = {
  animeId: number;
};

export default function DeleteButton({ animeId }: PropsType) {
  const toast = useToast();

  const handleDelete = async () => {
    const isSuccess = await deleteAnime(animeId);
    if (isSuccess) {
      toast({
        title: '削除完了',
        description: `ID: ${animeId}を削除済みに変更しました`,
        status: 'success',
        isClosable: true,
      });
    } else {
      toast({
        title: '削除失敗',
        description: `ID: ${animeId}の削除に失敗しました`,
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <Button colorScheme='red' onClick={handleDelete}>
      削除
    </Button>
  );
}
