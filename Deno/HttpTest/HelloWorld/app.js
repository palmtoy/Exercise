// deno run --allow-net app.ts

import { serve } from 'https://deno.land/std@0.88.0/http/server.ts';

const port = 8000;
const s = serve({ port });

console.log(`http://localhost:${port}/`);

for await (const req of s) {
	req.respond({ body: new Date() +  ' ~ Hello World\n' });
}

