import { getFilterSeason } from '@/utils/utils';

const BASE_URL = 'https://api.annict.com/v1';
const PER_PAGE = 50;

/**
 * Annict APIデータ取得
 */
export async function GET() {
  const filterSeason = getFilterSeason();

  // TODO: エラー対応
  const res = await fetch(
    `${BASE_URL}/works?fields=id&per_page=${PER_PAGE}&filter_season=${filterSeason}`,
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
      `${BASE_URL}/works?fields=id,title,season_name,images,no_episodes,episodes_count,twitter_username,twitter_hashtag&page=${i}&per_page=${PER_PAGE}&filter_season=${filterSeason}`,
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
