import React, { useRef } from 'react';
import { Platform } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Path, Circle, G } from 'react-native-svg';

interface LogoProps {
  size?: number;
  variant?: 'default' | 'white';
}

// Counter for unique gradient IDs — prevents Android SVG gradient ID collisions
let idCounter = 0;

export default function Logo({ size = 80, variant = 'default' }: LogoProps) {
  const isWhite = variant === 'white';
  const idRef = useRef(`logo_${++idCounter}`);
  const uid = idRef.current;

  // On Android, SVG gradients inside Animated.View can fail to render.
  // Use solid colors as a reliable fallback.
  const useGradients = Platform.OS !== 'android';

  const shieldColor = isWhite ? '#F4F8FE' : '#1A73E8';
  const crossColor = isWhite ? '#1A73E8' : '#FFFFFF';
  const pulseColor = isWhite ? '#4ADE80' : '#00C853';

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {useGradients && (
        <Defs>
          <LinearGradient id={`${uid}_shield`} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={isWhite ? '#FFFFFF' : '#1A73E8'} />
            <Stop offset="100%" stopColor={isWhite ? '#E8F0FE' : '#1557B0'} />
          </LinearGradient>
          <LinearGradient id={`${uid}_cross`} x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={isWhite ? '#1A73E8' : '#FFFFFF'} />
            <Stop offset="100%" stopColor={isWhite ? '#1557B0' : '#E8F0FE'} />
          </LinearGradient>
          <LinearGradient id={`${uid}_pulse`} x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={isWhite ? '#69F0AE' : '#00C853'} />
            <Stop offset="100%" stopColor={isWhite ? '#00E676' : '#69F0AE'} />
          </LinearGradient>
        </Defs>
      )}

      {/* Shield shape */}
      <Path
        d="M50 4 L88 20 C88 20 90 55 75 75 C65 88 50 96 50 96 C50 96 35 88 25 75 C10 55 12 20 12 20 Z"
        fill={useGradients ? `url(#${uid}_shield)` : shieldColor}
      />

      {/* Inner shield border for depth */}
      <Path
        d="M50 10 L82 24 C82 24 84 54 71 72 C63 83 50 90 50 90 C50 90 37 83 29 72 C16 54 18 24 18 24 Z"
        fill="none"
        stroke={isWhite ? 'rgba(26,115,232,0.1)' : 'rgba(255,255,255,0.15)'}
        strokeWidth="1"
      />

      {/* Medical cross */}
      <G>
        <Rect x="40" y="25" width="20" height="36" rx="4" fill={useGradients ? `url(#${uid}_cross)` : crossColor} />
        <Rect x="32" y="35" width="36" height="16" rx="4" fill={useGradients ? `url(#${uid}_cross)` : crossColor} />
      </G>

      {/* Heartbeat pulse line */}
      <Path
        d="M16 74 L32 74 L37 64 L43 84 L50 58 L56 80 L60 68 L64 74 L84 74"
        fill="none"
        stroke={useGradients ? `url(#${uid}_pulse)` : pulseColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tracking dot with pulse ring */}
      <Circle cx="84" cy="74" r="4" fill={isWhite ? '#69F0AE' : '#00C853'} />
      <Circle cx="84" cy="74" r="7" fill="none" stroke={isWhite ? '#69F0AE' : '#00C853'} strokeWidth="1.5" opacity="0.5" />
    </Svg>
  );
}
