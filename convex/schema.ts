import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    body: v.string(),
    user: v.string(),
    isAi: v.boolean(),
    chatId: v.optional(v.id("chats")),
  }),
  chats: defineTable({
    user: v.string(),
    title: v.string(),
  }),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});
