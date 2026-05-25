import { render } from "../tools/render.js";
import { redirect } from "../tools/redirect.js";

import {
  getPublishedProgrammeById,
  getModulesForProgramme,
} from "../models/programme.js";

import {
  createInterest,
  getInterestById,
  getInterestForProgrammeByEmail,
} from "../models/interest.js";

import { programmeDetailView } from "../views/programme-detail.js";
import { interestSuccessView } from "../views/interest-success.js";
import { notFoundView } from "../views/not-found.js";

import {
  validateSchema,
  interestSchema,
} from "../tools/validation.js";

function groupModulesByYear(modules) {
  return modules.reduce((groups, module) => {
    const year = module.year;

    if (!groups[year]) {
      groups[year] = [];
    }

    groups[year].push(module);
    return groups;
  }, {});
}

function renderProgrammeDetailWithErrors(ctx, programme, errors, status = 400) {
  const modules = getModulesForProgramme(programme.id);
  const modulesByYear = groupModulesByYear(modules);

  return render(
    programmeDetailView,
    {
      programme,
      modulesByYear,
      errors,
    },
    {
      ...ctx,
      status,
    },
  );
}

export async function createInterestController(ctx) {
  const { request, params } = ctx;
  const { programmeId } = params;

  const programme = getPublishedProgrammeById(programmeId);

  if (!programme) {
    return render(notFoundView, {}, { ...ctx, status: 404 });
  }

  const formData = await request.formData();

  const {
    isValid,
    errors,
    validated,
  } = validateSchema(formData, interestSchema);

  if (!isValid) {
    return renderProgrammeDetailWithErrors(ctx, programme, errors, 400);
  }

  const duplicateInterest = getInterestForProgrammeByEmail({
    programmeId,
    studentEmail: validated.studentEmail,
  });

  if (duplicateInterest) {
    const duplicateErrors = {
      ...errors,
      studentName: {
        ...errors.studentName,
        value: validated.studentName,
      },
      studentEmail: {
        ...errors.studentEmail,
        value: validated.studentEmail,
        message: "This email address has already registered interest in this programme.",
        error: true,
      },
    };

    return renderProgrammeDetailWithErrors(ctx, programme, duplicateErrors, 409);
  }

  const interest = createInterest({
    programmeId,
    studentName: validated.studentName,
    studentEmail: validated.studentEmail,
  });

  return redirect(`/interests/${interest.id}/success`);
}

export function interestSuccessController(ctx) {
  const { interestId } = ctx.params;

  const interest = getInterestById(interestId);

  if (!interest) {
    return render(notFoundView, {}, { ...ctx, status: 404 });
  }

  return render(interestSuccessView, { interest }, ctx);
}