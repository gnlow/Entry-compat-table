import { Hono } from "https://deno.land/x/hono@v3.10.4/mod.ts"

import view from "./gen.ts"

const app = new Hono()

app.get("/", c => 
    c.html(view)
)

Deno.serve({ port: 8081 }, app.fetch)