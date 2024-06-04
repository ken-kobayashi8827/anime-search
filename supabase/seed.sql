SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.6 (Ubuntu 15.6-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('images', 'images', NULL, '2024-05-06 12:35:31.152352+09', '2024-05-06 12:35:31.152352+09', true, false, 2097152, '{image/jpeg,image/jpg,image/png}', NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id") VALUES
	('7baf0d47-6b50-4349-bbe5-ec17b7432a7c', 'images', 'profile/4b4409de-9ed9-4c6b-ad86-69b989eb3985/c5034019-89be-431c-b8d5-dff094d3357e', '4b4409de-9ed9-4c6b-ad86-69b989eb3985', '2024-05-09 10:54:21.68714+09', '2024-05-09 10:54:21.68714+09', '2024-05-09 10:54:21.68714+09', '{"eTag": "\"57ee0a62984f8613efc358d9c6fd9cef\"", "size": 156381, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-09T01:54:22.000Z", "contentLength": 156381, "httpStatusCode": 200}', '88572919-8fe6-47d3-9000-8c081c4ff938', '4b4409de-9ed9-4c6b-ad86-69b989eb3985'),
	('3a2cf552-c301-4598-8adf-6fcad520f8bf', 'images', 'profile/4b4409de-9ed9-4c6b-ad86-69b989eb3985/34172812-e974-42e0-a970-694092f05bf3', '4b4409de-9ed9-4c6b-ad86-69b989eb3985', '2024-05-09 11:43:04.613558+09', '2024-05-09 11:43:04.613558+09', '2024-05-09 11:43:04.613558+09', '{"eTag": "\"57ee0a62984f8613efc358d9c6fd9cef\"", "size": 156381, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-09T02:43:05.000Z", "contentLength": 156381, "httpStatusCode": 200}', 'fade8cac-362a-4b46-bfd7-ccb68764e15c', '4b4409de-9ed9-4c6b-ad86-69b989eb3985'),
	('bad22fd6-ddc9-4e75-93af-25be477b0207', 'images', 'profile/b733c8cd-477c-4434-b257-ec47073bddbe/kkrn_icon_user_4.png', 'b733c8cd-477c-4434-b257-ec47073bddbe', '2024-05-07 05:48:53.412947+09', '2024-05-07 06:47:40.747937+09', '2024-05-07 05:48:53.412947+09', '{"eTag": "\"7239369567579103459c07dea91ac552\"", "size": 137022, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-06T21:47:41.000Z", "contentLength": 137022, "httpStatusCode": 200}', '039f2d3b-bef4-4cd5-b452-dbfb28d86838', 'b733c8cd-477c-4434-b257-ec47073bddbe'),
	('e9fb994f-b508-4dca-850f-05f59d52cbbb', 'images', 'profile/b733c8cd-477c-4434-b257-ec47073bddbe/d20abe84-3c95-4e98-a193-38ed19ad488b', 'b733c8cd-477c-4434-b257-ec47073bddbe', '2024-05-07 06:52:45.177321+09', '2024-05-07 06:52:45.177321+09', '2024-05-07 06:52:45.177321+09', '{"eTag": "\"57ee0a62984f8613efc358d9c6fd9cef\"", "size": 156381, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-06T21:52:46.000Z", "contentLength": 156381, "httpStatusCode": 200}', 'c325fc09-bdd0-44ac-a51c-14ea5949c9aa', 'b733c8cd-477c-4434-b257-ec47073bddbe'),
	('606a7b7a-f7f2-43c2-a53c-27e36d51130f', 'images', 'profile/4b4409de-9ed9-4c6b-ad86-69b989eb3985/72857ae0-3cc4-4646-a395-7cea76dbe61e', '4b4409de-9ed9-4c6b-ad86-69b989eb3985', '2024-05-09 11:59:43.113247+09', '2024-05-09 11:59:43.113247+09', '2024-05-09 11:59:43.113247+09', '{"eTag": "\"c7ce3c530c3496c698030a6fa7c7f136\"", "size": 149037, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-09T02:59:43.000Z", "contentLength": 149037, "httpStatusCode": 200}', '6c1af14a-848e-496e-a749-021f231e0714', '4b4409de-9ed9-4c6b-ad86-69b989eb3985'),
	('f6e6c1d1-8e11-4163-b20b-d5af91d9c0bf', 'images', 'profile/b733c8cd-477c-4434-b257-ec47073bddbe/7e2057e6-1700-4b9a-8dff-a33d44f5dabc', 'b733c8cd-477c-4434-b257-ec47073bddbe', '2024-05-07 09:48:39.290379+09', '2024-05-07 09:48:39.290379+09', '2024-05-07 09:48:39.290379+09', '{"eTag": "\"d951e07f76bac7cdd640debf87f0d24f\"", "size": 163887, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-07T00:48:40.000Z", "contentLength": 163887, "httpStatusCode": 200}', 'f3417d7b-5773-4d35-ba96-b2bdc00d56cb', 'b733c8cd-477c-4434-b257-ec47073bddbe'),
	('196ad35c-812e-45db-b426-b098a836d1b4', 'images', 'profile/4b4409de-9ed9-4c6b-ad86-69b989eb3985/0e36f9c7-9864-4da1-91e0-4d004af5e022', '4b4409de-9ed9-4c6b-ad86-69b989eb3985', '2024-05-09 09:31:46.913363+09', '2024-05-09 09:31:46.913363+09', '2024-05-09 09:31:46.913363+09', '{"eTag": "\"7239369567579103459c07dea91ac552\"", "size": 137022, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-09T00:31:47.000Z", "contentLength": 137022, "httpStatusCode": 200}', 'ffbfbc06-a185-461d-8461-6a6ece796a3b', '4b4409de-9ed9-4c6b-ad86-69b989eb3985'),
	('bce0e922-3cf1-4015-88f4-f74bdc9e102c', 'images', 'profile/4b4409de-9ed9-4c6b-ad86-69b989eb3985/a4dbc540-fa8d-4acc-90bb-3a38f2b5fd97', '4b4409de-9ed9-4c6b-ad86-69b989eb3985', '2024-05-11 06:41:05.392905+09', '2024-05-11 06:41:05.392905+09', '2024-05-11 06:41:05.392905+09', '{"eTag": "\"607a017cd979f205834d598b72116e15\"", "size": 137650, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-10T21:41:06.000Z", "contentLength": 137650, "httpStatusCode": 200}', '27db226c-ca65-4c15-abdb-e5cfb7705653', '4b4409de-9ed9-4c6b-ad86-69b989eb3985'),
	('4bd1e7f5-1a13-417e-996e-0d87221ec919', 'images', 'profile/4b4409de-9ed9-4c6b-ad86-69b989eb3985/9d30d1ea-b6d0-4bd5-84b2-bcb050becc2f', '4b4409de-9ed9-4c6b-ad86-69b989eb3985', '2024-05-11 06:43:46.530769+09', '2024-05-11 06:43:46.530769+09', '2024-05-11 06:43:46.530769+09', '{"eTag": "\"d951e07f76bac7cdd640debf87f0d24f\"", "size": 163887, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-10T21:43:47.000Z", "contentLength": 163887, "httpStatusCode": 200}', 'c550e939-c35a-46de-849e-f45819da78a7', '4b4409de-9ed9-4c6b-ad86-69b989eb3985'),
	('59ea1561-6695-4eae-b8e7-6279c301ec74', 'images', 'profile/b733c8cd-477c-4434-b257-ec47073bddbe/profile_img', 'b733c8cd-477c-4434-b257-ec47073bddbe', '2024-05-07 04:41:10.416179+09', '2024-05-07 05:44:32.474825+09', '2024-05-07 04:41:10.416179+09', '{"eTag": "\"bfe21fa64b33895d5060687ab054599a\"", "size": 172505, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-06T20:44:33.000Z", "contentLength": 172505, "httpStatusCode": 200}', '64a4d1dd-8294-4fba-b09a-b99e86b09e9f', 'b733c8cd-477c-4434-b257-ec47073bddbe'),
	('2fedcddc-ca33-43f1-9697-6da8f2a1344b', 'images', 'profile/b733c8cd-477c-4434-b257-ec47073bddbe/kkrn_icon_user_2.png', 'b733c8cd-477c-4434-b257-ec47073bddbe', '2024-05-07 05:46:49.017065+09', '2024-05-07 05:46:49.017065+09', '2024-05-07 05:46:49.017065+09', '{"eTag": "\"d951e07f76bac7cdd640debf87f0d24f\"", "size": 163887, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-06T20:46:49.000Z", "contentLength": 163887, "httpStatusCode": 200}', '97b71d18-9498-43bf-a4fd-92838ffdea1c', 'b733c8cd-477c-4434-b257-ec47073bddbe'),
	('1e1abfd3-3994-4a25-9af8-ec729ad883b4', 'images', 'profile/b733c8cd-477c-4434-b257-ec47073bddbe/kkrn_icon_user_5.png', 'b733c8cd-477c-4434-b257-ec47073bddbe', '2024-05-07 05:54:32.377186+09', '2024-05-07 05:54:32.377186+09', '2024-05-07 05:54:32.377186+09', '{"eTag": "\"607a017cd979f205834d598b72116e15\"", "size": 137650, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-06T20:54:33.000Z", "contentLength": 137650, "httpStatusCode": 200}', 'c640ae39-30f5-4359-9030-0cc0aae72669', 'b733c8cd-477c-4434-b257-ec47073bddbe'),
	('124518af-4764-43b8-8afc-bf17bd3c1213', 'images', 'profile/b733c8cd-477c-4434-b257-ec47073bddbe/kkrn_icon_user_6.png', 'b733c8cd-477c-4434-b257-ec47073bddbe', '2024-05-07 05:54:41.949056+09', '2024-05-07 05:54:41.949056+09', '2024-05-07 05:54:41.949056+09', '{"eTag": "\"c18eb1341b9788684b59bd32b33f10d6\"", "size": 144640, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-06T20:54:42.000Z", "contentLength": 144640, "httpStatusCode": 200}', 'b8640b02-d48a-490d-be12-e2b9b66c243e', 'b733c8cd-477c-4434-b257-ec47073bddbe'),
	('e480bfde-7e9b-425a-a37c-b873781bbc75', 'images', 'profile/b733c8cd-477c-4434-b257-ec47073bddbe/663d76dd-9efe-4ca2-ae43-21bfc0a44e51', 'b733c8cd-477c-4434-b257-ec47073bddbe', '2024-05-07 09:42:01.27919+09', '2024-05-07 09:42:01.27919+09', '2024-05-07 09:42:01.27919+09', '{"eTag": "\"607a017cd979f205834d598b72116e15\"", "size": 137650, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-07T00:42:02.000Z", "contentLength": 137650, "httpStatusCode": 200}', 'fde89f43-3c6c-4d5b-810d-8c6a18eb6665', 'b733c8cd-477c-4434-b257-ec47073bddbe'),
	('e7a86733-a1d3-452a-b455-2dff40f8d6d9', 'images', 'profile/b733c8cd-477c-4434-b257-ec47073bddbe/af9fb73e-9f09-44a1-9526-9f2a5798a0b7', 'b733c8cd-477c-4434-b257-ec47073bddbe', '2024-05-07 09:51:48.336328+09', '2024-05-07 09:51:48.336328+09', '2024-05-07 09:51:48.336328+09', '{"eTag": "\"7239369567579103459c07dea91ac552\"", "size": 137022, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-07T00:51:49.000Z", "contentLength": 137022, "httpStatusCode": 200}', '61eeecd8-5386-472e-aadf-d8bbbb87f250', 'b733c8cd-477c-4434-b257-ec47073bddbe'),
	('aac3fb2d-c705-42a9-b617-4cce5380cb53', 'images', 'profile/b733c8cd-477c-4434-b257-ec47073bddbe/03755df7-1439-4a04-b153-fc4f25c5d1f1', 'b733c8cd-477c-4434-b257-ec47073bddbe', '2024-05-07 09:52:27.592322+09', '2024-05-07 09:52:27.592322+09', '2024-05-07 09:52:27.592322+09', '{"eTag": "\"c169da9a5eddf2fb2da530ab03d5e051\"", "size": 135599, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-07T00:52:28.000Z", "contentLength": 135599, "httpStatusCode": 200}', '0a0d8070-8ed8-4824-b702-9c3ef72218af', 'b733c8cd-477c-4434-b257-ec47073bddbe'),
	('88ffcdc7-1e84-4fc6-96d5-bf39fbe04fc7', 'images', 'profile/4b4409de-9ed9-4c6b-ad86-69b989eb3985/999d32cd-f9f2-4b40-bb10-7f95c196f222', '4b4409de-9ed9-4c6b-ad86-69b989eb3985', '2024-05-09 10:48:16.993342+09', '2024-05-09 10:48:16.993342+09', '2024-05-09 10:48:16.993342+09', '{"eTag": "\"607a017cd979f205834d598b72116e15\"", "size": 137650, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-09T01:48:17.000Z", "contentLength": 137650, "httpStatusCode": 200}', '6d8b8aa4-8efc-4c36-819d-89f115754873', '4b4409de-9ed9-4c6b-ad86-69b989eb3985'),
	('06e19356-aced-40f2-b8ea-a39c5f3817d2', 'images', 'profile/4b4409de-9ed9-4c6b-ad86-69b989eb3985/7d9013eb-6e93-4073-8956-fbb8b4f5a917', '4b4409de-9ed9-4c6b-ad86-69b989eb3985', '2024-05-09 11:21:38.393375+09', '2024-05-09 11:21:38.393375+09', '2024-05-09 11:21:38.393375+09', '{"eTag": "\"d951e07f76bac7cdd640debf87f0d24f\"", "size": 163887, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-09T02:21:39.000Z", "contentLength": 163887, "httpStatusCode": 200}', '6d0b15de-cbcd-43a0-896d-4534e3f87113', '4b4409de-9ed9-4c6b-ad86-69b989eb3985'),
	('bf46e691-056d-4440-8de0-194fa422bd43', 'images', 'profile/4b4409de-9ed9-4c6b-ad86-69b989eb3985/122367fc-939f-4366-acac-b8c0be44a245', '4b4409de-9ed9-4c6b-ad86-69b989eb3985', '2024-05-09 11:45:57.32408+09', '2024-05-09 11:45:57.32408+09', '2024-05-09 11:45:57.32408+09', '{"eTag": "\"4658987700fa4f5f30bd6431624e54a7\"", "size": 149846, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-09T02:45:58.000Z", "contentLength": 149846, "httpStatusCode": 200}', '432a991b-d7b9-40a9-84d4-a8a14adb08ab', '4b4409de-9ed9-4c6b-ad86-69b989eb3985'),
	('13fcb7b5-d19a-44d3-96e4-45c5b3a70f3c', 'images', 'profile/4b4409de-9ed9-4c6b-ad86-69b989eb3985/23f5ba34-059d-4e03-9440-920adb837808', '4b4409de-9ed9-4c6b-ad86-69b989eb3985', '2024-05-10 10:40:00.762467+09', '2024-05-10 10:40:00.762467+09', '2024-05-10 10:40:00.762467+09', '{"eTag": "\"57ee0a62984f8613efc358d9c6fd9cef\"", "size": 156381, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-10T01:40:01.000Z", "contentLength": 156381, "httpStatusCode": 200}', '8c0ff5ec-c8ce-4b8c-87cc-95f55192806a', '4b4409de-9ed9-4c6b-ad86-69b989eb3985'),
	('7d79e500-aa51-4159-84fc-97442c9ad438', 'images', 'profile/4b4409de-9ed9-4c6b-ad86-69b989eb3985/0b57da4a-7870-4a65-9f31-ed9fe8f9a115', '4b4409de-9ed9-4c6b-ad86-69b989eb3985', '2024-05-11 10:08:06.269742+09', '2024-05-11 10:08:06.269742+09', '2024-05-11 10:08:06.269742+09', '{"eTag": "\"607a017cd979f205834d598b72116e15\"", "size": 137650, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-11T01:08:07.000Z", "contentLength": 137650, "httpStatusCode": 200}', '15d01628-a381-4890-8298-0a683e5a2390', '4b4409de-9ed9-4c6b-ad86-69b989eb3985'),
	('ee614612-5825-4987-b590-3cd724c2703e', 'images', 'profile/4b4409de-9ed9-4c6b-ad86-69b989eb3985/6c7ed394-2dbd-4f84-8b85-f11b1161e5b7', '4b4409de-9ed9-4c6b-ad86-69b989eb3985', '2024-05-11 10:33:05.317757+09', '2024-05-11 10:33:05.317757+09', '2024-05-11 10:33:05.317757+09', '{"eTag": "\"7239369567579103459c07dea91ac552\"", "size": 137022, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-11T01:33:06.000Z", "contentLength": 137022, "httpStatusCode": 200}', '701792d6-f0f6-480c-a74b-4baca58418e3', '4b4409de-9ed9-4c6b-ad86-69b989eb3985');


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- PostgreSQL database dump complete
--

RESET ALL;
