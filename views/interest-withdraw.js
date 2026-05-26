import { escape } from "@std/html";

function safe(value = "") {
  return escape(String(value ?? ""));
}

export function interestWithdrawView({ interest, withdrawn = false }) {
  if (withdrawn) {
    return `
      <section class="page-panel success-panel">
        <p class="eyebrow">Interest withdrawn</p>
        <h2>Your interest has been withdrawn</h2>

        <p>
          The interest registration for
          <strong>${safe(interest.programmeTitle)}</strong> has been removed.
        </p>

        <p>
          We will no longer use <strong>${safe(interest.studentEmail)}</strong>
          for updates about this programme.
        </p>

        <a class="button" href="/programmes">Back to programmes</a>
      </section>
    `;
  }

  return `
    <section class="page-panel">
      <p class="eyebrow">Withdraw interest</p>
      <h2>Confirm withdrawal</h2>

      <p>
        You are about to withdraw your interest in
        <strong>${safe(interest.programmeTitle)}</strong>.
      </p>

      <p>
        This will remove <strong>${safe(interest.studentEmail)}</strong> from
        the mailing list for this programme.
      </p>

      <form
        method="POST"
        action="/interests/${safe(interest.withdrawToken)}/withdraw"
        class="form-actions"
      >
        <button class="button danger" type="submit">Yes, withdraw my interest</button>
        <a class="button secondary" href="/programmes">Cancel</a>
      </form>
    </section>
  `;
}