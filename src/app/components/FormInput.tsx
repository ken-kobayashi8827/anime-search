import { Box, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  disabled?: boolean;
  errMessage?: string;
}

export const FormInput = (props: FormInputProps) => {
  const {
    label = '',
    type = 'text',
    placeholder,
    register,
    disabled = false,
    errMessage,
  } = props;
  return (
    <Box mb='4'>
      <FormControl isInvalid={!!errMessage}>
        {label}
        <Input
          type={type}
          {...register}
          placeholder={placeholder}
          disabled={disabled}
        />
        {!!errMessage && <FormErrorMessage>{errMessage}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};
