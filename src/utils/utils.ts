import { SelectOptionsType } from '@/types/types';
import { createClient } from './supabase/client';

const SEASON_WINTER_START_MONTH = 1;
const SEASON_SPRING_START_MONTH = 4;
const SEASON_SUMMER_START_MONTH = 7;
const SEASON_AUTUMN_START_MONTH = 10;
const VOD_NETFLIX = 1;
const VOD_DANIME = 2;
const VOD_BANDAI_CHANNEL = 3;
const VOD_UNEXT = 4;
const VOD_AMAZON_PRIME_VIDEO = 5;
const VOD_ABEMA = 6;
export const STATUS_PUBLIC = 0;
export const STATUS_PRIVATE = 1;
export const STATUS_DELETED = 2;
export const NO_IMG_PATH = '/img/no-image01.png';
export const PROFILE_NO_IMG_PATH = '/img/default.png';

/**
 * ステータスオブジェクト
 */
export const animeStatusOptions: SelectOptionsType[] = [
  {
    label: '公開',
    value: STATUS_PUBLIC,
  },
  {
    label: '非公開',
    value: STATUS_PRIVATE,
  },

  {
    label: '削除済み',
    value: STATUS_DELETED,
  },
];

/**
 * 取得するクール文字列の作成
 * @returns
 */
export function getFilterSeason() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (month >= SEASON_WINTER_START_MONTH && month < SEASON_SPRING_START_MONTH) {
    return `${year}-winter`;
  } else if (
    month >= SEASON_SPRING_START_MONTH &&
    month < SEASON_SUMMER_START_MONTH
  ) {
    return `${year}-spring`;
  } else if (
    month >= SEASON_SUMMER_START_MONTH &&
    month < SEASON_AUTUMN_START_MONTH
  ) {
    return `${year}-summer`;
  } else if (
    month >= SEASON_AUTUMN_START_MONTH &&
    month < SEASON_WINTER_START_MONTH
  ) {
    return `${year}-autumn`;
  }

  return `${year}-spring`;
}

/**
 * ステータス文字列として返す
 * @param status
 * @returns
 */
export function getAnimeStatusName(status: number) {
  if (status === STATUS_PUBLIC) {
    return '公開';
  } else if (status === STATUS_PRIVATE) {
    return '非公開';
  } else if (status === STATUS_DELETED) {
    return '削除済み';
  }
}

/**
 * クールをわかりやすい文字列に変換
 * @param season
 * @returns
 */
export function convertSeasonName(season: string | null) {
  if (!season) {
    return season;
  }

  // 年を取得
  const seasonYear = season.substr(0, season.indexOf('-'));
  const seasonName = season.substr(season.indexOf('-') + 1);

  switch (seasonName) {
    case 'winter':
      return `${seasonYear}年 冬アニメ`;
    case 'spring':
      return `${seasonYear}年 春アニメ`;
    case 'summer':
      return `${seasonYear}年 夏アニメ`;
    case 'autumn':
      return `${seasonYear}年 秋アニメ`;
    default:
      return seasonName;
  }
}

/**
 * ページネーション作成
 * @param currentPage
 * @param totalPages
 * @returns
 */
export const generatePagination = (currentPage: number, totalPages: number) => {
  // totalPagesの分だけ[1, 2, 3]のような配列を作成する
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const getVodDetails = (vod: number) => {
  switch (vod) {
    case VOD_NETFLIX:
      return {
        color: 'red',
        link: 'https://www.netflix.com/search?q=',
      };
    case VOD_DANIME:
      return {
        color: 'pink',
        link: 'https://animestore.docomo.ne.jp/animestore/sch_pc?vodTypeList=svod_tvod&searchKey=',
      };
    case VOD_BANDAI_CHANNEL:
      return {
        color: 'yellow',
        link: 'https://www.b-ch.com/search/text/?search_txt=',
      };
    case VOD_UNEXT:
      return {
        color: 'teal',
        link: 'https://video.unext.jp/freeword?query=',
      };
    case VOD_AMAZON_PRIME_VIDEO:
      return {
        color: 'blue',
        link: 'https://www.amazon.co.jp/s?i=instant-video&k=',
      };
    case VOD_ABEMA:
      return {
        color: 'green',
        link: 'https://abema.tv/search?q=',
      };
    default:
      return {
        color: 'gray',
        link: '#',
      };
  }
};

/**
 * 画像アップロード プレビューのパスを返す
 * @param previewImg
 * @returns
 */
export function createPreviewImgPath(previewImg: FileList) {
  let previewImgPath = '';
  if (previewImg && previewImg.length > 0) {
    previewImgPath = window.URL.createObjectURL(previewImg[0]);
  }
  return previewImgPath;
}

/**
 * 画像アップロード
 * @param formImg
 * @param uploadPath
 * @param currentImgPath
 * @returns
 */
export async function uploadImg(
  formImg: File,
  uploadPath: string,
  currentImgPath: string | null = null
) {
  if (!formImg) return;
  const supabase = createClient();
  const uploadImgExtension = formImg.name.split('.').pop();
  const uploadNewPath = `${uploadPath}.${uploadImgExtension}`;

  // 既存の画像をストレージから削除
  if (currentImgPath) {
    await deleteImg(currentImgPath);
  }

  // 画像をストレージに保存
  const { error } = await supabase.storage
    .from('images')
    .upload(uploadNewPath, formImg);
  if (error) {
    throw new Error();
  }

  // ストレージから画像URlを取得
  const { data } = supabase.storage.from('images').getPublicUrl(uploadNewPath);

  return data.publicUrl;
}

/**
 * 既存画像をストレージから削除する
 * @param currentImgPath
 * @returns
 */
async function deleteImg(currentImgPath: string) {
  try {
    const path = new URL(currentImgPath).pathname;
    const imgPath = path.split('/').slice(6).join('/');
    // 画像URLからフォルダ+画像名を取得
    const supabase = createClient();
    const { error } = await supabase.storage.from('images').remove([imgPath]);
    if (error) {
      throw new Error();
    }
  } catch (e) {
    return { error: 'Failed to delete Image from supabase' };
  }
  return;
}
