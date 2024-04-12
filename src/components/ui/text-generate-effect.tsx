import { useEffect, useRef } from 'react';
import { useAnimate, stagger } from 'framer-motion';
import { cn } from '@/lib/utils';

export const TextGenerateEffect = ({
  words,
  isValid,
  className,
}: {
  words: string;
  isValid: boolean;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split('  ');
  const wasValidRef = useRef(false);

  useEffect(() => {
    if (isValid) {
      animate(
        'span',
        { opacity: 1, color: '#a5f3fc' },
        { duration: 0.8, delay: stagger(0.05) },
      );
      wasValidRef.current = true;
    } else if (wasValidRef.current) {
      animate(
        'span',
        { opacity: 0.5, color: '#A0AEC0' },
        { duration: 2.0, delay: stagger(0.05) },
      );
      wasValidRef.current = false;
    }
  }, [isValid, animate]);
  return (
    <div className={cn('font-bold', className)}>
      <div
        ref={scope}
        className="mt-0 text-2xl leading-snug tracking-wide "
      >
        {wordsArray.map((words, idx) => (
          <span
            key={`${words}-${idx}`}
            style={{ color: '#A0AEC0', opacity: 0.5 }}
            className="inline-block"
          >
            {words}
          </span>
        ))}
      </div>
    </div>
  );
};
