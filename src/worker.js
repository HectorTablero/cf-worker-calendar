export default {
  async fetch(request, env, ctx) {
    try {
      if (request.url.endsWith("/everything")) {
        const value = await env.CALENDAR_DATA.get("everything");

        if (value === null) return new Response("Data not found", { status: 404 });

        const origin = request.headers.get("Origin");

        const allowedOriginPattern = /^https:\/\/([a-z0-9-]+\.)?tablerus\.es$/;

        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        };

        if (origin && allowedOriginPattern.test(origin)) {
          headers["Access-Control-Allow-Origin"] = origin;
        }

        //TEMP
        headers["Access-Control-Allow-Origin"] = origin;
        
        return new Response(value, { headers });
      }
      return new Response("Not Found", { status: 404 });
    } catch (e) {
      return new Response(e.message, { status: 500 });
    }
  }
}