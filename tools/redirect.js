export function redirect(location, headers = new Headers()) {
  headers.set("Location", location);

  return new Response(null, {
    status: 303,
    headers
  });
}