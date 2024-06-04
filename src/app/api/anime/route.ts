import { getFilterSeason } from '@/utils/utils';
import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.annict.com/v1';
const PER_PAGE = 50;

/**
 * Annict APIデータ取得
 */
export async function GET() {
  try {
    // 現在のクールを取得
    const filterSeason = getFilterSeason();

    // ANNICT APIでページ数を取得
    const res = await fetch(
      `${BASE_URL}/works?fields=id&per_page=${PER_PAGE}&filter_season=${filterSeason}`,
      {
        headers: {
          Authorization:
            'Bearer ' + process.env.NEXT_PUBLIC_ANNICT_ACCESS_TOKEN,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Fetch Annict failed with status ${res.status}`);
    }

    const data = await res.json();
    // アニメデータ数
    const totalCount = data.total_count;
    // アニメデータ数からページ数算出
    const pageCount = Math.ceil(totalCount / PER_PAGE);

    // アニメデータを取得
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

      if (!res.ok) {
        throw new Error(`Fetch Annict failed with status ${res.status}`);
      }

      const data = await res.json();
      resArr.push(data);
    }

    return NextResponse.json(resArr);
  } catch (e) {
    return NextResponse.error();
  }
}
