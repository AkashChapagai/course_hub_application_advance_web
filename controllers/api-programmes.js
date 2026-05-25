import { getPublishedProgrammes } from "../models/programme.js";

export function apiProgrammesController() {
  try {
    const programmes = getPublishedProgrammes();

    return new Response(JSON.stringify({ programmes }), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Failed to load programmes API:", error);

    return new Response(
      JSON.stringify({
        error: "Unable to load programmes.",
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      },
    );
  }
}