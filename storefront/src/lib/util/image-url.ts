export function normalizeImageUrl(url?: string | null): string {
  if (!url) return ""
  const backendUrl =
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "https://api.sethorganicfarm.com"

  // Replace internal docker network URLs with public URL
  if (url.startsWith("http://seth_medusa_server:9000")) {
    return url.replace("http://seth_medusa_server:9000", backendUrl)
  }
  if (url.startsWith("http://localhost:9000")) {
    return url.replace("http://localhost:9000", backendUrl)
  }
  if (url.startsWith("http://82.29.165.210:9000")) {
    return url.replace("http://82.29.165.210:9000", backendUrl)
  }
  // If relative path, prepend backend URL
  if (url.startsWith("/") && !url.startsWith("//")) {
    return `${backendUrl}${url}`
  }
  return url
}
