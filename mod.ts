import { Hono } from "https://deno.land/x/hono@v3.10.4/mod.ts"

const app = new Hono()

app.get("/", c => 
    c.html(`
        <!doctype html>
        <html>
            <head>
            </head>
            <body>
                <table>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                </table>
                <script src="https://unpkg.com/adorable-css@1.4.3"></script>
            </body>
        </html>
    `)
)

Deno.serve({ port: 8081 }, app.fetch)