-- revoke delete on table "public"."profiles" from "anon";

-- revoke insert on table "public"."profiles" from "anon";

-- revoke references on table "public"."profiles" from "anon";

-- revoke select on table "public"."profiles" from "anon";

-- revoke trigger on table "public"."profiles" from "anon";

-- revoke truncate on table "public"."profiles" from "anon";

-- revoke update on table "public"."profiles" from "anon";

-- revoke delete on table "public"."profiles" from "authenticated";

-- revoke insert on table "public"."profiles" from "authenticated";

-- revoke references on table "public"."profiles" from "authenticated";

-- revoke select on table "public"."profiles" from "authenticated";

-- revoke trigger on table "public"."profiles" from "authenticated";

-- revoke truncate on table "public"."profiles" from "authenticated";

-- revoke update on table "public"."profiles" from "authenticated";

alter table "public"."profiles" add column "is_admin" boolean not null default false;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
  declare
    claims jsonb;
    is_admin boolean;
  begin
    -- Check if the user is marked as admin in the profiles table
    select is_admin into is_admin from profiles where user_id = (event->>'user_id')::uuid;

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
  end;
$function$
;

grant delete on table "public"."profiles" to "supabase_auth_admin";

grant insert on table "public"."profiles" to "supabase_auth_admin";

grant references on table "public"."profiles" to "supabase_auth_admin";

grant select on table "public"."profiles" to "supabase_auth_admin";

grant trigger on table "public"."profiles" to "supabase_auth_admin";

grant truncate on table "public"."profiles" to "supabase_auth_admin";

grant update on table "public"."profiles" to "supabase_auth_admin";
