import {
  Button,
  FormControl,
  FormErrorMessage,
  Stack,
  Input,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import AnimeImage from '../../../../components/AnimeImage';
import { NO_IMG_PATH } from '@/utils/utils';

interface FormImageProps {
  alt?: string;
  register?: UseFormRegisterReturn;
  errMessage?: string;
  previewImgPath?: string | null;
}

export default function AnimeEditFormImage(props: FormImageProps) {
  const { alt = '', register, errMessage, previewImgPath } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register ?? {};
  const handleChangeImg = () => {
    inputRef.current?.click();
  };

  return (
    <Stack>
      <AnimeImage
        src={previewImgPath ? previewImgPath : NO_IMG_PATH}
        alt={alt}
        height='200px'
        width='300px'
        align='center'
      />
      <FormControl isInvalid={!!errMessage} w='100%'>
        <Input
          type='file'
          accept='.jpg, .jpeg, .png'
          hidden
          ref={(e) => {
            if (ref) {
              ref(e);
            }
            inputRef.current = e;
          }}
          {...rest}
        />
        {!!errMessage && (
          <FormErrorMessage w='100%'>{errMessage}</FormErrorMessage>
        )}
      </FormControl>
      <Button size='sm' colorScheme='blue' onClick={handleChangeImg}>
        画像を選択
      </Button>
    </Stack>
  );
}
