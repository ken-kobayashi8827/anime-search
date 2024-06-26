create table "public"."vod_services" (
    "id" bigint generated by default as identity not null,
    "name" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."vod_services" enable row level security;

alter table "public"."animes" add column "vod" bigint;

CREATE UNIQUE INDEX vod_services_pkey ON public.vod_services USING btree (id);

alter table "public"."vod_services" add constraint "vod_services_pkey" PRIMARY KEY using index "vod_services_pkey";

alter table "public"."animes" add constraint "public_animes_vod_fkey" FOREIGN KEY (vod) REFERENCES vod_services(id) not valid;

alter table "public"."animes" validate constraint "public_animes_vod_fkey";

grant delete on table "public"."vod_services" to "anon";

grant insert on table "public"."vod_services" to "anon";

grant references on table "public"."vod_services" to "anon";

grant select on table "public"."vod_services" to "anon";

grant trigger on table "public"."vod_services" to "anon";

grant truncate on table "public"."vod_services" to "anon";

grant update on table "public"."vod_services" to "anon";

grant delete on table "public"."vod_services" to "authenticated";

grant insert on table "public"."vod_services" to "authenticated";

grant references on table "public"."vod_services" to "authenticated";

grant select on table "public"."vod_services" to "authenticated";

grant trigger on table "public"."vod_services" to "authenticated";

grant truncate on table "public"."vod_services" to "authenticated";

grant update on table "public"."vod_services" to "authenticated";

grant delete on table "public"."vod_services" to "service_role";

grant insert on table "public"."vod_services" to "service_role";

grant references on table "public"."vod_services" to "service_role";

grant select on table "public"."vod_services" to "service_role";

grant trigger on table "public"."vod_services" to "service_role";

grant truncate on table "public"."vod_services" to "service_role";

grant update on table "public"."vod_services" to "service_role";
