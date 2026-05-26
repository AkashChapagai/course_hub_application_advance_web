import { escape } from "@std/html";

function safe(value = "") {
  return escape(String(value ?? ""));
}

export function interestSuccessView({ interest }) {
  return `
    <section class="page-panel success-panel">
      <p class="eyebrow">Interest registered</p>
      <h2>Thank you, ${safe(interest.studentName)}</h2>

      <p>
        Your interest in <strong>${safe(interest.programmeTitle)}</strong>
        (${safe(interest.programmeLevel)}) has been recorded.
      </p>

      <p>
        We will use <strong>${safe(interest.studentEmail)}</strong> to send you
        relevant updates about open days, application deadlines and programme
        information.
      </p>

      <div class="form-actions">
        <a class="button" href="/programmes">Browse more programmes</a>

        <a
          class="button secondary"
          href="/interests/${safe(interest.withdrawToken)}/withdraw"
        >
          Withdraw my interest
        </a>
      </div>
    </section>
  `;
}