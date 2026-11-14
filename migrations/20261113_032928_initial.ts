import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_service_categories_slug" AS ENUM('examens', 'pathologies', 'interventions');
  CREATE TYPE "public"."enum_service_categories_icon" AS ENUM('eye', 'microscope', 'zap');
  CREATE TYPE "public"."enum_testimonials_dir" AS ENUM('ltr', 'rtl');
  CREATE TABLE "service_categories_card_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "service_categories_subcategories_equipment" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "service_categories_subcategories_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "service_categories_subcategories_conditions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "service_categories_subcategories_treatments" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"desc" varchar NOT NULL
  );
  
  CREATE TABLE "service_categories_subcategories_interventions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"desc" varchar NOT NULL
  );
  
  CREATE TABLE "service_categories_subcategories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "service_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" "enum_service_categories_slug" NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"icon" "enum_service_categories_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"card_description" varchar,
  	"card_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"dir" "enum_testimonials_dir" DEFAULT 'ltr' NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"service_categories_id" integer,
  	"testimonials_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"intro" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_label" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "biography_experience_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "biography_diplomas_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "biography" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"badge" varchar,
  	"headline" varchar NOT NULL,
  	"headline_subtitle" varchar,
  	"education_institution" varchar,
  	"education_diploma" varchar,
  	"experience_title" varchar,
  	"diplomas_title" varchar,
  	"diplomas_institution" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"display" varchar NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" varchar,
  	"address" varchar,
  	"landmark" varchar,
  	"email" varchar,
  	"hours" varchar,
  	"map_embed_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "service_categories_card_features" ADD CONSTRAINT "service_categories_card_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_categories_subcategories_equipment" ADD CONSTRAINT "service_categories_subcategories_equipment_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_categories_subcategories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_categories_subcategories_applications" ADD CONSTRAINT "service_categories_subcategories_applications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_categories_subcategories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_categories_subcategories_conditions" ADD CONSTRAINT "service_categories_subcategories_conditions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_categories_subcategories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_categories_subcategories_treatments" ADD CONSTRAINT "service_categories_subcategories_treatments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_categories_subcategories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_categories_subcategories_interventions" ADD CONSTRAINT "service_categories_subcategories_interventions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_categories_subcategories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_categories_subcategories" ADD CONSTRAINT "service_categories_subcategories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_categories_subcategories" ADD CONSTRAINT "service_categories_subcategories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_categories" ADD CONSTRAINT "service_categories_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_categories_fk" FOREIGN KEY ("service_categories_id") REFERENCES "public"."service_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_slides" ADD CONSTRAINT "hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hero_slides" ADD CONSTRAINT "hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "biography_experience_items" ADD CONSTRAINT "biography_experience_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."biography"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "biography_diplomas_items" ADD CONSTRAINT "biography_diplomas_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."biography"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "biography" ADD CONSTRAINT "biography_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_phones" ADD CONSTRAINT "contact_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "service_categories_card_features_order_idx" ON "service_categories_card_features" USING btree ("_order");
  CREATE INDEX "service_categories_card_features_parent_id_idx" ON "service_categories_card_features" USING btree ("_parent_id");
  CREATE INDEX "service_categories_subcategories_equipment_order_idx" ON "service_categories_subcategories_equipment" USING btree ("_order");
  CREATE INDEX "service_categories_subcategories_equipment_parent_id_idx" ON "service_categories_subcategories_equipment" USING btree ("_parent_id");
  CREATE INDEX "service_categories_subcategories_applications_order_idx" ON "service_categories_subcategories_applications" USING btree ("_order");
  CREATE INDEX "service_categories_subcategories_applications_parent_id_idx" ON "service_categories_subcategories_applications" USING btree ("_parent_id");
  CREATE INDEX "service_categories_subcategories_conditions_order_idx" ON "service_categories_subcategories_conditions" USING btree ("_order");
  CREATE INDEX "service_categories_subcategories_conditions_parent_id_idx" ON "service_categories_subcategories_conditions" USING btree ("_parent_id");
  CREATE INDEX "service_categories_subcategories_treatments_order_idx" ON "service_categories_subcategories_treatments" USING btree ("_order");
  CREATE INDEX "service_categories_subcategories_treatments_parent_id_idx" ON "service_categories_subcategories_treatments" USING btree ("_parent_id");
  CREATE INDEX "service_categories_subcategories_interventions_order_idx" ON "service_categories_subcategories_interventions" USING btree ("_order");
  CREATE INDEX "service_categories_subcategories_interventions_parent_id_idx" ON "service_categories_subcategories_interventions" USING btree ("_parent_id");
  CREATE INDEX "service_categories_subcategories_order_idx" ON "service_categories_subcategories" USING btree ("_order");
  CREATE INDEX "service_categories_subcategories_parent_id_idx" ON "service_categories_subcategories" USING btree ("_parent_id");
  CREATE INDEX "service_categories_subcategories_image_idx" ON "service_categories_subcategories" USING btree ("image_id");
  CREATE UNIQUE INDEX "service_categories_slug_idx" ON "service_categories" USING btree ("slug");
  CREATE INDEX "service_categories_card_card_image_idx" ON "service_categories" USING btree ("card_image_id");
  CREATE INDEX "service_categories_updated_at_idx" ON "service_categories" USING btree ("updated_at");
  CREATE INDEX "service_categories_created_at_idx" ON "service_categories" USING btree ("created_at");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_service_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("service_categories_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "hero_slides_order_idx" ON "hero_slides" USING btree ("_order");
  CREATE INDEX "hero_slides_parent_id_idx" ON "hero_slides" USING btree ("_parent_id");
  CREATE INDEX "hero_slides_image_idx" ON "hero_slides" USING btree ("image_id");
  CREATE INDEX "biography_experience_items_order_idx" ON "biography_experience_items" USING btree ("_order");
  CREATE INDEX "biography_experience_items_parent_id_idx" ON "biography_experience_items" USING btree ("_parent_id");
  CREATE INDEX "biography_diplomas_items_order_idx" ON "biography_diplomas_items" USING btree ("_order");
  CREATE INDEX "biography_diplomas_items_parent_id_idx" ON "biography_diplomas_items" USING btree ("_parent_id");
  CREATE INDEX "biography_photo_idx" ON "biography" USING btree ("photo_id");
  CREATE INDEX "contact_phones_order_idx" ON "contact_phones" USING btree ("_order");
  CREATE INDEX "contact_phones_parent_id_idx" ON "contact_phones" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "service_categories_card_features" CASCADE;
  DROP TABLE "service_categories_subcategories_equipment" CASCADE;
  DROP TABLE "service_categories_subcategories_applications" CASCADE;
  DROP TABLE "service_categories_subcategories_conditions" CASCADE;
  DROP TABLE "service_categories_subcategories_treatments" CASCADE;
  DROP TABLE "service_categories_subcategories_interventions" CASCADE;
  DROP TABLE "service_categories_subcategories" CASCADE;
  DROP TABLE "service_categories" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "hero_slides" CASCADE;
  DROP TABLE "hero" CASCADE;
  DROP TABLE "biography_experience_items" CASCADE;
  DROP TABLE "biography_diplomas_items" CASCADE;
  DROP TABLE "biography" CASCADE;
  DROP TABLE "contact_phones" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_service_categories_slug";
  DROP TYPE "public"."enum_service_categories_icon";
  DROP TYPE "public"."enum_testimonials_dir";`)
}
