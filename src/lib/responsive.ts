export type ViewportSize = 'mobile' | 'tablet' | 'desktop' | 'large' | 'ultrawide';

export function getViewportSize(): ViewportSize {
  if (typeof window === 'undefined') return 'desktop';

  const width = window.innerWidth;

  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width < 1440) return 'desktop';
  if (width < 1920) return 'large';
  return 'ultrawide';
}

export function getCameraSettings(viewport: ViewportSize) {
  const settings = {
    mobile: {
      position: [0, 1.5, 7] as [number, number, number],
      fov: 45,
      minDistance: 4,
      maxDistance: 8,
    },
    tablet: {
      position: [0, 1.6, 8] as [number, number, number],
      fov: 42,
      minDistance: 5,
      maxDistance: 9,
    },
    desktop: {
      position: [0, 1.7, 9.5] as [number, number, number],
      fov: 42,
      minDistance: 5,
      maxDistance: 9,
    },
    large: {
      position: [0, 1.7, 10] as [number, number, number],
      fov: 40,
      minDistance: 6,
      maxDistance: 10,
    },
    ultrawide: {
      position: [0, 1.7, 11] as [number, number, number],
      fov: 38,
      minDistance: 7,
      maxDistance: 11,
    },
  };

  return settings[viewport];
}

export function getModelScale(viewport: ViewportSize): number {
  const scales = {
    mobile: 1.3,
    tablet: 1.45,
    desktop: 1.65,
    large: 1.7,
    ultrawide: 1.75,
  };

  return scales[viewport];
}

export function getPlatformScale(viewport: ViewportSize): number {
  const scales = {
    mobile: 0.8,
    tablet: 0.9,
    desktop: 1,
    large: 1.05,
    ultrawide: 1.1,
  };

  return scales[viewport];
}