import React from 'react';
import Svg, { Path } from 'react-native-svg';

type NavBackIconProps = {
  size?: number;
  color?: string;
  opacity?: number;
};

/**
 * Ícono de atrás (chevron izquierda) – [Magic] Icon.svg
 */
export function NavBackIcon({
  size = 20,
  color = '#1F0230',
  opacity = 0.62,
}: NavBackIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M5.24408 9.41081L11.9107 2.74414L13.0893 3.92265L7.01184 10.0001L13.0893 16.0775L11.9107 17.256L5.24408 10.5893C4.91864 10.2639 4.91864 9.73624 5.24408 9.41081Z"
        fill={color}
        fillOpacity={opacity}
      />
    </Svg>
  );
}
