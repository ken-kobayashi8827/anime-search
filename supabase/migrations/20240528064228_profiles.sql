set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_profile_for_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.profiles (user_id, is_admin)
  values (
    new.id, 
    new.raw_user_meta_data->>'is_admin'
  );
  return new;
end;
$function$
;

create policy "Enable read access for all users"
on "public"."vods"
as permissive
for select
to public
using (true);



