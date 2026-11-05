import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const schoolData = {
    status: "ok",
    data: {
      id: "zpps-bhingankhalsa",
      name: "Z.P.P.S. Bhingankhalsa",
      fullName: "Zilla Parishad Primary School Bhingankhalsa",
      motto: "Small school. Big dreams.",
      location: {
        village: "Bhingankhalsa",
        state: "Maharashtra",
        country: "India",
      },
      pillars: ["Learn", "Create", "Grow"],
      highlights: [
        "Pixel art reimagined campus",
        "AI-enhanced future skills curriculum",
        "School Mitra interactive voice assistant",
        "Digital library & hands-on play corner",
      ],
      assistant: {
        name: "School Mitra",
        greeting: "Namaste! I am School Mitra, your friendly school helper.",
        supportedModes: ["voice", "chat"],
      },
    },
    meta: {
      environment: "edge",
      timestamp: new Date().toISOString(),
      visitor: {
        city: context.geo?.city ?? "Unknown",
        country: context.geo?.country?.name ?? "Global",
      },
    },
  };

  return new Response(JSON.stringify(schoolData, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=120",
    },
  });
};

export const config: Config = {
  path: "/api/school-info",
  cache: "manual",
};

