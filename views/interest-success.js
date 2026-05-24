import { escape } from "@std/html";

export function interestSuccessView({ interest }) {
  return `
    <section class="page-panel success-panel">
      <p class="eyebrow">Interest registered</p>
      <h2>Thank you, ${escape(interest.studentName)}.</h2>

      <p>
        Your interest in
        <strong>${escape(interest.programmeTitle)}</strong>
        has been recorded.
      </p>

      <p>
        We will use
        <strong>${escape(interest.studentEmail)}</strong>
        to send relevant updates about this programme, open days and deadlines.
      </p>

      <div class="hero-actions">
        <a class="button" href="/programmes">Browse more programmes</a>
        <a class="button secondary" href="/">Return home</a>
      </div>
    </section>
  `;
}