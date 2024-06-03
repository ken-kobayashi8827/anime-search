create policy "認証済みユーザー お気に入り削除"
on "public"."favorites"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));



