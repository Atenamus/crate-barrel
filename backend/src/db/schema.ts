import { pgTable, integer, text, timestamp, decimal } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  address: text().notNull()
})

export const productTable = pgTable("product", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  productName: text().notNull(),
  imgUrl: text().notNull(),
  productDesc: text().notNull(),
  price: integer().notNull(),
  stock: integer().notNull().default(5)
})

export const orderTable = pgTable("user-order", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => userTable.id),
  orderDate: timestamp().defaultNow(),
  shippingAddress: text().notNull(),
  status: text(),
  paymentMethod: text(),
  totalAmount: decimal({ precision: 10, scale: 2 })
})

export const orderItemtable = pgTable("order-item", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer().references(() => orderTable.id, { onDelete: "cascade" }).notNull(),
  productId: integer().references(() => productTable.id, { onDelete: "restrict" }).notNull(),
  quantity: integer().notNull(),
  pricePerItem: decimal({ precision: 10, scale: 2 }).notNull()
})
