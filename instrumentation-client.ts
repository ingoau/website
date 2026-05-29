import posthog from "posthog-js";

const posthogKey = "";
const enableInstrumentation = false;
const isDevelopment = false;

if (posthogKey && (!isDevelopment || enableInstrumentation)) {
  posthog.init(posthogKey, {
    api_host: "https://us.i.posthog.com",
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24",
    capture_exceptions: true, // This enables capturing exceptions using Error Tracking
    debug: isDevelopment,
    person_profiles: "always",
    disable_surveys: true,
    // disable_external_dependency_loading: true,
    disable_session_recording: true,
  });
}
