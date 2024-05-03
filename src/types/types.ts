import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: '正しいメールアドレスの形式で入力してください' }),
  password: z
    .string()
    .min(6, { message: '6文字以上で入力してください' })
    .regex(
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
      '大文字・数字を1文字以上使用してください'
    ),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
