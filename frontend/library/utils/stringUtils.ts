// lib/utils/stringUtils.ts
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, length = 20): string {
  return str.length > length ? str.slice(0, length) + '…' : str;
}
