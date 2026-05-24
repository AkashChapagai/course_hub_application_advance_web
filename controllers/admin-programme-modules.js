import { render } from "../tools/render.js";
import { redirect } from "../tools/redirect.js";
import { requireAdmin } from "../tools/authorisation.js";

import { adminProgrammeModulesView } from "../views/admin-programme-modules.js";
import { notFoundView } from "../views/not-found.js";

import {
  getProgrammeForAdminById,
  getProgrammeModulesForAdmin,
  attachModuleToProgramme,
  removeModuleFromProgramme
} from "../models/programme.js";

import { getAllModulesForAdmin } from "../models/module.js";

import {
  validateSchema,
  programmeModuleSchema
} from "../tools/validation.js";

function loadProgrammeModulePageData(programmeId) {
  const programme = getProgrammeForAdminById(programmeId);

  if (!programme) {
    return null;
  }

  return {
    programme,
    currentModules: getProgrammeModulesForAdmin(programmeId),
    allModules: getAllModulesForAdmin()
  };
}

export function programmeModulesController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  const pageData = loadProgrammeModulePageData(ctx.params.programmeId);

  if (!pageData) {
    return render(notFoundView, {}, { ...ctx, status: 404 });
  }

  return render(
    adminProgrammeModulesView,
    pageData,
    ctx
  );
}

export async function attachProgrammeModuleController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  const { programmeId } = ctx.params;
  const pageData = loadProgrammeModulePageData(programmeId);

  if (!pageData) {
    return render(notFoundView, {}, { ...ctx, status: 404 });
  }

  const formData = await ctx.request.formData();
  const { isValid, errors, validated } = validateSchema(formData, programmeModuleSchema);

  if (!isValid) {
    return render(
      adminProgrammeModulesView,
      {
        ...pageData,
        errors
      },
      { ...ctx, status: 400 }
    );
  }

  attachModuleToProgramme({
    programmeId,
    moduleId: validated.moduleId,
    year: validated.year
  });

  return redirect(`/admin/programmes/${programmeId}/modules`);
}

export function removeProgrammeModuleController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  const { programmeId, moduleId } = ctx.params;

  removeModuleFromProgramme({
    programmeId,
    moduleId
  });

  return redirect(`/admin/programmes/${programmeId}/modules`);
}