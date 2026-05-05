const AVATAR_COLORS = [
  '#1A73E8',
  '#00C853',
  '#FF6D00',
  '#9C27B0',
  '#E91E63',
  '#00BCD4',
  '#FF5722',
  '#607D8B',
];

export function getAvatarColor(name: string): string {
  if (!name) return AVATAR_COLORS[0];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export function extractNameFromEmail(email: string): { firstName: string; lastName: string } {
  const localPart = email.split('@')[0];
  const parts = localPart.split(/[._\-+]/).filter(Boolean);
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  if (parts.length >= 2) {
    return { firstName: capitalize(parts[0]), lastName: capitalize(parts[1]) };
  }
  return { firstName: capitalize(parts[0] || 'User'), lastName: '' };
}
