export interface PrivacySection {
  title: string;
  content: string;
}

export const privacySections: PrivacySection[] = [
  {
    title: "1. Introduction",
    content: "Welcome to Shilingi, an application developed by Brian Kimeli, operating publicly under the developer name FinesseQ ('we', 'us', or 'our'). We are committed to protecting your privacy and ensuring that your financial data remains secure and private.",  },
  {
    title: "2. Data Collection & Processing (Offline First)",
    content:
      "Shilingi operates strictly as an offline-first application. We do not maintain external servers, and we do not collect, harvest, store, or transmit your personal or financial information to any third party or remote server. All application data remains processed exclusively on your local mobile device.",
  },
  {
    title: "3. Sensitive Permissions & SMS Transaction Automation",
    content:
      "To deliver our core functionality of automated financial tracking, budgeting, and transaction categorization, Shilingi requests access to the sensitive READ_SMS permission. This permission is strictly utilized to process incoming automated financial transaction notifications locally on your device. No non-financial SMS logs are read, and no text message contents are exfiltrated or transmitted off your device.",
  },
  {
    title: "4. Secure Storage of Information",
    content:
      "All structured transaction data, budget allocations, and informal savings group tracking parameters are localized within a secure sandboxed database on your device. This data is omitted from external cloud backup routines managed by the application.",
  },
  {
    title: "5. Third-Party Libraries and SDKs",
    content:
      "We prioritize data minimization. Shilingi does not integrate third-party advertising SDKs, analytic tracking networks, or remote cloud telemetry components that silently aggregate user interactions or financial parameters.",
  },
  {
    title: "6. Data Retention and Deletion Rights",
    content:
      "As all data is structurally isolated to your local hardware, you retain absolute sovereignty over your records. You can execute full data erasure at any time by utilizing the 'Clear Storage' function inside your Android System Settings or by uninstalling the application. These actions instantly and permanently destroy all data processed by Shilingi.",
  },
  {
    title: "7. Contact Information",
    content:
      "For inquiries regarding this Privacy Policy or our offline data handling practices, please contact the developer via email at briankimeli06@gmail.com.",
  },
];
