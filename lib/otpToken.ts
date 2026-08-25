import crypto from "crypto";

const OTP_SECRET = process.env.OTP_SECRET || process.env.NEXTAUTH_SECRET || "modi-kia-secure-otp-secret-key-2026";

/**
 * Creates a stateless, HMAC-SHA256 signed token for OTP verification.
 * Does not depend on database or external table storage.
 */
export function createOtpToken(phoneNumber: string, otpCode: string, formSource: string = "") {
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity
  const payload = `${phoneNumber}:${otpCode}:${expiresAt}:${formSource}`;
  const hash = crypto.createHmac("sha256", OTP_SECRET).update(payload).digest("hex");
  const tokenData = JSON.stringify({ p: phoneNumber, e: expiresAt, s: formSource, h: hash });
  return Buffer.from(tokenData).toString("base64url");
}

/**
 * Verifies the stateless HMAC-SHA256 signed OTP token.
 */
export function verifyOtpToken(token: string | undefined, phoneNumber: string, inputOtp: string, formSource: string = "") {
  if (!token) {
    // If no token is passed, fall back to checking if inputOtp is 4 digits for legacy requests
    return { valid: false, reason: "Verification token missing. Please request a new OTP." };
  }

  try {
    const decodedStr = Buffer.from(token, "base64url").toString("utf-8");
    const decoded = JSON.parse(decodedStr);
    const { p, e, s, h } = decoded;

    if (p !== phoneNumber) {
      return { valid: false, reason: "Phone number mismatch. Please request a new OTP." };
    }

    if (Date.now() > e) {
      return { valid: false, reason: "OTP expired. Please request a new one." };
    }

    const expectedPayload = `${phoneNumber}:${inputOtp}:${e}:${s || ""}`;
    const expectedHash = crypto.createHmac("sha256", OTP_SECRET).update(expectedPayload).digest("hex");

    const hashBuffer = Buffer.from(h);
    const expectedBuffer = Buffer.from(expectedHash);

    if (hashBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(hashBuffer, expectedBuffer)) {
      return { valid: true };
    }

    return { valid: false, reason: "Invalid OTP code. Please check and try again." };
  } catch (err) {
    return { valid: false, reason: "Invalid verification token. Please request a new OTP." };
  }
}
