import { AnimeVodType, VodListType } from '@/types/types';
import {
  Box,
  Checkbox,
  CheckboxGroup,
  FormErrorMessage,
  VStack,
} from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

type PropsType = {
  options: VodListType[] | undefined;
  defaultValue: AnimeVodType[];
  register?: UseFormRegisterReturn;
  errMessage?: string;
};

export default function FormCheckbox({
  options,
  defaultValue,
  register,
  errMessage,
}: PropsType) {
  return (
    <Box mb='8'>
      <VStack align='flex-start'>
        {options?.map((option) => (
          <Checkbox
            key={option.id}
            value={option.id}
            {...register}
            defaultChecked={
              defaultValue
                ? defaultValue.map((item) => item.id).includes(option.id)
                : false
            }
          >
            {option.name}
          </Checkbox>
        ))}
      </VStack>
      {!!errMessage && <FormErrorMessage>{errMessage}</FormErrorMessage>}
    </Box>
  );
}
