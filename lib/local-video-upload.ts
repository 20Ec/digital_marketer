const localHostnames = new Set(["localhost", "127.0.0.1", "::1"]);

export function isLocalDevelopmentHost(host: string | null): boolean {
  if (process.env.NODE_ENV !== "development" || !host) {
    return false;
  }

  try {
    return localHostnames.has(new URL(`http://${host}`).hostname.toLowerCase());
  } catch {
    return false;
  }
}

export function isAllowedLocalUploadRequest(request: Request): boolean {
  const host = request.headers.get("host");
  const origin = request.headers.get("origin");

  if (!isLocalDevelopmentHost(host) || !origin) {
    return false;
  }

  try {
    return new URL(origin).host.toLowerCase() === host?.toLowerCase();
  } catch {
    return false;
  }
}

export function requireCloudinaryEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name} in .env.local.`);
  }

  return value;
}
