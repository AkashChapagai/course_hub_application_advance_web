import {
  getCookies,
  setCookie,
  deleteCookie
} from "@std/http/cookie";
import {
  createSession,
  getSession,
  deleteSession
} from "../models/session.js";

const sessionCookieName = "sessionId";

export function login(headers, user) {
  const sessionId = createSession(user.id);

  setCookie(headers, {
    name: sessionCookieName,
    value: sessionId,
    path: "/",
    httpOnly: true,
    sameSite: "Lax"
  });
}

export function logout(headers, request) {
  const session = currentSession(request);

  if (session) {
    deleteSession(session.id);
  }

  deleteCookie(headers, sessionCookieName, { path: "/" });
}

export function currentSession(request) {
  const cookies = getCookies(request.headers);
  const sessionId = cookies[sessionCookieName];

  if (!sessionId) {
    return null;
  }

  return getSession(sessionId) || null;
}