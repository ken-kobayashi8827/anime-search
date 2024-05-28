import { z } from 'zod';

export type AppMetaDataType = {
  app_metadata: {
    admin?: boolean;
    provider: string;
    providers: string[];
  };
};

export type SelectOptionsType = {
  label: string;
  value: number;
};

export type ProfileType = {
  username: string;
  profile_image: string | null;
};

export type VodListType = {
  id: number;
  name: string | null;
  created_at: string;
  updated_at: string | null;
};

export type AnimeVodType = {
  id: number;
  name: string | null;
};

export type AnimeType = {
  created_at: string;
  episodes_count: number | null;
  id: number;
  images: string | null;
  no_episodes: boolean | null;
  season_name: string | null;
  status: number;
  title: string;
  twitter_hashtag: string | null;
  twitter_username: string | null;
  updated_at: string;
  vods: AnimeVodType[];
};

export type UserType = {
  created_at: string;
  id: number;
  is_admin: boolean;
  profile_image: string | null;
  updated_at: string | null;
  user_id: string | null;
  username: string;
};

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
 * 管理画面ユーザー作成フォーム
 */
export const CreateUserFormSchema = z
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

export type CreateUserFormType = z.infer<typeof CreateUserFormSchema>;

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

/**
 * マイページフォーム
 */
const IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];
const IMAGE_SIZE_LIMIT = 2_000_000;
export const MyPageEditFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: '1文字以上で入力してください' })
    .max(20, { message: '20文字以下で入力してください' }),
  profileImage: z
    .custom<FileList>()
    .refine(
      (files) =>
        Array.from(files).every((file) => IMAGE_TYPES.includes(file.type)),
      {
        message: '.jpg/.jpeg/.pngのいずれかの画像を選択してください',
      }
    )
    .refine(
      (files) =>
        Array.from(files).every((file) => file.size < IMAGE_SIZE_LIMIT),
      {
        message: '添付できる画像ファイルは20MBまでです',
      }
    ),
});

export type MyPageEditFormType = z.infer<typeof MyPageEditFormSchema>;
export type MyPageUpdateType = {
  username: string;
  profile_image?: string | undefined;
};

/**
 * 管理者ログインフォーム
 */
export const AdminLoginFormSchema = z.object({
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

export type AdminLoginFormType = z.infer<typeof AdminLoginFormSchema>;

/**
 * アニメデータ編集フォーム
 */
export const AnimeEditFormSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .min(1, { message: '1文字以上で入力してください' })
    .max(100, { message: '100文字以下で入力してください' }),
  thumbnail: z
    .custom<FileList>()
    .refine(
      (files) =>
        Array.from(files).every((file) => IMAGE_TYPES.includes(file.type)),
      {
        message: '.jpg/.jpeg/.pngのいずれかの画像を選択してください',
      }
    )
    .refine(
      (files) =>
        Array.from(files).every((file) => file.size < IMAGE_SIZE_LIMIT),
      {
        message: '添付できる画像ファイルは20MBまでです',
      }
    ),
  status: z.string().transform((val) => Number(val)),
  seasonName: z
    .string()
    .min(1, { message: '1文字以上で入力してください' })
    .max(100, { message: '100文字以下で入力してください' })
    .nullable(),
  vod: z.array(z.string().transform((val) => Number(val))),
  createdAt: z.string(),
});

export type AnimeEditFormType = z.infer<typeof AnimeEditFormSchema>;
