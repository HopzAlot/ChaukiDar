const FIREWORKS_PREFIX = 'accounts/fireworks/models/';

export function displayModelName(name: string | null | undefined) {
  if (!name) return 'Unknown model';
  return name.startsWith(FIREWORKS_PREFIX) ? name.slice(FIREWORKS_PREFIX.length) : name;
}
