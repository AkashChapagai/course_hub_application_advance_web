import { render } from "../tools/render.js";
import { redirect } from "../tools/redirect.js";
import {
  getPublishedProgrammeById,
  getModulesForProgramme
} from "../models/programme.js";
import {
  createInterest,
  getInterestById
} from "../models/interest.js";
import { programmeDetailView } from "../views/programme-detail.js";
import { interestSuccessView } from "../views/interest-success.js";
import { notFoundView } from "../views/not-found.js";
import {
  validateSchema,
  interestSchema
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

export async function createInterestController(ctx) {
  const { request, params } = ctx;
  const { programmeId } = params;

  const programme = getPublishedProgrammeById(programmeId);

  if (!programme) {
    return render(notFoundView, {}, { ...ctx, status: 404 });
  }

  const formData = await request.formData();
  const { isValid, errors, validated } = validateSchema(formData, interestSchema);

  if (!isValid) {
    const modules = getModulesForProgramme(programmeId);
    const modulesByYear = groupModulesByYear(modules);

    return render(
      programmeDetailView,
      { programme, modulesByYear, errors },
      { ...ctx, status: 400 }
    );
  }

  const interest = createInterest({
    programmeId,
    studentName: validated.studentName,
    studentEmail: validated.studentEmail
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