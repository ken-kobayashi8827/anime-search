import {
  Avatar,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
} from '@chakra-ui/react';
import { HTMLInputTypeAttribute, useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormImageProps {
  label?: string;
  type?: HTMLInputTypeAttribute;
  register?: UseFormRegisterReturn;
  errMessage?: string;
  previewImgPath?: string;
}

export const FormImage = (props: FormImageProps) => {
  const {
    label = '',
    type = 'file',
    register,
    errMessage,
    previewImgPath,
  } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register ?? {};
  const handleChangeImg = () => {
    inputRef.current?.click();
  };

  return (
    <HStack alignItems='center'>
      <Avatar size='lg' name='プロフィール画像' src={previewImgPath} />
      <FormControl isInvalid={!!errMessage} w='0'>
        {label}
        <Input
          type={type}
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
