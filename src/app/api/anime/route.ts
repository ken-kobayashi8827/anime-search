const BASE_URL = 'https://api.annict.com/v1/';
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ANNICT_ACCESS_TOKEN;

const SEASON_WINTER_START_MONTH = 1;
const SEASON_SPRING_START_MONTH = 4;
const SEASON_SUMMER_START_MONTH = 7;
const SEASON_AUTUMN_START_MONTH = 10;
const PER_PAGE = 50;

/**
 * Annict APIデータ取得
 */
export async function GET() {
  const filterSeason = getFilterSeason();

  // TODO: エラー対応
  const res = await fetch(
    `https://api.annict.com/v1/works?fields=id&per_page=${PER_PAGE}&filter_season=${filterSeason}`,
    {
      headers: {
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_ANNICT_ACCESS_TOKEN,
      },
    }
  );
  const data = await res.json();

  const totalCount = data.total_count;
  const pageCount = Math.ceil(totalCount / PER_PAGE);
  const resArr = [];
  for (let i = 1; i <= pageCount; i++) {
    const res = await fetch(
      `https://api.annict.com/v1/works?fields=id,title,season_name,images,no_episodes,episodes_count,twitter_username,twitter_hashtag&page=${i}&per_page=${PER_PAGE}&filter_season=${filterSeason}`,
      {
        headers: {
          Authorization:
            'Bearer ' + process.env.NEXT_PUBLIC_ANNICT_ACCESS_TOKEN,
        },
      }
    );
    const data = await res.json();
    resArr.push(data);
  }

  return Response.json(resArr);
}

/**
 * 取得するクール文字列の作成
 * @returns
 */
function getFilterSeason() {
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
}
