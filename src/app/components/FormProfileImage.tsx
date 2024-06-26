import { PROFILE_NO_IMG_PATH } from '@/utils/utils';
import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Image,
  Input,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormImageProps {
  register?: UseFormRegisterReturn;
  errMessage?: string;
  previewImgPath: string | null;
}

export const FormProfileImage = (props: FormImageProps) => {
  const { register, errMessage, previewImgPath } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register ?? {};
  const handleChangeImg = () => {
    inputRef.current?.click();
  };

  return (
    <HStack alignItems='center'>
      <Image
        borderRadius='full'
        alt='プロフィール画像'
        boxSize='80px'
        src={previewImgPath ? previewImgPath : PROFILE_NO_IMG_PATH}
      />
      <FormControl isInvalid={!!errMessage} w='0'>
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
        {!!errMessage && <FormErrorMessage>{errMessage}</FormErrorMessage>}
      </FormControl>
      <Button size='sm' colorScheme='blue' onClick={handleChangeImg}>
        画像を選択
      </Button>
    </HStack>
  );
};
