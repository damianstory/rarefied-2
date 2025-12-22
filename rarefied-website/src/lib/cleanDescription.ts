/**
 * Cleans episode descriptions by removing trailing URLs and timestamps
 * that were copied over from Buzzsprout.
 */
export function cleanDescription(description: string): string {
  if (!description) return "";

  let cleaned = description;

  // Remove everything starting from first URL (https:// or http://)
  cleaned = cleaned.split(/https?:\/\//)[0];

  // Remove trailing timestamps pattern (e.g., "00:00 Introduction 00:33 Meet the...")
  // Handles both with and without space before timestamp (e.g., "habitats.00:00" or "habitats. 00:00")
  cleaned = cleaned.replace(/\s*\d{2}:\d{2}\s*[A-Z][\s\S]*$/, "");

  return cleaned.trim();
}
