import { render } from "../tools/render.js";
import { redirect } from "../tools/redirect.js";
import { requireAdmin } from "../tools/authorisation.js";

import { adminModulesView } from "../views/admin-modules.js";
import { adminModuleFormView } from "../views/admin-module-form.js";
import { notFoundView } from "../views/not-found.js";
import { getAllStaff } from "../models/staff.js";

import {
  getAllModulesForAdmin,
  getModuleForAdminById,
  createModule,
  updateModule,
  deleteModule
} from "../models/module.js";


import {
  validateSchema,
  moduleSchema
} from "../tools/validation.js";

function formDataToModule(validated) {
  return {
    title: validated.title,
    description: validated.description,
    moduleLeaderId: validated.moduleLeaderId || null
  };
}

export function adminModulesController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  const modules = getAllModulesForAdmin();

  return render(
    adminModulesView,
    { modules },
    ctx
  );
}

export function newModuleFormController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  const staff = getAllStaff();

  return render(
    adminModuleFormView,
    {
      mode: "new",
      staff
    },
    ctx
  );
}

export async function createModuleController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  const formData = await ctx.request.formData();
  const { isValid, errors, validated } = validateSchema(formData, moduleSchema);
  const staff = getAllStaff();

  if (!isValid) {
    return render(
      adminModuleFormView,
      {
        mode: "new",
        staff,
        errors
      },
      { ...ctx, status: 400 }
    );
  }

  const module = createModule(formDataToModule(validated));

  return redirect(`/admin/modules/${module.id}/edit`);
}

export function editModuleFormController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  const module = getModuleForAdminById(ctx.params.moduleId);

  if (!module) {
    return render(notFoundView, {}, { ...ctx, status: 404 });
  }

  const staff = getAllStaff();

  return render(
    adminModuleFormView,
    {
      mode: "edit",
      module,
      staff
    },
    ctx
  );
}

export async function updateModuleController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  const module = getModuleForAdminById(ctx.params.moduleId);

  if (!module) {
    return render(notFoundView, {}, { ...ctx, status: 404 });
  }

  const formData = await ctx.request.formData();
  const { isValid, errors, validated } = validateSchema(formData, moduleSchema);
  const staff = getAllStaff();

  if (!isValid) {
    return render(
      adminModuleFormView,
      {
        mode: "edit",
        module,
        staff,
        errors
      },
      { ...ctx, status: 400 }
    );
  }

  updateModule(ctx.params.moduleId, formDataToModule(validated));

  return redirect("/admin/modules");
}

export function deleteModuleController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  deleteModule(ctx.params.moduleId);

  return redirect("/admin/modules");
}