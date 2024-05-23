const SEASON_WINTER_START_MONTH = 1;
const SEASON_SPRING_START_MONTH = 4;
const SEASON_SUMMER_START_MONTH = 7;
const SEASON_AUTUMN_START_MONTH = 10;
const STATUS_PRIVATE = 0;
const STATUS_PUBLIC = 1;
const STATUS_DELETED = 2;

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
  if (status === STATUS_PRIVATE) {
    return '非公開';
  } else if (status === STATUS_PUBLIC) {
    return '公開';
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
      return `${seasonYear}年 冬`;
    case 'spring':
      return `${seasonYear}年 春`;
    case 'summer':
      return `${seasonYear}年 夏`;
    case 'autumn':
      return `${seasonYear}年 秋`;
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
