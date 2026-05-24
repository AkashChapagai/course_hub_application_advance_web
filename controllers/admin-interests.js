import { render } from "../tools/render.js";
import { redirect } from "../tools/redirect.js";
import { requireAdmin } from "../tools/authorisation.js";

import { adminInterestsView } from "../views/admin-interests.js";

import {
  getAllInterestsForAdmin,
  getInterestsForProgramme,
  deleteInterest
} from "../models/interest.js";

import {
  getAllProgrammesForAdmin,
  getProgrammeForAdminById
} from "../models/programme.js";

function csvEscape(value) {
  const text = String(value ?? "");

  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replaceAll('"', '""')}"`;
  }

  return text;
}

function interestsToCsv(interests) {
  const header = [
    "Student Name",
    "Student Email",
    "Programme",
    "Level",
    "Registered At"
  ];

  const rows = interests.map((interest) => [
    interest.studentName,
    interest.studentEmail,
    interest.programmeTitle,
    interest.programmeLevel,
    interest.createdAt
  ]);

  return [header, ...rows]
    .map((row) => row.map(csvEscape).join(","))
    .join("\n");
}

export function adminInterestsController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  const url = new URL(ctx.request.url);
  const selectedProgrammeId = url.searchParams.get("programmeId") || "";

  const programmes = getAllProgrammesForAdmin();

  const interests = selectedProgrammeId
    ? getInterestsForProgramme(selectedProgrammeId)
    : getAllInterestsForAdmin();

  return render(
    adminInterestsView,
    {
      interests,
      programmes,
      selectedProgrammeId
    },
    ctx
  );
}

export function deleteInterestController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  deleteInterest(ctx.params.interestId);

  return redirect("/admin/interests");
}

export function programmeInterestsCsvController(ctx) {
  const blocked = requireAdmin(ctx);

  if (blocked) {
    return blocked;
  }

  const { programmeId } = ctx.params;
  const programme = getProgrammeForAdminById(programmeId);

  if (!programme) {
    return new Response("Programme not found.", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8"
      }
    });
  }

  const interests = getInterestsForProgramme(programmeId);
  const csv = interestsToCsv(interests);

  const filename = `${programme.title.toLowerCase().replaceAll(" ", "-")}-mailing-list.csv`;

  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${filename}"`
    }
  });
}