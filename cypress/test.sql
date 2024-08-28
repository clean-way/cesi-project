PGDMP  /    1                |           Cleanway    16.2    16.0 E    -           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            .           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            /           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            0           1262    16398    Cleanway    DATABASE     }   CREATE DATABASE "Cleanway" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
    DROP DATABASE "Cleanway";
                postgres    false                        2615    29265    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            1           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            \           1247    29286    AccessDifficulties    TYPE     l   CREATE TYPE public."AccessDifficulties" AS ENUM (
    'NONE',
    'BOAT',
    'MOUNTAIN',
    'FEETONLY'
);
 '   DROP TYPE public."AccessDifficulties";
       public          postgres    false    5            Y           1247    29276    Roles    TYPE     _   CREATE TYPE public."Roles" AS ENUM (
    'USER',
    'WRITER',
    'MODERATOR',
    'AMDIN'
);
    DROP TYPE public."Roles";
       public          postgres    false    5            �            1259    29370    Account    TABLE     �  CREATE TABLE public."Account" (
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
    DROP TABLE public."Account";
       public         heap    postgres    false    5            �            1259    29319    Articles    TABLE       CREATE TABLE public."Articles" (
    id text NOT NULL,
    title text NOT NULL,
    body text NOT NULL,
    "authorId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Articles";
       public         heap    postgres    false    5            �            1259    29391    Authenticator    TABLE     T  CREATE TABLE public."Authenticator" (
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
 #   DROP TABLE public."Authenticator";
       public         heap    postgres    false    5            �            1259    29311 	   CleanWalk    TABLE     �  CREATE TABLE public."CleanWalk" (
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
    DROP TABLE public."CleanWalk";
       public         heap    postgres    false    5            �            1259    29304    CleanWalkParticipant    TABLE     �   CREATE TABLE public."CleanWalkParticipant" (
    id text NOT NULL,
    "cleanWalkId" text NOT NULL,
    "userId" text NOT NULL
);
 *   DROP TABLE public."CleanWalkParticipant";
       public         heap    postgres    false    5            �            1259    29327    DumpQuantities    TABLE     �   CREATE TABLE public."DumpQuantities" (
    id text NOT NULL,
    label text NOT NULL,
    "imageUri" text NOT NULL,
    quantity integer NOT NULL
);
 $   DROP TABLE public."DumpQuantities";
       public         heap    postgres    false    5            �            1259    29334    DumpQuantitiesTrash    TABLE     �   CREATE TABLE public."DumpQuantitiesTrash" (
    id text NOT NULL,
    "dumpQuantitiesId" text NOT NULL,
    "trashId" text NOT NULL
);
 )   DROP TABLE public."DumpQuantitiesTrash";
       public         heap    postgres    false    5            �            1259    29378    Session    TABLE     !  CREATE TABLE public."Session" (
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Session";
       public         heap    postgres    false    5            �            1259    29355    Spot    TABLE     �  CREATE TABLE public."Spot" (
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
    DROP TABLE public."Spot";
       public         heap    postgres    false    860    5            �            1259    29348 	   SpotTrash    TABLE     �   CREATE TABLE public."SpotTrash" (
    id text NOT NULL,
    "trashId" text NOT NULL,
    "spotId" text NOT NULL,
    "quantityLeft" integer NOT NULL
);
    DROP TABLE public."SpotTrash";
       public         heap    postgres    false    5            �            1259    29363    SpotTrashUpdate    TABLE     �   CREATE TABLE public."SpotTrashUpdate" (
    id text NOT NULL,
    "spotTrashId" text NOT NULL,
    quantity integer NOT NULL,
    "userId" text
);
 %   DROP TABLE public."SpotTrashUpdate";
       public         heap    postgres    false    5            �            1259    29341    Trash    TABLE     N   CREATE TABLE public."Trash" (
    id text NOT NULL,
    name text NOT NULL
);
    DROP TABLE public."Trash";
       public         heap    postgres    false    5            �            1259    29295    User    TABLE     �  CREATE TABLE public."User" (
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
    DROP TABLE public."User";
       public         heap    postgres    false    857    5    857            �            1259    29384    VerificationToken    TABLE     �   CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);
 '   DROP TABLE public."VerificationToken";
       public         heap    postgres    false    5            �            1259    29266    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    5            '          0    29370    Account 
   TABLE DATA           �   COPY public."Account" ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    226   X_                  0    29319    Articles 
   TABLE DATA           [   COPY public."Articles" (id, title, body, "authorId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    219   u_       *          0    29391    Authenticator 
   TABLE DATA           �   COPY public."Authenticator" (id, "credentialID", "userId", "providerAccountId", "credentialPublicKey", counter, "credentialDeviceType", "credentialBackedUp", transports) FROM stdin;
    public          postgres    false    229   N`                 0    29311 	   CleanWalk 
   TABLE DATA           �   COPY public."CleanWalk" (id, description, name, "authorId", longitude, latitude, "bannerImage", "startAt", "endAt", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   k`                 0    29304    CleanWalkParticipant 
   TABLE DATA           M   COPY public."CleanWalkParticipant" (id, "cleanWalkId", "userId") FROM stdin;
    public          postgres    false    217   La       !          0    29327    DumpQuantities 
   TABLE DATA           K   COPY public."DumpQuantities" (id, label, "imageUri", quantity) FROM stdin;
    public          postgres    false    220   ia       "          0    29334    DumpQuantitiesTrash 
   TABLE DATA           R   COPY public."DumpQuantitiesTrash" (id, "dumpQuantitiesId", "trashId") FROM stdin;
    public          postgres    false    221   �a       (          0    29378    Session 
   TABLE DATA           `   COPY public."Session" ("sessionToken", "userId", expires, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    227   �a       %          0    29355    Spot 
   TABLE DATA           �   COPY public."Spot" (id, "authorId", description, longitude, latitude, "startPhotoUri", "endPhotoUri", "createdAt", "updatedAt", "completeCleaningAt", access) FROM stdin;
    public          postgres    false    224   �a       $          0    29348 	   SpotTrash 
   TABLE DATA           N   COPY public."SpotTrash" (id, "trashId", "spotId", "quantityLeft") FROM stdin;
    public          postgres    false    223   �f       &          0    29363    SpotTrashUpdate 
   TABLE DATA           R   COPY public."SpotTrashUpdate" (id, "spotTrashId", quantity, "userId") FROM stdin;
    public          postgres    false    225   �j       #          0    29341    Trash 
   TABLE DATA           +   COPY public."Trash" (id, name) FROM stdin;
    public          postgres    false    222   �j                 0    29295    User 
   TABLE DATA           �   COPY public."User" (id, email, "emailVerified", name, image, password, "createdAt", "updatedAt", longitude, latitude, role) FROM stdin;
    public          postgres    false    216   gl       )          0    29384    VerificationToken 
   TABLE DATA           I   COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
    public          postgres    false    228   n                 0    29266    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   2n       x           2606    29377    Account Account_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (provider, "providerAccountId");
 B   ALTER TABLE ONLY public."Account" DROP CONSTRAINT "Account_pkey";
       public            postgres    false    226    226            j           2606    29326    Articles Articles_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Articles"
    ADD CONSTRAINT "Articles_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Articles" DROP CONSTRAINT "Articles_pkey";
       public            postgres    false    219            ~           2606    29397     Authenticator Authenticator_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Authenticator"
    ADD CONSTRAINT "Authenticator_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."Authenticator" DROP CONSTRAINT "Authenticator_pkey";
       public            postgres    false    229            f           2606    29310 .   CleanWalkParticipant CleanWalkParticipant_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public."CleanWalkParticipant"
    ADD CONSTRAINT "CleanWalkParticipant_pkey" PRIMARY KEY (id);
 \   ALTER TABLE ONLY public."CleanWalkParticipant" DROP CONSTRAINT "CleanWalkParticipant_pkey";
       public            postgres    false    217            h           2606    29318    CleanWalk CleanWalk_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."CleanWalk"
    ADD CONSTRAINT "CleanWalk_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."CleanWalk" DROP CONSTRAINT "CleanWalk_pkey";
       public            postgres    false    218            n           2606    29340 ,   DumpQuantitiesTrash DumpQuantitiesTrash_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."DumpQuantitiesTrash"
    ADD CONSTRAINT "DumpQuantitiesTrash_pkey" PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public."DumpQuantitiesTrash" DROP CONSTRAINT "DumpQuantitiesTrash_pkey";
       public            postgres    false    221            l           2606    29333 "   DumpQuantities DumpQuantities_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."DumpQuantities"
    ADD CONSTRAINT "DumpQuantities_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."DumpQuantities" DROP CONSTRAINT "DumpQuantities_pkey";
       public            postgres    false    220            v           2606    29369 $   SpotTrashUpdate SpotTrashUpdate_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."SpotTrashUpdate"
    ADD CONSTRAINT "SpotTrashUpdate_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."SpotTrashUpdate" DROP CONSTRAINT "SpotTrashUpdate_pkey";
       public            postgres    false    225            r           2606    29354    SpotTrash SpotTrash_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."SpotTrash"
    ADD CONSTRAINT "SpotTrash_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."SpotTrash" DROP CONSTRAINT "SpotTrash_pkey";
       public            postgres    false    223            t           2606    29362    Spot Spot_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Spot"
    ADD CONSTRAINT "Spot_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Spot" DROP CONSTRAINT "Spot_pkey";
       public            postgres    false    224            p           2606    29347    Trash Trash_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Trash"
    ADD CONSTRAINT "Trash_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Trash" DROP CONSTRAINT "Trash_pkey";
       public            postgres    false    222            d           2606    29303    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    216            {           2606    29390 (   VerificationToken VerificationToken_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public."VerificationToken"
    ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY (identifier, token);
 V   ALTER TABLE ONLY public."VerificationToken" DROP CONSTRAINT "VerificationToken_pkey";
       public            postgres    false    228    228            a           2606    29274 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            |           1259    29400    Authenticator_credentialID_key    INDEX     m   CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON public."Authenticator" USING btree ("credentialID");
 4   DROP INDEX public."Authenticator_credentialID_key";
       public            postgres    false    229            y           1259    29399    Session_sessionToken_key    INDEX     a   CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");
 .   DROP INDEX public."Session_sessionToken_key";
       public            postgres    false    227            b           1259    29398    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            postgres    false    216            �           2606    29456    Account Account_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public."Account" DROP CONSTRAINT "Account_userId_fkey";
       public          postgres    false    226    4708    216            �           2606    29416    Articles Articles_authorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Articles"
    ADD CONSTRAINT "Articles_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 M   ALTER TABLE ONLY public."Articles" DROP CONSTRAINT "Articles_authorId_fkey";
       public          postgres    false    219    4708    216            �           2606    29466 '   Authenticator Authenticator_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Authenticator"
    ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public."Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";
       public          postgres    false    229    4708    216                       2606    29401 :   CleanWalkParticipant CleanWalkParticipant_cleanWalkId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."CleanWalkParticipant"
    ADD CONSTRAINT "CleanWalkParticipant_cleanWalkId_fkey" FOREIGN KEY ("cleanWalkId") REFERENCES public."CleanWalk"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 h   ALTER TABLE ONLY public."CleanWalkParticipant" DROP CONSTRAINT "CleanWalkParticipant_cleanWalkId_fkey";
       public          postgres    false    218    4712    217            �           2606    29406 5   CleanWalkParticipant CleanWalkParticipant_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."CleanWalkParticipant"
    ADD CONSTRAINT "CleanWalkParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 c   ALTER TABLE ONLY public."CleanWalkParticipant" DROP CONSTRAINT "CleanWalkParticipant_userId_fkey";
       public          postgres    false    216    217    4708            �           2606    29411 !   CleanWalk CleanWalk_authorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."CleanWalk"
    ADD CONSTRAINT "CleanWalk_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 O   ALTER TABLE ONLY public."CleanWalk" DROP CONSTRAINT "CleanWalk_authorId_fkey";
       public          postgres    false    216    4708    218            �           2606    29421 =   DumpQuantitiesTrash DumpQuantitiesTrash_dumpQuantitiesId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DumpQuantitiesTrash"
    ADD CONSTRAINT "DumpQuantitiesTrash_dumpQuantitiesId_fkey" FOREIGN KEY ("dumpQuantitiesId") REFERENCES public."DumpQuantities"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 k   ALTER TABLE ONLY public."DumpQuantitiesTrash" DROP CONSTRAINT "DumpQuantitiesTrash_dumpQuantitiesId_fkey";
       public          postgres    false    221    4716    220            �           2606    29426 4   DumpQuantitiesTrash DumpQuantitiesTrash_trashId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DumpQuantitiesTrash"
    ADD CONSTRAINT "DumpQuantitiesTrash_trashId_fkey" FOREIGN KEY ("trashId") REFERENCES public."Trash"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 b   ALTER TABLE ONLY public."DumpQuantitiesTrash" DROP CONSTRAINT "DumpQuantitiesTrash_trashId_fkey";
       public          postgres    false    221    222    4720            �           2606    29461    Session Session_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public."Session" DROP CONSTRAINT "Session_userId_fkey";
       public          postgres    false    227    4708    216            �           2606    29446 0   SpotTrashUpdate SpotTrashUpdate_spotTrashId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."SpotTrashUpdate"
    ADD CONSTRAINT "SpotTrashUpdate_spotTrashId_fkey" FOREIGN KEY ("spotTrashId") REFERENCES public."SpotTrash"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 ^   ALTER TABLE ONLY public."SpotTrashUpdate" DROP CONSTRAINT "SpotTrashUpdate_spotTrashId_fkey";
       public          postgres    false    223    4722    225            �           2606    29451 +   SpotTrashUpdate SpotTrashUpdate_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."SpotTrashUpdate"
    ADD CONSTRAINT "SpotTrashUpdate_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Y   ALTER TABLE ONLY public."SpotTrashUpdate" DROP CONSTRAINT "SpotTrashUpdate_userId_fkey";
       public          postgres    false    225    4708    216            �           2606    29436    SpotTrash SpotTrash_spotId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."SpotTrash"
    ADD CONSTRAINT "SpotTrash_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES public."Spot"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 M   ALTER TABLE ONLY public."SpotTrash" DROP CONSTRAINT "SpotTrash_spotId_fkey";
       public          postgres    false    223    224    4724            �           2606    29431     SpotTrash SpotTrash_trashId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."SpotTrash"
    ADD CONSTRAINT "SpotTrash_trashId_fkey" FOREIGN KEY ("trashId") REFERENCES public."Trash"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public."SpotTrash" DROP CONSTRAINT "SpotTrash_trashId_fkey";
       public          postgres    false    223    222    4720            �           2606    29441    Spot Spot_authorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Spot"
    ADD CONSTRAINT "Spot_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Spot" DROP CONSTRAINT "Spot_authorId_fkey";
       public          postgres    false    216    4708    224            '      x������ � �          �   x��αj�0���~���)EN
]�e̜�"}QYR$�o�1~�X���[)���_��;�>�v�f��U�]���D!��\�X�������&c|��I#���q�~*{�g� !��=�[;���Bk�]�W��k~���Z�ʢ8�<Y��L4r�`4�V���iߟr�å�!�YO�n8���3�P�h���������K۶w0�c      *      x������ � �         �   x���=n�0Fg��@$���5{��Y�u�ȲQ'p�ӻ�bM�%ia�@����>s(k�g���ӕ����0r��d�?R�����0@D�'��ǋ@��$����U`;��=��7�bg��r��v�Kz�݇��o�o���2/�1Iϩ�q�q����TB^��Mo��U�r�uň��ط���Z����@����m���G[\����ou            x������ � �      !      x������ � �      "      x������ � �      (      x������ � �      %     x�ŗ�v"7���)�d��T*I��͜�"�؛�n6�m�1`h�e�GH^,��OfȂ,��t�__�*��n�V�N��Q�<.MxAM'�W�O���ٰ�y�S��&�/��MT#�"M�7�@�ɴ�W���v�/ס+M�\v�V�M��O���^l�^,ʮ�ݬ���֨!KZ� �:+bN8E���dT�dߤ���	��VAG�KD��$��V�{'���e-�ոN-�F"��k?�����f �]��+�գ�sx~8�����JV��c0e3�0�/������t�.�Y��R2�"32L͢c-��	�ċ`:�ep�
���C�Ԝ<�j��	�m�l5f�l�L�>SW���?,wP��S�)=��n�?,���e͟�V�o0Q��4'F��dJV��(<(v'T��B�,���O:|�U�Ѩ���+_��$���X���l�T�}��ɰ��M��é|���߭���e�l�z��g�Ż������g�J*Ŋ���]�QQ�5
W�d�D�%�(�4���?�%�N���V���O���W~��������j������S�ͪ��� s��0�@B)��A��dM��Nj���~���v��V�f���~��WҜ0���� �I`�SMF;�(�%���	ͮ5��N��i��[��ݠY�^i�t/��v��l$4����xVB�Aq����f?d�#���c��=��Y�Yn_�9p���fR��$�Mn�A-j�Yg��xQ�q�\F'R�|fx��p�Y�7$*c`�~Ξ ��qG��nG�
�"2\sp�K-i�vע��D��l��A	<c�*b����dߨh$(�"�S!�/����L.(LMC�g�b+U��1R�����~��;�%o6O��Õ�B,<F�xvaGe�ed�9�l��bR����͜�]��U�!|��X�~��1+hA7r��u���=S�Mxe�y��[3��+�դ���f�R�`�М�@��.�=3J��̛f�����3|.�HO8Q��Q�gklО�È�:�8LQ3�S^��Jt]�%�CI�)$��JITH�WC�0�4�*5t�6�֏�k���4�lM����Daq:����ɑ�x�l)�+J�\�i ������P`e����W�"y���� �g���Qo�-��p�Q����r-GA(<� "��<�)���P<�<���-`G��_��Qs|匂��R�~�g��+i�)W��$�"��VY���H�uն\���|��o��xF��$�㤊�o�u �}"�������|}��ssss�/�}      $   �  x�}�KҴ*�1��S����3Qo�DQW�'|b���S��!V�pnT�����L��#��T�p�2��L�I�W�e�H��'�v)zh��ʻu��$Aj�bۼQcs<(SR�EA[±���6��n:�c��$&g(i)�}N�4WBQ�>VFf'a��IwJ�}=*�E	���|=��6R�s$N}=��mV�H���OM`�H�_IP�i[��/���,�0_��5�h���
v�@qR�v��#H�r
��KW���F�E����;��9��(��Lq��z!�--�Z���c�F��Tt�1���G�Z�Ŵ�L���g���w�E?f3��b��N/��|"v�b��j9q�L$����͞�|叴 3J~2s�F�|`;؎���z����|�Q��[�^���r�A=���)�6-I�w�|�����$(���9e[��^�v�9�˭ �⧬���V�R��W4c��Β2��~A`*h��~Z�~^"��N7UWmv�|`�[����^RNg���ɤ~ʒ:c˞�/��|Պo�6���~ɾ$�+Z����k°�~ҹKZ&R������2Í��S/�S���{ݿԻ�I{b�'�v67�cz����_߉f+g���`'���<Y���C>0X���[���!&���F2Z;�Ի�ղ6`�OY�j���{;��V�G`�P?��3���F/����"�?eJ���d�R�Χ�����~.�ɹW׳��W��-�T���IWU�����|p�������l���W��}u�wN�zw�Y4�`~?��\�U{��[�~.��SS}<����wTVr�<�����~�L�qm�W���S|sٗzw�kv�&6�M�޺shH�y��s��c�6{^6���ۦau�w�G���v�-��.�:����nR�T�K=�������'���      &      x������ � �      #   �  x�e�[Ν ����(:����M����Tܢ�3�8:��E�?��'oP?{�_�/!�2���$�i3�I�k���h�pl���V�/������@:8fF���x��x��N'Gcd�/D�[c4T���Bݶy�����F���D�n�^���2,���zӢ��X7�'�Y�4׺oyW�`�x���%3�}М��h޲-�W�����h��J�E���F+A��gi�q5�;v�*p�>:`<!��N/y*��z�`*4�{ڎu���L���5ۯ�J;���"�D�Ϫ��gN;`j0C����/9��nx.��!��߫�&��hdܖv�����E�o�8K;`��ҀFq��S�i�gw�4�أ����� ��؏����[Qߒ��v�L`��͗��v��`��]�U�:�<6P�u�6��F���_߳,� C�         �  x���Mo�@���+|��e�Z85��P;`�~D�*XcX{�M0��m���4i^�4�<���+��!Du�S��fbeR���`��2aкT^B%��Vu��l��:V)E��AH��O�d���(ꦆa"�u.,몦�[]f+�<ӈ��%�tL8�\Y�d���CҟO��"ج���~�Ӷ�i؈`�ŧ��s�~�l6C�N�U�{�5�,��ĳ�,�f>�4�]���tR1�B��
6���͵��4�+=��bn��N��7�v�/"��M�%��A�?�瓈�<j�X����}2%`ݹ\�d�gZ�� �7����!Ri����x&`tFlp{�m,�?x����P��1���x����p�����"��騏�h������^�;�0Y �!�`���u�TU��f��      )      x������ � �         �   x�m�1
�0F�9>E�� ��%9��	Evb�ҩ���s�m���!B�[����A�[�-�U]��j��G���1&ȥxk���Պ���~:K�"�I3�F�A6��X��N�]R(F����������U��u��5��=,�     