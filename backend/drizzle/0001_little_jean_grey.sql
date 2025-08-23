CREATE TABLE "order-item" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "order-item_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"orderId" integer NOT NULL,
	"productId" integer NOT NULL,
	"quantity" integer NOT NULL,
	"pricePerItem" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
DROP TABLE "orderItemtable" CASCADE;--> statement-breakpoint
ALTER TABLE "order-item" ADD CONSTRAINT "order-item_orderId_user-order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."user-order"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order-item" ADD CONSTRAINT "order-item_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE restrict ON UPDATE no action;