import { StatusOptionsType } from '@/types/types';
import { Box, FormControl, FormErrorMessage, Select } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

type FormSelectProps = {
  label: string;
  register?: UseFormRegisterReturn;
  options: StatusOptionsType[];
  errMessage?: string;
};

export default function FormSelect({
  label,
  register,
  options,
  errMessage,
}: FormSelectProps) {
  return (
    <Box mb='4'>
      <FormControl>
        {label}
        <Select bg='white' w='50%' {...register}>
          {options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {!!errMessage && <FormErrorMessage>{errMessage}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
}
