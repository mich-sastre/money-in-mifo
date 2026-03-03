import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

export const CARD_WIDTH = 270;
export const CARD_HEIGHT = 372;
const CARD_RADIUS = 24;
/** Altura de la franja inferior (título + descripción). Padding 16 horizontal, 32 abajo. */
const CARD_STRIP_HEIGHT = 100;

export type BenefitCardProps = {
  title: string;
  description: string;
  /** URI opcional; si no hay, se muestra un placeholder con gradiente. */
  imageUri?: string | null;
  /** Color de acento para el placeholder cuando no hay imagen (por slide). */
  placeholderColor?: string;
};

export function BenefitCard({
  title,
  description,
  imageUri,
  placeholderColor = '#9032EB',
}: BenefitCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.illustrationWrap}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.placeholder, { backgroundColor: placeholderColor }]} />
        )}
        <View style={styles.gradientOverlay} />
      </View>
      <View style={styles.strip}>
        <Text style={styles.stripTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.stripDescription} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    backgroundColor: '#dedeff',
  },
  illustrationWrap: {
    height: CARD_HEIGHT - CARD_STRIP_HEIGHT,
    position: 'relative',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    backgroundColor: 'rgba(75,21,127,0.75)',
  },
  strip: {
    height: CARD_STRIP_HEIGHT,
    backgroundColor: '#4b157f',
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: spacing.sm,
    justifyContent: 'flex-end',
    gap: 4,
  },
  stripTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: -0.16,
  },
  stripDescription: {
    fontSize: 14,
    color: '#ffffff',
    letterSpacing: -0.14,
    lineHeight: 21,
  },
});
