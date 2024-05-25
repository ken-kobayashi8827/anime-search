alter table "public"."animes" drop constraint "public_animes_vod_fkey";

alter table "public"."animes" drop column vod;

alter table "public"."animes" add column vod bigint[];

create policy "vod_services admin users"
on "public"."vod_services"
as permissive
for all
to authenticated
using (((((auth.jwt() -> 'app_metadata'::text) ->> 'admin'::text))::boolean = true));
