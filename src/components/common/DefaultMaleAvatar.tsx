import React, { useRef } from 'react';
import { Platform } from 'react-native';
import Svg, {
  Circle, Ellipse, Path, Defs, LinearGradient, RadialGradient,
  Stop, ClipPath, Rect, G,
} from 'react-native-svg';

interface DefaultMaleAvatarProps {
  size?: number;
}

let idCounter = 0;

export default function DefaultMaleAvatar({ size = 48 }: DefaultMaleAvatarProps) {
  const idRef = useRef(`mav_${++idCounter}`);
  const u = idRef.current;
  const grad = Platform.OS !== 'android';

  // Gradient refs or solid fallbacks
  const bg = grad ? `url(#${u}_bg)` : '#D6E8F5';
  const skin = grad ? `url(#${u}_skin)` : '#E8B88A';
  const skinShadow = grad ? `url(#${u}_skinSh)` : '#D4976B';
  const hair = grad ? `url(#${u}_hair)` : '#2C1B0E';
  const hairHL = grad ? `url(#${u}_hairHL)` : '#4A3222';
  const shirt = grad ? `url(#${u}_shirt)` : '#2563EB';
  const shirtDk = grad ? `url(#${u}_shirtDk)` : '#1D4ED8';
  const lip = grad ? `url(#${u}_lip)` : '#C97E6B';
  const iris = grad ? `url(#${u}_iris)` : '#5B3A1A';

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        {grad && (
          <>
            <RadialGradient id={`${u}_bg`} cx="50%" cy="40%" r="60%">
              <Stop offset="0%" stopColor="#E8F4FD" />
              <Stop offset="100%" stopColor="#B8D4E8" />
            </RadialGradient>
            <LinearGradient id={`${u}_skin`} x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#F5CBA7" />
              <Stop offset="50%" stopColor="#E8B88A" />
              <Stop offset="100%" stopColor="#D4A574" />
            </LinearGradient>
            <LinearGradient id={`${u}_skinSh`} x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#D4976B" />
              <Stop offset="100%" stopColor="#C68A5E" />
            </LinearGradient>
            <LinearGradient id={`${u}_hair`} x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#3B2314" />
              <Stop offset="100%" stopColor="#1A0E07" />
            </LinearGradient>
            <LinearGradient id={`${u}_hairHL`} x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#5C3D24" />
              <Stop offset="100%" stopColor="#3B2314" />
            </LinearGradient>
            <LinearGradient id={`${u}_shirt`} x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#3B82F6" />
              <Stop offset="100%" stopColor="#1D4ED8" />
            </LinearGradient>
            <LinearGradient id={`${u}_shirtDk`} x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#1D4ED8" />
              <Stop offset="100%" stopColor="#1E3A8A" />
            </LinearGradient>
            <LinearGradient id={`${u}_lip`} x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#D4876C" />
              <Stop offset="100%" stopColor="#B8705A" />
            </LinearGradient>
            <RadialGradient id={`${u}_iris`} cx="45%" cy="40%" r="50%">
              <Stop offset="0%" stopColor="#7B5230" />
              <Stop offset="100%" stopColor="#3D2210" />
            </RadialGradient>
          </>
        )}
        <ClipPath id={`${u}_c`}>
          <Circle cx="100" cy="100" r="97" />
        </ClipPath>
      </Defs>

      {/* Background */}
      <Circle cx="100" cy="100" r="97" fill={bg} />

      <G clipPath={`url(#${u}_c)`}>

        {/* ===== BODY / SHIRT ===== */}
        {/* Shoulders & torso */}
        <Path
          d="M22 200 C22 168 42 152 65 145 L75 142 Q100 136 125 142 L135 145 C158 152 178 168 178 200 Z"
          fill={shirt}
        />
        {/* Shirt shadow left */}
        <Path
          d="M22 200 C22 168 42 152 65 145 L75 142 Q88 138 100 138 L100 200 Z"
          fill={shirtDk}
          opacity="0.3"
        />
        {/* Collar left */}
        <Path
          d="M78 140 L92 156 L100 142"
          fill="#FFFFFF"
          opacity="0.9"
        />
        {/* Collar right */}
        <Path
          d="M122 140 L108 156 L100 142"
          fill="#FFFFFF"
          opacity="0.85"
        />
        {/* Collar shadow */}
        <Path
          d="M92 156 L100 142 L108 156"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="0.8"
        />
        {/* Top button */}
        <Circle cx="100" cy="155" r="2" fill="#94A3B8" />

        {/* ===== NECK ===== */}
        <Path
          d="M84 118 C84 118 85 140 100 142 C115 140 116 118 116 118"
          fill={skin}
        />
        {/* Neck shadow */}
        <Path
          d="M84 126 C84 126 88 142 100 142 C112 142 116 126 116 126"
          fill={skinShadow}
          opacity="0.35"
        />

        {/* ===== HEAD — oval face ===== */}
        <Ellipse cx="100" cy="80" rx="38" ry="44" fill={skin} />

        {/* Face contour shadow (left side for 3D depth) */}
        <Path
          d="M62 80 C62 50 75 36 100 36 C100 36 68 42 65 80 C63 105 80 122 100 124 C80 122 62 110 62 80 Z"
          fill={skinShadow}
          opacity="0.15"
        />

        {/* Jawline definition */}
        <Path
          d="M68 100 Q78 120 100 124 Q122 120 132 100"
          fill="none"
          stroke="#D4976B"
          strokeWidth="0.6"
          opacity="0.3"
        />

        {/* ===== EARS ===== */}
        {/* Left ear */}
        <Ellipse cx="62" cy="82" rx="6" ry="10" fill={skin} />
        <Ellipse cx="62" cy="82" rx="3.5" ry="7" fill={skinShadow} opacity="0.25" />
        {/* Right ear */}
        <Ellipse cx="138" cy="82" rx="6" ry="10" fill={skin} />
        <Ellipse cx="138" cy="82" rx="3.5" ry="7" fill={skinShadow} opacity="0.2" />

        {/* ===== EYEBROWS ===== */}
        {/* Left eyebrow */}
        <Path
          d="M78 66 Q83 61 92 63"
          fill="none"
          stroke="#2C1B0E"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Right eyebrow */}
        <Path
          d="M108 63 Q117 61 122 66"
          fill="none"
          stroke="#2C1B0E"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* ===== EYES ===== */}
        {/* Left eye — sclera */}
        <Ellipse cx="86" cy="76" rx="8" ry="5.5" fill="#FFFFFF" />
        {/* Left eye — iris */}
        <Circle cx="87" cy="76" r="4.5" fill={iris} />
        {/* Left eye — pupil */}
        <Circle cx="87" cy="76" r="2.2" fill="#0D0805" />
        {/* Left eye — light reflection */}
        <Circle cx="89" cy="74.5" r="1.5" fill="#FFFFFF" opacity="0.85" />
        <Circle cx="85.5" cy="77.5" r="0.7" fill="#FFFFFF" opacity="0.4" />
        {/* Left eye — upper eyelid line */}
        <Path
          d="M78 74 Q83 69 94 74"
          fill="none"
          stroke="#3B2314"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Left eye — lower eyelid */}
        <Path
          d="M79 78 Q86 82 93 78"
          fill="none"
          stroke="#C8A882"
          strokeWidth="0.6"
          opacity="0.5"
        />
        {/* Left eyelashes */}
        <Path
          d="M78 74 Q77 72 76 71"
          fill="none"
          stroke="#2C1B0E"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* Right eye — sclera */}
        <Ellipse cx="114" cy="76" rx="8" ry="5.5" fill="#FFFFFF" />
        {/* Right eye — iris */}
        <Circle cx="113" cy="76" r="4.5" fill={iris} />
        {/* Right eye — pupil */}
        <Circle cx="113" cy="76" r="2.2" fill="#0D0805" />
        {/* Right eye — light reflection */}
        <Circle cx="115" cy="74.5" r="1.5" fill="#FFFFFF" opacity="0.85" />
        <Circle cx="111.5" cy="77.5" r="0.7" fill="#FFFFFF" opacity="0.4" />
        {/* Right eye — upper eyelid line */}
        <Path
          d="M106 74 Q111 69 122 74"
          fill="none"
          stroke="#3B2314"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Right eye — lower eyelid */}
        <Path
          d="M107 78 Q114 82 121 78"
          fill="none"
          stroke="#C8A882"
          strokeWidth="0.6"
          opacity="0.5"
        />
        {/* Right eyelashes */}
        <Path
          d="M122 74 Q123 72 124 71"
          fill="none"
          stroke="#2C1B0E"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* ===== NOSE ===== */}
        {/* Nose bridge shadow */}
        <Path
          d="M98 70 L96 90"
          fill="none"
          stroke="#D4976B"
          strokeWidth="0.7"
          opacity="0.3"
        />
        {/* Nose tip */}
        <Path
          d="M93 92 Q96 96 100 96 Q104 96 107 92"
          fill="none"
          stroke="#C8946A"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {/* Left nostril hint */}
        <Path
          d="M93 93 Q91 94 92 92"
          fill="#C8946A"
          opacity="0.4"
        />
        {/* Right nostril hint */}
        <Path
          d="M107 93 Q109 94 108 92"
          fill="#C8946A"
          opacity="0.4"
        />

        {/* ===== MOUTH ===== */}
        {/* Upper lip */}
        <Path
          d="M89 106 Q94 103 100 104 Q106 103 111 106"
          fill={lip}
        />
        {/* Upper lip cupid's bow */}
        <Path
          d="M89 106 Q94 103 100 104.5 Q106 103 111 106"
          fill="none"
          stroke="#B8705A"
          strokeWidth="0.5"
        />
        {/* Lower lip */}
        <Path
          d="M89 106 Q94 108 100 112 Q106 108 111 106"
          fill={lip}
        />
        {/* Lower lip highlight */}
        <Path
          d="M94 108 Q100 111 106 108"
          fill="#E8A08A"
          opacity="0.35"
        />
        {/* Lip line */}
        <Path
          d="M89 106 Q100 108 111 106"
          fill="none"
          stroke="#A85E48"
          strokeWidth="0.8"
        />
        {/* Chin dimple hint */}
        <Path
          d="M97 118 Q100 120 103 118"
          fill="none"
          stroke="#D4976B"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* ===== FACIAL STUBBLE (subtle) ===== */}
        <Path
          d="M72 100 Q78 114 90 120"
          fill="none" stroke="#8B7355" strokeWidth="0.3" opacity="0.15"
        />
        <Path
          d="M128 100 Q122 114 110 120"
          fill="none" stroke="#8B7355" strokeWidth="0.3" opacity="0.15"
        />

        {/* ===== HAIR ===== */}
        {/* Main hair mass */}
        <Path
          d="M62 72 C60 42 72 28 100 28 C128 28 140 42 138 72 C138 62 135 46 125 38 C118 33 110 30 100 30 C90 30 82 33 75 38 C65 46 62 62 62 72 Z"
          fill={hair}
        />
        {/* Hair highlight / volume on top */}
        <Path
          d="M72 55 C72 38 82 30 100 30 C112 30 122 34 128 42 C132 48 132 55 132 58 C130 46 120 34 100 34 C82 34 74 44 72 55 Z"
          fill={hairHL}
          opacity="0.6"
        />
        {/* Side part line */}
        <Path
          d="M82 32 Q85 40 84 52"
          fill="none"
          stroke="#1A0E07"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Left sideburn */}
        <Path
          d="M64 68 C62 74 62 82 63 88"
          fill="none"
          stroke={hair}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Right sideburn */}
        <Path
          d="M136 68 C138 74 138 82 137 88"
          fill="none"
          stroke={hair}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Hair texture strands */}
        <Path d="M78 36 Q82 32 88 34" fill="none" stroke="#4A3222" strokeWidth="0.6" opacity="0.3" />
        <Path d="M100 28 Q105 30 108 34" fill="none" stroke="#4A3222" strokeWidth="0.6" opacity="0.3" />
        <Path d="M115 32 Q120 34 124 40" fill="none" stroke="#4A3222" strokeWidth="0.6" opacity="0.3" />

        {/* Forehead shadow under hair */}
        <Path
          d="M66 68 Q80 60 100 58 Q120 60 134 68"
          fill="none"
          stroke="#C8946A"
          strokeWidth="1"
          opacity="0.15"
        />

      </G>

      {/* Outer ring */}
      <Circle cx="100" cy="100" r="96" fill="none" stroke="#93C5FD" strokeWidth="2.5" />
      <Circle cx="100" cy="100" r="98" fill="none" stroke="#DBEAFE" strokeWidth="1" />
    </Svg>
  );
}
