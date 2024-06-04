create policy "Enable delete for users based on user_id"
on "storage"."objects"
as permissive
for delete
to authenticated
using (true);



