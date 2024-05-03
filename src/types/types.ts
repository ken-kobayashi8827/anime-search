import { z } from 'zod';

/**
 * ログインフォーム
 */
export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: '正しいメールアドレスの形式で入力してください' }),
  password: z
    .string()
    .min(8, { message: '8文字以上で入力してください' })
    .regex(
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
      '大文字・数字を1文字以上使用してください'
    ),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

/**
 * 新規登録フォーム
 */
export const SignUpFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: '正しいメールアドレスの形式で入力してください' }),
    password: z
      .string()
      .min(8, { message: '8文字以上で入力してください' })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
        '大文字・数字を1文字以上使用してください'
      ),
    confirmPassword: z
      .string()
      .min(8, { message: '8文字以上で入力してください' })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
        '大文字・数字を1文字以上使用してください'
      ),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        message: 'パスワードが一致しません',
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;

/**
 * パスワードリセットフォーム
 */
export const ResetPasswordFormSchema = z.object({
  email: z
    .string()
    .email({ message: '正しいメールアドレスの形式で入力してください' }),
});

export type ResetPasswordFormType = z.infer<typeof ResetPasswordFormSchema>;

/**
 * パスワード更新フォーム
 */
export const UpdatePasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: '8文字以上で入力してください' })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
        '大文字・数字を1文字以上使用してください'
      ),
    confirmPassword: z
      .string()
      .min(8, { message: '8文字以上で入力してください' })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
        '大文字・数字を1文字以上使用してください'
      ),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        message: 'パスワードが一致しません',
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type UpdatePasswordFormType = z.infer<typeof UpdatePasswordFormSchema>;
