CREATE TABLE "Users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"cpf" varchar(11) NOT NULL,
	"password" varchar(255) NOT NULL,
	"phone" varchar(20),
	"birth_date" DATE,
	"picture" TEXT,
	CONSTRAINT "Users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "Books" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" TEXT NOT NULL,
	"price" integer NOT NULL,
	"image" TEXT NOT NULL,
	"video" TEXT,
	"quantity" integer NOT NULL,
	"author_id" integer NOT NULL,
	CONSTRAINT "Books_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "Books_categories" (
	"id" serial NOT NULL,
	"category_id" integer NOT NULL,
	"book_id" integer NOT NULL,
	CONSTRAINT "Books_categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "Categories" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	"background_img" TEXT NOT NULL,
	"category_group_id" integer NOT NULL,
	CONSTRAINT "Categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "Addresses" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"state" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"district" varchar(255) NOT NULL,
	"street" varchar(255) NOT NULL,
	"cep" varchar(255) NOT NULL,
	"complement" varchar(255),
	CONSTRAINT "Addresses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "Carts" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "Carts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "Cart_books" (
	"id" serial NOT NULL,
	"book_id" integer NOT NULL,
	"cart_id" integer NOT NULL,
	CONSTRAINT "Cart_books_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "Category_groups" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "Category_groups_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "Payments" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"card number" varchar(16) NOT NULL,
	"expiration_date" varchar(5) NOT NULL,
	"network" varchar(255) NOT NULL,
	CONSTRAINT "Payments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "Closed_deals" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"book_id" integer NOT NULL,
	"purchase_date" DATE NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "Closed_deals_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "Sessions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" TEXT NOT NULL,
	CONSTRAINT "Sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "Authors" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "Authors_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "Books_categories" ADD CONSTRAINT "Books_categories_fk0" FOREIGN KEY ("category_id") REFERENCES "Categories"("id");
ALTER TABLE "Books_categories" ADD CONSTRAINT "Books_categories_fk1" FOREIGN KEY ("book_id") REFERENCES "Books"("id");
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_fk0" FOREIGN KEY ("category_group_id") REFERENCES "Category_groups"("id");
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");
ALTER TABLE "Carts" ADD CONSTRAINT "Carts_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");
ALTER TABLE "Cart_books" ADD CONSTRAINT "Cart_books_fk0" FOREIGN KEY ("book_id") REFERENCES "Books"("id");
ALTER TABLE "Cart_books" ADD CONSTRAINT "Cart_books_fk1" FOREIGN KEY ("cart_id") REFERENCES "Carts"("id");
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");
ALTER TABLE "Closed_deals" ADD CONSTRAINT "Closed_deals_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");
ALTER TABLE "Closed_deals" ADD CONSTRAINT "Closed_deals_fk1" FOREIGN KEY ("book_id") REFERENCES "Books"("id");
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");
ALTER TABLE "Books" ADD CONSTRAINT "Books_fk0" FOREIGN KEY ("author_id") REFERENCES "Authors"("id");
​
