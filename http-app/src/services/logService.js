function init() {
  // Raven.config(
  //   "https://762c9f929425451d897cd61cc25bacd9@o613563.ingest.sentry.io/5749241",
  //   {
  //     release: "1-0-0",
  //     environment: "development-test",
  //   }
  // ).install();
}

function log(error) {
  console.error(error);
  // Raven.captureException(error);
}

export default {
  init,
  log,
};
