import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { findSupportedChatModel } from "@nightcode/shared";

type MockMessage = {
  id: string;
  role: string;
  content: string;
  mode: string;
  model: string;
  status: string;
  parts: null;
  duration: null;
  createdAt: string;
  sessionId: string;
};

type MockSession = {
  id: string;
  title: string;
  cwd: string | null;
  userId: string | null;
  createdAt: string;
  messages: MockMessage[];
};

export const Sessions: MockSession[] = [];
let nextId = 1;

const createSessionSchema = z.object({
  title: z.string(),
  path: z.string().optional(),
  initialMessage: z
    .object({
      role: z.string(),
      content: z.string(),
      mode: z.string(),
      model: z
        .string()
        .refine((id) => !!findSupportedChatModel(id), "UNSUPPPORTED MODEL1"),
    })
    .optional(),
});

const createSessionValidator = zValidator(
  "json",
  createSessionSchema,
  (result, c) => {
    if (!result.success) {
      return c.json({ error: "Invalid request body" }, 400);
    }
  },
);

const app = new Hono()
  .get("/", (c) => {
    const res = Sessions.map(({ id, title, createdAt }) => ({
      id,
      title,
      createdAt,
    }));
    return c.json(res);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");

    const session = Sessions.filter((s) => s.id === id);

    if (session.length < 1) {
      return c.json({ error: "Session not found" }, 404);
    }

    return c.json(session);
  })
  .post("/", createSessionValidator, async (c) => {
    const { initialMessage, ...data } = c.req.valid("json");
    const id = String(nextId++);
    const now = new Date().toISOString();

    const messages: MockMessage[] = [];

    if (initialMessage) {
      messages.push({
        id: String(nextId++),
        role: initialMessage.role,
        content: initialMessage.content,
        mode: initialMessage.mode,
        model: initialMessage.model,
        status: "COMPLETE",
        parts: null,
        duration: null,
        createdAt: now,
        sessionId: id,
      });
    }

    const session: MockSession = {
      id,
      title: data.tile,
      cwd: data.cwd ?? null,
      userId: "mock-user",
      createdAt: now,
      messages,
    };

    Sessions.push(session);
    return c.json(session, 201);
  });

export default app;
