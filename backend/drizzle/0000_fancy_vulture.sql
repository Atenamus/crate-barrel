CREATE TABLE "orderItemtable" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "orderItemtable_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"orderId" integer NOT NULL,
	"productId" integer NOT NULL,
	"quantity" integer NOT NULL,
	"pricePerItem" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user-order" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user-order_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer,
	"orderDate" timestamp DEFAULT now(),
	"shippingAddress" text NOT NULL,
	"status" text,
	"paymentMethod" text,
	"totalAmount" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "product_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"productName" text NOT NULL,
	"imgUrl" text NOT NULL,
	"productDesc" text NOT NULL,
	"price" integer NOT NULL,
	"stock" integer DEFAULT 5 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"address" text NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "orderItemtable" ADD CONSTRAINT "orderItemtable_orderId_user-order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."user-order"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderItemtable" ADD CONSTRAINT "orderItemtable_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user-order" ADD CONSTRAINT "user-order_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;