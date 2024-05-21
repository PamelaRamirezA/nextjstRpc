import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { publicPosts } from "~/server/db/schema";
import { eq } from 'drizzle-orm';

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(publicPosts).values({
        name: input.name,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.select().from(publicPosts).all();
    return posts.map(post => ({
      ...post,
      createdAt: new Date(post.createdAt * 1000),
      updatedAt: post.updatedAt ? new Date(post.updatedAt * 1000) : null,
    }));
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(publicPosts)
        .where(eq(publicPosts.id, parseInt(input.id)))
        .get();

      if (!result) {
        throw new Error(`Post with ID ${input.id} not found`);
      }
      return result;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1)
      }
      ))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(publicPosts)
        .set({ name: input.name })
        .where(eq(publicPosts.id, input.id))
        .run();
    }),
});
