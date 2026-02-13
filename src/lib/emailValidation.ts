/**
 * Validates email format using a comprehensive regex pattern
 * @param email - The email address to validate
 * @returns true if email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") {
    return false;
  }

  // RFC 5322 compliant email regex (simplified version)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(email.trim());
}

/**
 * Gets a user-friendly error message for invalid email
 * @param email - The email address to check
 * @returns Error message or null if email is valid
 */
export function getEmailValidationError(email: string): string | null {
  if (!email || email.trim().length === 0) {
    return "Email is required";
  }

  const trimmedEmail = email.trim();

  if (trimmedEmail.length > 254) {
    return "Email address is too long";
  }

  if (!trimmedEmail.includes("@")) {
    return "Email must contain @ symbol";
  }

  if (trimmedEmail.startsWith("@") || trimmedEmail.endsWith("@")) {
    return "Email cannot start or end with @ symbol";
  }

  const parts = trimmedEmail.split("@");
  if (parts.length !== 2) {
    return "Email must contain exactly one @ symbol";
  }

  const [localPart, domain] = parts;

  if (localPart.length === 0 || localPart.length > 64) {
    return "Invalid email format";
  }

  if (domain.length === 0 || !domain.includes(".")) {
    return "Email must have a valid domain";
  }

  if (!isValidEmail(trimmedEmail)) {
    return "Please enter a valid email address";
  }

  return null;
}







