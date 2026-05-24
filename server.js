import { serveDir } from "@std/http/file-server";
import { currentSession } from "./tools/auth.js";
import { homeController } from "./controllers/home.js";

import {
  programmesController,
  programmeDetailController
} from "./controllers/programmes.js";

import {
  createInterestController,
  interestSuccessController
} from "./controllers/interests.js";

import {
  loginFormController,
  loginController,
  logoutController
} from "./controllers/sessions.js";

import {
  adminDashboardController,
  adminProgrammesController,
  newProgrammeFormController,
  createProgrammeController,
  editProgrammeFormController,
  updateProgrammeController,
  deleteProgrammeController,
  publishProgrammeController,
  unpublishProgrammeController
} from "./controllers/admin.js";

import {
  adminModulesController,
  newModuleFormController,
  createModuleController,
  editModuleFormController,
  updateModuleController,
  deleteModuleController
} from "./controllers/admin-modules.js";

import {
  programmeModulesController,
  attachProgrammeModuleController,
  removeProgrammeModuleController
} from "./controllers/admin-programme-modules.js";
import {
  adminInterestsController,
  deleteInterestController,
  programmeInterestsCsvController
} from "./controllers/admin-interests.js";

import { notFoundController } from "./controllers/not-found.js";

const programmeDetailPattern = new URLPattern({
  pathname: "/programmes/:programmeId"
});

const createInterestPattern = new URLPattern({
  pathname: "/programmes/:programmeId/interests"
});

const interestSuccessPattern = new URLPattern({
  pathname: "/interests/:interestId/success"
});

const editProgrammePattern = new URLPattern({
  pathname: "/admin/programmes/:programmeId/edit"
});

const updateProgrammePattern = new URLPattern({
  pathname: "/admin/programmes/:programmeId/update"
});

const deleteProgrammePattern = new URLPattern({
  pathname: "/admin/programmes/:programmeId/delete"
});

const publishProgrammePattern = new URLPattern({
  pathname: "/admin/programmes/:programmeId/publish"
});

const unpublishProgrammePattern = new URLPattern({
  pathname: "/admin/programmes/:programmeId/unpublish"
});

const programmeModulesPattern = new URLPattern({
  pathname: "/admin/programmes/:programmeId/modules"
});

const removeProgrammeModulePattern = new URLPattern({
  pathname: "/admin/programmes/:programmeId/modules/:moduleId/remove"
});

const editModulePattern = new URLPattern({
  pathname: "/admin/modules/:moduleId/edit"
});

const updateModulePattern = new URLPattern({
  pathname: "/admin/modules/:moduleId/update"
});

const deleteModulePattern = new URLPattern({
  pathname: "/admin/modules/:moduleId/delete"
});

const deleteInterestPattern = new URLPattern({
  pathname: "/admin/interests/:interestId/delete"
});

const programmeInterestsCsvPattern = new URLPattern({
  pathname: "/admin/programmes/:programmeId/interests.csv"
});

export async function handler(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  console.log(`${request.method} ${pathname}`);

  if (
    pathname.endsWith(".css") ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp")
  ) {
    return serveDir(request, { fsRoot: "public" });
  }

  const session = currentSession(request);
  const ctx = { request, session };

  // Public routes
  if (pathname === "/" && request.method === "GET") {
    return homeController(ctx);
  }

  if (pathname === "/programmes" && request.method === "GET") {
    return programmesController(ctx);
  }

  if (programmeDetailPattern.test(url) && request.method === "GET") {
    const params = programmeDetailPattern.exec(url).pathname.groups;
    return programmeDetailController({ ...ctx, params });
  }

  if (createInterestPattern.test(url) && request.method === "POST") {
    const params = createInterestPattern.exec(url).pathname.groups;
    return createInterestController({ ...ctx, params });
  }

  if (interestSuccessPattern.test(url) && request.method === "GET") {
    const params = interestSuccessPattern.exec(url).pathname.groups;
    return interestSuccessController({ ...ctx, params });
  }

  // Authentication routes
  if (pathname === "/login" && request.method === "GET") {
    return loginFormController(ctx);
  }

  if (pathname === "/sessions" && request.method === "POST") {
    return loginController(ctx);
  }

  if (pathname === "/logout" && request.method === "POST") {
    return logoutController(ctx);
  }

  // Admin dashboard
  if (pathname === "/admin" && request.method === "GET") {
    return adminDashboardController(ctx);
  }

  // Admin programme CRUD
  if (pathname === "/admin/programmes" && request.method === "GET") {
    return adminProgrammesController(ctx);
  }

  if (pathname === "/admin/programmes/new" && request.method === "GET") {
    return newProgrammeFormController(ctx);
  }

  if (pathname === "/admin/programmes" && request.method === "POST") {
    return createProgrammeController(ctx);
  }

  if (editProgrammePattern.test(url) && request.method === "GET") {
    const params = editProgrammePattern.exec(url).pathname.groups;
    return editProgrammeFormController({ ...ctx, params });
  }

  if (updateProgrammePattern.test(url) && request.method === "POST") {
    const params = updateProgrammePattern.exec(url).pathname.groups;
    return updateProgrammeController({ ...ctx, params });
  }

  if (deleteProgrammePattern.test(url) && request.method === "POST") {
    const params = deleteProgrammePattern.exec(url).pathname.groups;
    return deleteProgrammeController({ ...ctx, params });
  }

  if (publishProgrammePattern.test(url) && request.method === "POST") {
    const params = publishProgrammePattern.exec(url).pathname.groups;
    return publishProgrammeController({ ...ctx, params });
  }

  if (unpublishProgrammePattern.test(url) && request.method === "POST") {
    const params = unpublishProgrammePattern.exec(url).pathname.groups;
    return unpublishProgrammeController({ ...ctx, params });
  }

  // Admin programme-module linking
  if (programmeModulesPattern.test(url) && request.method === "GET") {
    const params = programmeModulesPattern.exec(url).pathname.groups;
    return programmeModulesController({ ...ctx, params });
  }

  if (programmeModulesPattern.test(url) && request.method === "POST") {
    const params = programmeModulesPattern.exec(url).pathname.groups;
    return attachProgrammeModuleController({ ...ctx, params });
  }

  if (removeProgrammeModulePattern.test(url) && request.method === "POST") {
    const params = removeProgrammeModulePattern.exec(url).pathname.groups;
    return removeProgrammeModuleController({ ...ctx, params });
  }

  // Admin module CRUD
  if (pathname === "/admin/modules" && request.method === "GET") {
    return adminModulesController(ctx);
  }

  if (pathname === "/admin/modules/new" && request.method === "GET") {
    return newModuleFormController(ctx);
  }

  if (pathname === "/admin/modules" && request.method === "POST") {
    return createModuleController(ctx);
  }

  if (editModulePattern.test(url) && request.method === "GET") {
    const params = editModulePattern.exec(url).pathname.groups;
    return editModuleFormController({ ...ctx, params });
  }

  if (updateModulePattern.test(url) && request.method === "POST") {
    const params = updateModulePattern.exec(url).pathname.groups;
    return updateModuleController({ ...ctx, params });
  }

  if (deleteModulePattern.test(url) && request.method === "POST") {
    const params = deleteModulePattern.exec(url).pathname.groups;
    return deleteModuleController({ ...ctx, params });
  }
  // Admin interests / mailing lists
if (pathname === "/admin/interests" && request.method === "GET") {
  return adminInterestsController(ctx);
}

if (deleteInterestPattern.test(url) && request.method === "POST") {
  const params = deleteInterestPattern.exec(url).pathname.groups;
  return deleteInterestController({ ...ctx, params });
}

if (programmeInterestsCsvPattern.test(url) && request.method === "GET") {
  const params = programmeInterestsCsvPattern.exec(url).pathname.groups;
  return programmeInterestsCsvController({ ...ctx, params });
}

return notFoundController(ctx);


}