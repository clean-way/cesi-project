--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.0

-- Started on 2024-08-28 18:24:57

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
-- TOC entry 5 (class 2615 OID 29265)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 860 (class 1247 OID 29286)
-- Name: AccessDifficulties; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."AccessDifficulties" AS ENUM (
    'NONE',
    'BOAT',
    'MOUNTAIN',
    'FEETONLY'
);


ALTER TYPE public."AccessDifficulties" OWNER TO postgres;

--
-- TOC entry 857 (class 1247 OID 29276)
-- Name: Roles; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Roles" AS ENUM (
    'USER',
    'WRITER',
    'MODERATOR',
    'AMDIN'
);


ALTER TYPE public."Roles" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 29370)
-- Name: Account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Account" (
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Account" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 29319)
-- Name: Articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Articles" (
    id text NOT NULL,
    title text NOT NULL,
    body text NOT NULL,
    "authorId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Articles" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 29391)
-- Name: Authenticator; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Authenticator" (
    id text NOT NULL,
    "credentialID" text NOT NULL,
    "userId" text NOT NULL,
    "providerAccountId" text NOT NULL,
    "credentialPublicKey" text NOT NULL,
    counter integer NOT NULL,
    "credentialDeviceType" text NOT NULL,
    "credentialBackedUp" boolean NOT NULL,
    transports text
);


ALTER TABLE public."Authenticator" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 29311)
-- Name: CleanWalk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CleanWalk" (
    id text NOT NULL,
    description text NOT NULL,
    name text NOT NULL,
    "authorId" text NOT NULL,
    longitude double precision NOT NULL,
    latitude double precision NOT NULL,
    "bannerImage" text,
    "startAt" timestamp(3) without time zone NOT NULL,
    "endAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."CleanWalk" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 29304)
-- Name: CleanWalkParticipant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CleanWalkParticipant" (
    id text NOT NULL,
    "cleanWalkId" text NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."CleanWalkParticipant" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 29327)
-- Name: DumpQuantities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DumpQuantities" (
    id text NOT NULL,
    label text NOT NULL,
    "imageUri" text NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public."DumpQuantities" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 29334)
-- Name: DumpQuantitiesTrash; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DumpQuantitiesTrash" (
    id text NOT NULL,
    "dumpQuantitiesId" text NOT NULL,
    "trashId" text NOT NULL
);


ALTER TABLE public."DumpQuantitiesTrash" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 29378)
-- Name: Session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Session" (
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 29355)
-- Name: Spot; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Spot" (
    id text NOT NULL,
    "authorId" text NOT NULL,
    description text NOT NULL,
    longitude double precision NOT NULL,
    latitude double precision NOT NULL,
    "startPhotoUri" text NOT NULL,
    "endPhotoUri" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "completeCleaningAt" timestamp(3) without time zone,
    access public."AccessDifficulties" NOT NULL
);


ALTER TABLE public."Spot" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 29348)
-- Name: SpotTrash; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SpotTrash" (
    id text NOT NULL,
    "trashId" text NOT NULL,
    "spotId" text NOT NULL,
    "quantityLeft" integer NOT NULL
);


ALTER TABLE public."SpotTrash" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 29363)
-- Name: SpotTrashUpdate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SpotTrashUpdate" (
    id text NOT NULL,
    "spotTrashId" text NOT NULL,
    quantity integer NOT NULL,
    "userId" text
);


ALTER TABLE public."SpotTrashUpdate" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 29341)
-- Name: Trash; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Trash" (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Trash" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 29295)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "emailVerified" timestamp(3) without time zone,
    name text,
    image text,
    password text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    longitude double precision,
    latitude double precision,
    role public."Roles" DEFAULT 'USER'::public."Roles" NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 29384)
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 29266)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 4903 (class 0 OID 29370)
-- Dependencies: 226
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account" ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 4896 (class 0 OID 29319)
-- Dependencies: 219
-- Data for Name: Articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Articles" (id, title, body, "authorId", "createdAt", "updatedAt") FROM stdin;
1	J'adore Cleanway !	Ce qu'ils proposent répond parfaitement à mes besoins !	clxwwlnee000c12lb16l4a5es	2024-06-27 00:00:00	2024-06-25 00:00:00
2	Récapitulatif de ma première cleanwalk	J'adore ce qu'il s'est produit pendant cette expérience !	clxwwlnee000c12lb16l4a5es	2024-06-24 00:00:00	2024-06-25 00:00:00
\.


--
-- TOC entry 4906 (class 0 OID 29391)
-- Dependencies: 229
-- Data for Name: Authenticator; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Authenticator" (id, "credentialID", "userId", "providerAccountId", "credentialPublicKey", counter, "credentialDeviceType", "credentialBackedUp", transports) FROM stdin;
\.


--
-- TOC entry 4895 (class 0 OID 29311)
-- Dependencies: 218
-- Data for Name: CleanWalk; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CleanWalk" (id, description, name, "authorId", longitude, latitude, "bannerImage", "startAt", "endAt", "createdAt", "updatedAt") FROM stdin;
1	Cleanwalk à Rouen ce samedi	Cleanwalk de Rouen	clxwwlnee000c12lb16l4a5es	12	10	\N	2024-06-29 04:00:00	2024-06-29 08:00:00	2024-06-27 11:48:35.569	2024-06-27 11:48:35.569
2	Cleanwalk à Caen ce samedi	Cleanwalk de Caen	clxwwlnee000c12lb16l4a5es	12	10	https://i.pinimg.com/originals/b5/6c/3c/b56c3ca44ed0e173e11ef11d9a7a4827.jpg	2024-06-29 12:00:00	2024-06-29 15:00:00	2024-06-27 11:48:48.052	2024-06-27 11:48:48.052
\.


--
-- TOC entry 4894 (class 0 OID 29304)
-- Dependencies: 217
-- Data for Name: CleanWalkParticipant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CleanWalkParticipant" (id, "cleanWalkId", "userId") FROM stdin;
\.


--
-- TOC entry 4897 (class 0 OID 29327)
-- Dependencies: 220
-- Data for Name: DumpQuantities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DumpQuantities" (id, label, "imageUri", quantity) FROM stdin;
\.


--
-- TOC entry 4898 (class 0 OID 29334)
-- Dependencies: 221
-- Data for Name: DumpQuantitiesTrash; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DumpQuantitiesTrash" (id, "dumpQuantitiesId", "trashId") FROM stdin;
\.


--
-- TOC entry 4904 (class 0 OID 29378)
-- Dependencies: 227
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Session" ("sessionToken", "userId", expires, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 4901 (class 0 OID 29355)
-- Dependencies: 224
-- Data for Name: Spot; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Spot" (id, "authorId", description, longitude, latitude, "startPhotoUri", "endPhotoUri", "createdAt", "updatedAt", "completeCleaningAt", access) FROM stdin;
clxwzf1x0000k12lbo5avaa1h	clxwymps9000i12lbsqtwh1cz	g"g²	1.0749008	49.3823249	https://storage.googleapis.com/cleanway-next/spots/51e2ad08-31aa-4676-bda7-71821932c51b	https://storage.googleapis.com/cleanway-next/spots/c3111158-bcc8-4dc8-b14f-b23b69eb45cc	2024-06-27 08:07:49.491	2024-06-27 08:08:29.042	2024-06-27 08:08:29.039	NONE
clxwwnfvs000e12lbpk30l2qj	clxwwlnee000c12lb16l4a5es	Bidule	1.0747929	49.3827279	https://storage.googleapis.com/cleanway-next/spots/fe3d0076-e0d4-4638-bbfe-244a7fc445bb	https://storage.googleapis.com/cleanway-next/spots/7630a766-5d2a-44a4-83ae-e5fdc92df690	2024-06-27 06:50:22.12	2024-06-27 08:16:15.993	2024-06-27 08:16:15.991	BOAT
clxx2egzi0001lgiduj3frd7y	clxwwlnee000c12lb16l4a5es	Ordures	1.0746369	49.382405	https://storage.googleapis.com/cleanway-next/spots/7c2a5058-0cc6-414b-9216-b2f8bf8aef12	\N	2024-06-27 09:31:21.341	2024-06-27 09:31:21.341	\N	NONE
cm0dx257g0009l1d5y8f56qib	cm0dkghqy0000j0iy9xp262su	Description Déchet	1.1011746	49.4467988	https://storage.googleapis.com/cleanway-next/spots/4418effb-7fd0-4102-afed-b0f05b5d2192	\N	2024-08-28 13:53:17.788	2024-08-28 13:53:17.788	\N	MOUNTAIN
cm0dx2tbm000hl1d5qrh7d5pg	cm0dkghqy0000j0iy9xp262su	Description Déchet	1.1011746	49.4467988	https://storage.googleapis.com/cleanway-next/spots/a0dd364c-5a43-4840-b6fa-9e352d380848	\N	2024-08-28 13:53:49.042	2024-08-28 13:53:49.042	\N	MOUNTAIN
cm0dx83wh000pl1d59y2rynrd	cm0dkghqy0000j0iy9xp262su	Description Déchet	1.1011746	49.4467988	https://storage.googleapis.com/cleanway-next/spots/c4dd5919-889c-4c66-8537-18b80aec7d91	\N	2024-08-28 13:57:56.033	2024-08-28 13:57:56.033	\N	MOUNTAIN
cm0dx9t7o000xl1d51iv8yo7u	cm0dkghqy0000j0iy9xp262su	Description Déchet	1.1011746	49.4467988	https://storage.googleapis.com/cleanway-next/spots/4dfbd215-2c45-4833-be94-602f0a11aa36	\N	2024-08-28 13:59:15.493	2024-08-28 13:59:15.493	\N	MOUNTAIN
cm0dwyd360001l1d50wutl208	cm0dkghqy0000j0iy9xp262su	Description Déchet	1.1011746	49.4467988	https://storage.googleapis.com/cleanway-next/spots/8105e468-a6c7-4843-a0e3-fdfd3d348244	https://storage.googleapis.com/cleanway-next/spots/f7787d47-cff3-4a29-a88c-7c767b44ac8e	2024-08-28 13:50:21.376	2024-08-28 13:59:16.078	2024-08-28 13:59:16.076	MOUNTAIN
cm0dxagnb0015l1d51ufech7x	cm0dkghqy0000j0iy9xp262su	Description Déchet	1.1011746	49.4467988	https://storage.googleapis.com/cleanway-next/spots/8b054c89-46c0-426d-b2c8-6caf44eb3f47	https://storage.googleapis.com/cleanway-next/spots/b1a23928-8c9e-498a-aac0-eee00dd87a19	2024-08-28 13:59:45.863	2024-08-28 14:01:34.501	2024-08-28 14:01:34.5	MOUNTAIN
cm0dxdtyn001ll1d5895smrhj	cm0dkghqy0000j0iy9xp262su	Description Déchet	1.1011746	49.4467988	https://storage.googleapis.com/cleanway-next/spots/2be51eb4-f8fe-44ad-90bc-770c6b09f4c1	https://storage.googleapis.com/cleanway-next/spots/3c884fa6-4380-45ff-a215-9cd15618ea57	2024-08-28 14:02:23.088	2024-08-28 14:02:48.836	2024-08-28 14:02:48.835	MOUNTAIN
cm0dxcs2v001dl1d54w5h286w	cm0dkghqy0000j0iy9xp262su	Description Déchet	1.1011746	49.4467988	https://storage.googleapis.com/cleanway-next/spots/383952a1-40d4-4ee5-8634-3dfb287fe719	https://storage.googleapis.com/cleanway-next/spots/fd4029f2-29d1-4e08-a995-27d951bde1eb	2024-08-28 14:01:33.991	2024-08-28 14:08:04.461	2024-08-28 14:08:04.462	MOUNTAIN
cm0dxp8gb0029l1d5i1dcdnl4	cm0dkghqy0000j0iy9xp262su	Description Déchet	1.1011746	49.4467988	https://storage.googleapis.com/cleanway-next/spots/7daf7c8c-08b1-4ca7-a8cc-f2c6f57faf2a	\N	2024-08-28 14:11:15.084	2024-08-28 14:11:15.084	\N	MOUNTAIN
cm0dxedek001tl1d5i4ir8pcy	cm0dkghqy0000j0iy9xp262su	Description Déchet	1.1011746	49.4467988	https://storage.googleapis.com/cleanway-next/spots/c617d53d-20cf-4502-84e9-c6ee6918c1e4	https://storage.googleapis.com/cleanway-next/spots/1222cc1f-a31a-4f8c-8cf5-69f37bb092a0	2024-08-28 14:02:48.285	2024-08-28 14:11:15.773	2024-08-28 14:11:15.772	MOUNTAIN
cm0dxzpwg002hl1d55x4tgg2e	cm0dkghqy0000j0iy9xp262su	Description Déchet	1.1011746	49.4467988	https://storage.googleapis.com/cleanway-next/spots/72aed21a-4fb2-4039-81f3-55fae98490de	\N	2024-08-28 14:19:24.257	2024-08-28 14:19:24.257	\N	MOUNTAIN
cm0dxl4vv0021l1d5fc3qtiym	cm0dkghqy0000j0iy9xp262su	Description Déchet	1.1011746	49.4467988	https://storage.googleapis.com/cleanway-next/spots/6cdf1317-3201-43bd-bf0e-3fde0193f36e	https://storage.googleapis.com/cleanway-next/spots/09479ee5-00e0-4d50-b5e4-b0cf4ba0d567	2024-08-28 14:08:03.836	2024-08-28 14:19:25.38	2024-08-28 14:19:25.379	MOUNTAIN
\.


--
-- TOC entry 4900 (class 0 OID 29348)
-- Dependencies: 223
-- Data for Name: SpotTrash; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SpotTrash" (id, "trashId", "spotId", "quantityLeft") FROM stdin;
clxwwnfwb000h12lbrbnxr8k5	clxwwnfw4000f12lbkbjd5jol	clxwwnfvs000e12lbpk30l2qj	1
clxwzf1xl000n12lbc9isn14b	clxwzf1xe000l12lbth9gfngx	clxwzf1x0000k12lbo5avaa1h	4
clxx2eh0k0004lgid3akw2f4s	clxx2eh0b0002lgid6b8cvp6s	clxx2egzi0001lgiduj3frd7y	2
cm0dwyd4l0004l1d527051mxr	cm0dwyd4i0002l1d5ctgdfyp9	cm0dwyd360001l1d50wutl208	1
cm0dwyd4o0007l1d5mrbn1ad3	cm0dwyd4o0005l1d5nouq7c2a	cm0dwyd360001l1d50wutl208	2
cm0dx257l000cl1d5mgqntjh3	cm0dx257k000al1d5wdlptk1z	cm0dx257g0009l1d5y8f56qib	1
cm0dx257n000fl1d5sctdixa0	cm0dx257m000dl1d5vnqo3b54	cm0dx257g0009l1d5y8f56qib	2
cm0dx2tbt000kl1d5aqhli29u	cm0dx2tbs000il1d5c34p52l9	cm0dx2tbm000hl1d5qrh7d5pg	1
cm0dx2tbu000nl1d5nztajn7p	cm0dx2tbu000ll1d5rea4pwfa	cm0dx2tbm000hl1d5qrh7d5pg	2
cm0dx83ws000sl1d5aedo48qo	cm0dx83wq000ql1d5pgv5f9s4	cm0dx83wh000pl1d59y2rynrd	1
cm0dx83wv000vl1d57emevurk	cm0dx83wu000tl1d5gfd1buc2	cm0dx83wh000pl1d59y2rynrd	2
cm0dx9t7v0010l1d58zgbah6b	cm0dx9t7u000yl1d5pm6x80f4	cm0dx9t7o000xl1d51iv8yo7u	1
cm0dx9t7w0013l1d5xv94pbua	cm0dx9t7w0011l1d5gcezeusf	cm0dx9t7o000xl1d51iv8yo7u	2
cm0dxagnj0018l1d5l75b7jiu	cm0dxagng0016l1d53rjosnjv	cm0dxagnb0015l1d51ufech7x	1
cm0dxagno001bl1d50hzddoy9	cm0dxagnn0019l1d55e72qv56	cm0dxagnb0015l1d51ufech7x	2
cm0dxcs36001gl1d58ftsn17m	cm0dxcs34001el1d5qkf4vyzk	cm0dxcs2v001dl1d54w5h286w	1
cm0dxcs39001jl1d587r4rrvl	cm0dxcs37001hl1d55y4z8vej	cm0dxcs2v001dl1d54w5h286w	2
cm0dxdtyw001ol1d5yuwnen6m	cm0dxdtyu001ml1d50gubpwq6	cm0dxdtyn001ll1d5895smrhj	1
cm0dxdtyx001rl1d5gpq8fnk3	cm0dxdtyx001pl1d5t0d0khto	cm0dxdtyn001ll1d5895smrhj	2
cm0dxeder001wl1d5mcj625we	cm0dxedeq001ul1d5rx1rdt82	cm0dxedek001tl1d5i4ir8pcy	1
cm0dxedes001zl1d5jrdjlbr0	cm0dxedes001xl1d5f883eudi	cm0dxedek001tl1d5i4ir8pcy	2
cm0dxl4w10024l1d5a4y44lns	cm0dxl4w00022l1d5z9qph2zf	cm0dxl4vv0021l1d5fc3qtiym	1
cm0dxl4w20027l1d5uslbhpwq	cm0dxl4w20025l1d5c3xf12d4	cm0dxl4vv0021l1d5fc3qtiym	2
cm0dxp8gi002cl1d5vxpc3ch0	cm0dxp8gi002al1d5ad7ye1lx	cm0dxp8gb0029l1d5i1dcdnl4	1
cm0dxp8gj002fl1d57r0qr8zu	cm0dxp8gj002dl1d58y8m980t	cm0dxp8gb0029l1d5i1dcdnl4	2
cm0dxzpww002kl1d5t0vhwykg	cm0dxzpwr002il1d56qdxndt7	cm0dxzpwg002hl1d55x4tgg2e	1
cm0dxzpx3002nl1d5uzlu6mwi	cm0dxzpx1002ll1d5pwofidfg	cm0dxzpwg002hl1d55x4tgg2e	2
\.


--
-- TOC entry 4902 (class 0 OID 29363)
-- Dependencies: 225
-- Data for Name: SpotTrashUpdate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SpotTrashUpdate" (id, "spotTrashId", quantity, "userId") FROM stdin;
\.


--
-- TOC entry 4899 (class 0 OID 29341)
-- Dependencies: 222
-- Data for Name: Trash; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Trash" (id, name) FROM stdin;
clxwwnfw4000f12lbkbjd5jol	jean
clxwzf1xe000l12lbth9gfngx	fgff
clxx2eh0b0002lgid6b8cvp6s	Bouteille
cm0dwyd4i0002l1d5ctgdfyp9	Déchet 1
cm0dwyd4o0005l1d5nouq7c2a	Déchet 2
cm0dx257k000al1d5wdlptk1z	Déchet 1
cm0dx257m000dl1d5vnqo3b54	Déchet 2
cm0dx2tbs000il1d5c34p52l9	Déchet 1
cm0dx2tbu000ll1d5rea4pwfa	Déchet 2
cm0dx83wq000ql1d5pgv5f9s4	Déchet 1
cm0dx83wu000tl1d5gfd1buc2	Déchet 2
cm0dx9t7u000yl1d5pm6x80f4	Déchet 1
cm0dx9t7w0011l1d5gcezeusf	Déchet 2
cm0dxagng0016l1d53rjosnjv	Déchet 1
cm0dxagnn0019l1d55e72qv56	Déchet 2
cm0dxcs34001el1d5qkf4vyzk	Déchet 1
cm0dxcs37001hl1d55y4z8vej	Déchet 2
cm0dxdtyu001ml1d50gubpwq6	Déchet 1
cm0dxdtyx001pl1d5t0d0khto	Déchet 2
cm0dxedeq001ul1d5rx1rdt82	Déchet 1
cm0dxedes001xl1d5f883eudi	Déchet 2
cm0dxl4w00022l1d5z9qph2zf	Déchet 1
cm0dxl4w20025l1d5c3xf12d4	Déchet 2
cm0dxp8gi002al1d5ad7ye1lx	Déchet 1
cm0dxp8gj002dl1d58y8m980t	Déchet 2
cm0dxzpwr002il1d56qdxndt7	Déchet 1
cm0dxzpx1002ll1d5pwofidfg	Déchet 2
\.


--
-- TOC entry 4893 (class 0 OID 29295)
-- Dependencies: 216
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, "emailVerified", name, image, password, "createdAt", "updatedAt", longitude, latitude, role) FROM stdin;
clxwwlnee000c12lb16l4a5es	slupshi@gmail.com	\N	Morainville Kevin	https://cdn.pixabay.com/photo/2024/02/26/19/39/monochrome-image-8598798_1280.jpg	$2a$10$Z78bYLMfSb0/tF9aHWdxbut.NfyJpMOvUfM4xGgHDFEJJJyvUz7oK	2024-06-27 06:48:58.551	2024-06-27 06:48:58.551	\N	\N	AMDIN
clxwymps9000i12lbsqtwh1cz	toto@gmail.com	\N	toto toto	\N	$2a$10$90UH3huOQhR7SVpNm/Tl.u/FXUZfpRKlRt6zhDAxHFuL4s.ivjmD2	2024-06-27 07:45:47.529	2024-06-27 07:45:47.529	\N	\N	USER
cm0dkghqy0000j0iy9xp262su	toto2@gmail.com	\N	toto toto	\N	$2a$10$C/scR73RQ7GkBNH6yi2eQO6QzkscyKHcz1zpd3gs.j02lCvUza/wi	2024-08-28 08:00:32.212	2024-08-28 08:00:32.212	\N	\N	AMDIN
\.


--
-- TOC entry 4905 (class 0 OID 29384)
-- Dependencies: 228
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- TOC entry 4892 (class 0 OID 29266)
-- Dependencies: 215
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
b4d4400a-2b19-429a-8ab8-d0f2919aba27	b16686728977535f1caa617fccc2f20843899e8c67f65737880ca8f8e8145f44	2024-06-27 08:24:41.714732+02	20240626131257_init	\N	\N	2024-06-27 08:24:41.578329+02	1
\.


--
-- TOC entry 4728 (class 2606 OID 29377)
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (provider, "providerAccountId");


--
-- TOC entry 4714 (class 2606 OID 29326)
-- Name: Articles Articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Articles"
    ADD CONSTRAINT "Articles_pkey" PRIMARY KEY (id);


--
-- TOC entry 4734 (class 2606 OID 29397)
-- Name: Authenticator Authenticator_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Authenticator"
    ADD CONSTRAINT "Authenticator_pkey" PRIMARY KEY (id);


--
-- TOC entry 4710 (class 2606 OID 29310)
-- Name: CleanWalkParticipant CleanWalkParticipant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CleanWalkParticipant"
    ADD CONSTRAINT "CleanWalkParticipant_pkey" PRIMARY KEY (id);


--
-- TOC entry 4712 (class 2606 OID 29318)
-- Name: CleanWalk CleanWalk_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CleanWalk"
    ADD CONSTRAINT "CleanWalk_pkey" PRIMARY KEY (id);


--
-- TOC entry 4718 (class 2606 OID 29340)
-- Name: DumpQuantitiesTrash DumpQuantitiesTrash_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DumpQuantitiesTrash"
    ADD CONSTRAINT "DumpQuantitiesTrash_pkey" PRIMARY KEY (id);


--
-- TOC entry 4716 (class 2606 OID 29333)
-- Name: DumpQuantities DumpQuantities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DumpQuantities"
    ADD CONSTRAINT "DumpQuantities_pkey" PRIMARY KEY (id);


--
-- TOC entry 4726 (class 2606 OID 29369)
-- Name: SpotTrashUpdate SpotTrashUpdate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SpotTrashUpdate"
    ADD CONSTRAINT "SpotTrashUpdate_pkey" PRIMARY KEY (id);


--
-- TOC entry 4722 (class 2606 OID 29354)
-- Name: SpotTrash SpotTrash_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SpotTrash"
    ADD CONSTRAINT "SpotTrash_pkey" PRIMARY KEY (id);


--
-- TOC entry 4724 (class 2606 OID 29362)
-- Name: Spot Spot_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Spot"
    ADD CONSTRAINT "Spot_pkey" PRIMARY KEY (id);


--
-- TOC entry 4720 (class 2606 OID 29347)
-- Name: Trash Trash_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trash"
    ADD CONSTRAINT "Trash_pkey" PRIMARY KEY (id);


--
-- TOC entry 4708 (class 2606 OID 29303)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 4731 (class 2606 OID 29390)
-- Name: VerificationToken VerificationToken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VerificationToken"
    ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY (identifier, token);


--
-- TOC entry 4705 (class 2606 OID 29274)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4732 (class 1259 OID 29400)
-- Name: Authenticator_credentialID_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON public."Authenticator" USING btree ("credentialID");


--
-- TOC entry 4729 (class 1259 OID 29399)
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- TOC entry 4706 (class 1259 OID 29398)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 4746 (class 2606 OID 29456)
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4738 (class 2606 OID 29416)
-- Name: Articles Articles_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Articles"
    ADD CONSTRAINT "Articles_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4748 (class 2606 OID 29466)
-- Name: Authenticator Authenticator_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Authenticator"
    ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4735 (class 2606 OID 29401)
-- Name: CleanWalkParticipant CleanWalkParticipant_cleanWalkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CleanWalkParticipant"
    ADD CONSTRAINT "CleanWalkParticipant_cleanWalkId_fkey" FOREIGN KEY ("cleanWalkId") REFERENCES public."CleanWalk"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4736 (class 2606 OID 29406)
-- Name: CleanWalkParticipant CleanWalkParticipant_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CleanWalkParticipant"
    ADD CONSTRAINT "CleanWalkParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4737 (class 2606 OID 29411)
-- Name: CleanWalk CleanWalk_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CleanWalk"
    ADD CONSTRAINT "CleanWalk_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4739 (class 2606 OID 29421)
-- Name: DumpQuantitiesTrash DumpQuantitiesTrash_dumpQuantitiesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DumpQuantitiesTrash"
    ADD CONSTRAINT "DumpQuantitiesTrash_dumpQuantitiesId_fkey" FOREIGN KEY ("dumpQuantitiesId") REFERENCES public."DumpQuantities"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4740 (class 2606 OID 29426)
-- Name: DumpQuantitiesTrash DumpQuantitiesTrash_trashId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DumpQuantitiesTrash"
    ADD CONSTRAINT "DumpQuantitiesTrash_trashId_fkey" FOREIGN KEY ("trashId") REFERENCES public."Trash"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4747 (class 2606 OID 29461)
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4744 (class 2606 OID 29446)
-- Name: SpotTrashUpdate SpotTrashUpdate_spotTrashId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SpotTrashUpdate"
    ADD CONSTRAINT "SpotTrashUpdate_spotTrashId_fkey" FOREIGN KEY ("spotTrashId") REFERENCES public."SpotTrash"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4745 (class 2606 OID 29451)
-- Name: SpotTrashUpdate SpotTrashUpdate_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SpotTrashUpdate"
    ADD CONSTRAINT "SpotTrashUpdate_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4741 (class 2606 OID 29436)
-- Name: SpotTrash SpotTrash_spotId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SpotTrash"
    ADD CONSTRAINT "SpotTrash_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES public."Spot"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4742 (class 2606 OID 29431)
-- Name: SpotTrash SpotTrash_trashId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SpotTrash"
    ADD CONSTRAINT "SpotTrash_trashId_fkey" FOREIGN KEY ("trashId") REFERENCES public."Trash"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4743 (class 2606 OID 29441)
-- Name: Spot Spot_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Spot"
    ADD CONSTRAINT "Spot_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-08-28 18:24:58

--
-- PostgreSQL database dump complete
--

