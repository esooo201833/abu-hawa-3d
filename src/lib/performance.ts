export type PerformanceLevel = 'low' | 'medium' | 'high';

export function detectPerformanceLevel(): PerformanceLevel {
  if (typeof window === 'undefined') return 'medium';

  const memory = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency || 4;
  const connection = (navigator as any).connection?.effectiveType;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    if (memory && memory < 4) return 'low';
    if (cores < 4) return 'low';
    if (connection === '2g' || connection === 'slow-2g') return 'low';
    return 'medium';
  }

  if (memory && memory >= 8 && cores >= 8) return 'high';
  if (memory && memory >= 4 && cores >= 4) return 'medium';
  return 'low';
}

export function getDevicePixelRatio(level: PerformanceLevel): number {
  if (typeof window === 'undefined') return 1;

  const base = window.devicePixelRatio || 1;

  switch (level) {
    case 'low':
      return Math.min(base, 1);
    case 'medium':
      return Math.min(base, 1.5);
    case 'high':
      return Math.min(base, 2);
    default:
      return Math.min(base, 1.5);
  }
}

export function getShadowQuality(level: PerformanceLevel): {
  mapSize: number;
  enabled: boolean;
} {
  switch (level) {
    case 'low':
      return { mapSize: 512, enabled: true };
    case 'medium':
      return { mapSize: 1024, enabled: true };
    case 'high':
      return { mapSize: 2048, enabled: true };
    default:
      return { mapSize: 1024, enabled: true };
  }
}

export function getAntialias(level: PerformanceLevel): boolean {
  return level !== 'low';
}

export function shouldReduceEffects(level: PerformanceLevel): boolean {
  return level === 'low';
}