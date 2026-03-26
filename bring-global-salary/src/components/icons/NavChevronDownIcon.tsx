import React from 'react';
import Svg, { Path } from 'react-native-svg';

type NavChevronDownIconProps = {
  size?: number;
  color?: string;
  opacity?: number;
};

/**
 * Ícono chevron abajo (dropdown) – Icon.svg
 */
export function NavChevronDownIcon({
  size = 20,
  color = '#1F0230',
  opacity = 0.62,
}: NavChevronDownIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10.0862 10.9911L6.09209 6.99707L4.91357 8.17558L9.49691 12.7589C9.82234 13.0844 10.35 13.0844 10.6754 12.7589L15.2588 8.17558L14.0802 6.99707L10.0862 10.9911Z"
        fill={color}
        fillOpacity={opacity}
      />
    </Svg>
  );
}
