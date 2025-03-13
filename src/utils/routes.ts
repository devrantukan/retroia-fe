/**
 * Adds /emlak prefix to internal routes
 * @param path - The route path
 * @returns The path with /emlak prefix
 */
export const getRoute = (path: string): string => {
  // If path already starts with /emlak, return as is
  if (path.startsWith("/emlak")) {
    return `/${path}/`;
  }

  // Add /emlak to path, handling both paths with and without leading slash
  return `/emlak${path.startsWith("/") ? path : `/${path}/`}`;
};

/**
 * Checks if a URL is external
 * @param url - The URL to check
 * @returns boolean indicating if URL is external
 */
export const isExternalUrl = (url: string): boolean => {
  return (
    url.startsWith("http") ||
    url.startsWith("//") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:")
  );
};
