import { Box, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormImageProps {
  label?: string;
  type?: HTMLInputTypeAttribute;
  register?: UseFormRegisterReturn;
  errMessage?: string;
}

export const FormImage = (props: FormImageProps) => {
  const { label = '', type = 'file', register, errMessage } = props;
  return (
    <Box mb='4'>
      <FormControl isInvalid={!!errMessage}>
        {label}
        <Input
          type={type}
          accept='.jpg, .jpeg, .png'
          {...register}
          border='none'
        />
        {!!errMessage && <FormErrorMessage>{errMessage}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};
