import { useState, useEffect, useRef } from 'react';

const parseTarget = (targetString: string) => {
  const match = targetString.match(/^([^0-9\.\-]*)([0-9\.]+)(.*)$/);
  if (!match) return { prefix: '', number: 0, suffix: targetString, isFloat: false, decimals: 0 };
  
  const numberStr = match[2];
  const isFloat = numberStr.includes('.');
  const decimals = isFloat ? numberStr.split('.')[1].length : 0;
  
  return {
    prefix: match[1],
    number: parseFloat(numberStr),
    suffix: match[3],
    isFloat,
    decimals,
  };
};

export function useAnimatedCounter(targetString: string, durationMs: number, shouldAnimate: boolean) {
  const [currentString, setCurrentString] = useState(targetString);
  const currentNumberRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldAnimate) {
      const parsed = parseTarget(targetString);
      setCurrentString(`${parsed.prefix}0${parsed.suffix}`);
      return;
    }

    const { prefix, number: targetNumber, suffix, decimals } = parseTarget(targetString);
    const startNumber = currentNumberRef.current;
    
    if (targetNumber === startNumber) {
      setCurrentString(targetString);
      return;
    }

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentVal = startNumber + (targetNumber - startNumber) * easeOutQuart;
      
      setCurrentString(`${prefix}${currentVal.toFixed(decimals)}${suffix}`);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        currentNumberRef.current = targetNumber;
        setCurrentString(targetString);
      }
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [targetString, durationMs, shouldAnimate]);

  return currentString;
}
