import { render } from "../tools/render.js";
import { redirect } from "../tools/redirect.js";
import { requireAdmin } from "../tools/authorisation.js";

import { adminDashboardView } from "../views/admin-dashboard.js";
import { adminProgrammesView } from "../views/admin-programmes.js";

import { notFoundView } from "../views/not-found.js";

import {
  getAllProgrammesForAdmin,
  getProgrammeForAdminById,
  createProgramme,
  updateProgramme,
  deleteProgramme,
  publishProgramme,
  unpublishProgramme
} from "../models/programme.js";

import { getAllStaff } from "../models/staff.js";

import {
  validateSchema,
  programmeSchema
} from "../tools/validation.js";

function formDataToProgramme(validated) {
  return {
    title: validated.title,
    level: validated.level,
    description: validated.description,
    programmeLeaderId: validated.programmeLeaderId || null,
    published: validated.published === "1"
  };
}

export function adminDashboardController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  return render(
    adminDashboardView,
    { session: ctx.session },
    ctx
  );
}

export function adminProgrammesController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  const programmes = getAllProgrammesForAdmin();

  return render(
    adminProgrammesView,
    { programmes },
    ctx
  );
}

export function newProgrammeFormController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  const staff = getAllStaff();

  return render(
    adminProgrammeFormView,
    {
      mode: "new",
      staff
    },
    ctx
  );
}

export async function createProgrammeController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  const formData = await ctx.request.formData();
  const { isValid, errors, validated } = validateSchema(formData, programmeSchema);
  const staff = getAllStaff();

  if (!isValid) {
    return render(
      adminProgrammeFormView,
      {
        mode: "new",
        staff,
        errors
      },
      { ...ctx, status: 400 }
    );
  }

  const programme = createProgramme(formDataToProgramme(validated));

  return redirect(`/admin/programmes/${programme.id}/edit`);
}

export function editProgrammeFormController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  const programme = getProgrammeForAdminById(ctx.params.programmeId);

  if (!programme) {
    return render(notFoundView, {}, { ...ctx, status: 404 });
  }

  const staff = getAllStaff();

  return render(
    adminProgrammeFormView,
    {
      mode: "edit",
      programme,
      staff
    },
    ctx
  );
}

export async function updateProgrammeController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  const programme = getProgrammeForAdminById(ctx.params.programmeId);

  if (!programme) {
    return render(notFoundView, {}, { ...ctx, status: 404 });
  }

  const formData = await ctx.request.formData();
  const { isValid, errors, validated } = validateSchema(formData, programmeSchema);
  const staff = getAllStaff();

  if (!isValid) {
    return render(
      adminProgrammeFormView,
      {
        mode: "edit",
        programme,
        staff,
        errors
      },
      { ...ctx, status: 400 }
    );
  }

  updateProgramme(ctx.params.programmeId, formDataToProgramme(validated));

  return redirect("/admin/programmes");
}

export function deleteProgrammeController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  deleteProgramme(ctx.params.programmeId);

  return redirect("/admin/programmes");
}

export function publishProgrammeController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  publishProgramme(ctx.params.programmeId);

  return redirect("/admin/programmes");
}

export function unpublishProgrammeController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  unpublishProgramme(ctx.params.programmeId);

  return redirect("/admin/programmes");
}