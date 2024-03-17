import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const createMessage = mutation({
  args: {
    body: v.string(),
    user: v.string(),
    isAi: v.boolean(),
    chatId: v.optional(v.id("chats")),
  },
  handler: async (ctx, args) => {
    const chat = await ctx.db.insert("messages", {
      body: args.body,
      user: args.user,
      isAi: args.isAi,
      chatId: args.chatId,
    });
    return chat;
  },
});

export const getMessages = query({
  args: {
    user: v.string(),
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {
    const chats = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("user"), args.user))
      .filter((q) => q.eq(q.field("chatId"), args.chatId))
      .collect();

    return chats;
  },
});

export const createChat = mutation({
  args: {
    user: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const chat = await ctx.db.insert("chats", {
      user: args.user,
      title: args.title,
    });
    return chat;
  },
});

export const getChats = query({
  args: {
    user: v.string(),
  },
  handler: async (ctx, args) => {
    const chats = await ctx.db
      .query("chats")
      .filter((q) => q.eq(q.field("user"), args.user))
      .order("desc")
      .collect();

    return chats;
  },
});

export const updateChatTitle = mutation({
  args: {
    chatId: v.id("chats"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const { chatId } = args;
    const title = await ctx.db.patch(chatId, { title: args.title });
    return title;
  },
});

export const deleteChat = mutation({
  args: {
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.chatId);
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("chatId"), args.chatId))
      .collect();
    for (const message of messages) {
      await ctx.db.delete(message._id);
    }
  },
});

export const getChatFromId = query({
  args: {
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query("chats")
      .filter((q) => q.eq(q.field("_id"), args.chatId))
      .collect();
    return data[0];
  },
});
