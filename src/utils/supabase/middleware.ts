import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { Database } from '../../../schema';
import { AppMetaDataType } from '@/types/types';
import jwt from 'jsonwebtoken';

export async function updateSession(request: NextRequest) {
  const url = new URL(request.url);
  const origin = url.origin;
  request.headers.set('x-origin', origin);

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // 管理画面 管理ユーザーでない場合
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      const accessToken = jwt.decode(
        data.session.access_token
      ) as AppMetaDataType;
      const appMetaData = accessToken.app_metadata;
      if (!appMetaData.admin) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } else {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  } else {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  await supabase.auth.getUser();

  return response;
}
