import { useCallback, useId } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

interface SparklesProps {
  className?: string;
  size?: number;
  minSize?: number | null;
  density?: number;
  speed?: number;
  minSpeed?: number | null;
  opacity?: number;
  opacitySpeed?: number;
  minOpacity?: number | null;
  color?: string;
  background?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, any>;
}

function SparklesInner({
  id,
  className,
  options,
}: {
  id: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<string, any>;
}) {
  return (
    <Particles
      id={id}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options={options as any}
      className={className}
    />
  );
}

export function Sparkles({
  className,
  size = 1,
  minSize = null,
  density = 800,
  speed = 1,
  minSpeed = null,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity = null,
  color = '#FFFFFF',
  background = 'transparent',
  options = {},
}: SparklesProps) {
  const id = useId();

  const init = useCallback(async (engine: Parameters<typeof loadSlim>[0]) => {
    await loadSlim(engine);
  }, []);

  const defaultOptions = {
    background: { color: { value: background } },
    fullScreen: { enable: false, zIndex: 1 },
    fpsLimit: 120,
    particles: {
      color: { value: color },
      move: {
        enable: true,
        direction: 'none',
        speed: { min: minSpeed ?? speed / 10, max: speed },
        straight: false,
      },
      number: { value: density },
      opacity: {
        value: { min: minOpacity ?? opacity / 10, max: opacity },
        animation: { enable: true, sync: false, speed: opacitySpeed },
      },
      size: { value: { min: minSize ?? size / 2.5, max: size } },
    },
    detectRetina: true,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <ParticlesProvider init={init}>
      <SparklesInner id={id} options={mergedOptions} className={className} />
    </ParticlesProvider>
  );
}
