import { render } from "../tools/render.js";
import {
  getPublishedProgrammes,
  getPublishedProgrammeById,
  getModulesForProgramme
} from "../models/programme.js";
import { programmesView } from "../views/programmes.js";
import { programmeDetailView } from "../views/programme-detail.js";
import { notFoundView } from "../views/not-found.js";

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

export function programmesController(ctx) {
  const programmes = getPublishedProgrammes();

  return render(programmesView, { programmes }, ctx);
}

export function programmeDetailController(ctx) {
  const { programmeId } = ctx.params;

  const programme = getPublishedProgrammeById(programmeId);

  if (!programme) {
    return render(notFoundView, {}, { ...ctx, status: 404 });
  }

  const modules = getModulesForProgramme(programmeId);
  const modulesByYear = groupModulesByYear(modules);

  return render(programmeDetailView, { programme, modulesByYear }, ctx);
}