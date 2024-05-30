set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_anime(title text, status integer, season_name text, images text, vods integer[])
 RETURNS void
 LANGUAGE plpgsql
AS $function$
declare
  animes_new_row_id bigint;
  vods_row_id bigint;
  vod_id bigint;
begin
  insert into animes(title, status, season_name, images)
  values (create_anime.title, create_anime.status, create_anime.season_name, create_anime.images)
  returning id into animes_new_row_id;

  if array_length(vods, 1) is not null then
    foreach vods_row_id in array vods
    LOOP
      select id into vod_id from vods where id = vods_row_id;
      insert into animes_vods(anime_id, vod_id)
      values (animes_new_row_id, vod_id);
    END LOOP;
  end if;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$declare
    claims jsonb;
    is_admin boolean;
    username text;
    user_id_value uuid;
  begin
    select profiles.is_admin into is_admin from public.profiles where user_id = (event->>'user_id')::uuid;

    user_id_value := (event->>'user_id')::uuid;
    select profiles.username into username from public.profiles limit 1;



    -- Proceed only if the user is an admin
    if is_admin then
      claims := event->'claims';

      -- Check if 'app_metadata' exists in claims
      if jsonb_typeof(claims->'app_metadata') is null then
        -- If 'app_metadata' does not exist, create an empty object
        claims := jsonb_set(claims, '{app_metadata}', '{}');
      end if;

      -- Set a claim of 'admin'
      claims := jsonb_set(claims, '{app_metadata, admin}', 'true');

      -- Update the 'claims' object in the original event
      event := jsonb_set(event, '{claims}', claims);
    end if;

    -- Return the modified or original event
    return event;
  end;$function$
;
