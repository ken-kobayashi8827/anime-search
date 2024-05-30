create table "public"."favorites" (
    "user_id" uuid not null,
    "anime_id" bigint not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."favorites" enable row level security;

CREATE UNIQUE INDEX favorites_pkey ON public.favorites USING btree (user_id, anime_id);

alter table "public"."favorites" add constraint "favorites_pkey" PRIMARY KEY using index "favorites_pkey";

alter table "public"."favorites" add constraint "public_favorites_anime_id_fkey" FOREIGN KEY (anime_id) REFERENCES animes(id) not valid;

alter table "public"."favorites" validate constraint "public_favorites_anime_id_fkey";

alter table "public"."favorites" add constraint "public_favorites_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."favorites" validate constraint "public_favorites_user_id_fkey";

grant delete on table "public"."favorites" to "anon";

grant insert on table "public"."favorites" to "anon";

grant references on table "public"."favorites" to "anon";

grant select on table "public"."favorites" to "anon";

grant trigger on table "public"."favorites" to "anon";

grant truncate on table "public"."favorites" to "anon";

grant update on table "public"."favorites" to "anon";

grant delete on table "public"."favorites" to "authenticated";

grant insert on table "public"."favorites" to "authenticated";

grant references on table "public"."favorites" to "authenticated";

grant select on table "public"."favorites" to "authenticated";

grant trigger on table "public"."favorites" to "authenticated";

grant truncate on table "public"."favorites" to "authenticated";

grant update on table "public"."favorites" to "authenticated";

grant delete on table "public"."favorites" to "service_role";

grant insert on table "public"."favorites" to "service_role";

grant references on table "public"."favorites" to "service_role";

grant select on table "public"."favorites" to "service_role";

grant trigger on table "public"."favorites" to "service_role";

grant truncate on table "public"."favorites" to "service_role";

grant update on table "public"."favorites" to "service_role";

create policy "認証済みユーザー いいね作成"
on "public"."favorites"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "認証済みユーザー いいね取得"
on "public"."favorites"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));



