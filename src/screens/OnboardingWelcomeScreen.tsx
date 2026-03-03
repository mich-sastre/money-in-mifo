import React, { useRef, useState } from 'react';
import {
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useCountry } from '../context/CountryContext';
import { BenefitCard, CARD_WIDTH } from '../components/BenefitCard';
import { OnboardingNavBar } from '../components/OnboardingNavBar';
import { OnboardingHero } from '../components/OnboardingHero';
import {
  colors,
  spacing,
  navPaddingHorizontal,
} from '../theme';

/** Cuántos px de la siguiente/anterior card se ven (peek) detrás de la activa. */
const CARD_PEEK = 38;
const PAGE_DOT_SIZE_ACTIVE = 8;
const PAGE_DOT_SIZE_INACTIVE = 4;
const SWIPE_THRESHOLD = 50;

/** Pon en true para ver la estructura de la pantalla con bordes rojos. */
const LAYOUT_DEBUG_STROKES = true;
const stroke = LAYOUT_DEBUG_STROKES ? { borderWidth: 1, borderColor: 'red' } : {};

const BENEFITS = [
  { id: '1', title: 'Benefit #1 / feature', description: 'Description', placeholderColor: '#9032EB' },
  { id: '2', title: 'Benefit #2 / feature', description: 'Description', placeholderColor: '#7B2FBF' },
  { id: '3', title: 'Benefit #3 / feature', description: 'Description', placeholderColor: '#6B28A3' },
];

export function OnboardingWelcomeScreen() {
  const { config } = useCountry();
  const { copy } = config;
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const centerX = screenWidth / 2;
  /** Desplazamiento en px de cada card respecto a la activa: anterior a la izquierda, siguiente a la derecha (peek 38). */
  const getCardLeft = (index: number) => {
    const offset = index - activeIndex;
    if (offset === 0) return centerX - CARD_WIDTH / 2;
    if (offset === 1) return centerX + CARD_WIDTH / 2 - CARD_PEEK;
    if (offset === -1) return centerX - CARD_WIDTH / 2 - (CARD_WIDTH - CARD_PEEK);
    return centerX - CARD_WIDTH / 2 + offset * (CARD_WIDTH - CARD_PEEK);
  };
  const getCardZIndex = (index: number) => {
    const offset = Math.abs(index - activeIndex);
    return 10 - offset;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 20,
      onPanResponderRelease: (_, gestureState) => {
        const { dx } = gestureState;
        if (dx < -SWIPE_THRESHOLD) {
          setActiveIndex((i) => Math.min(i + 1, BENEFITS.length - 1));
        } else if (dx > SWIPE_THRESHOLD) {
          setActiveIndex((i) => Math.max(0, i - 1));
        }
      },
    })
  ).current;

  return (
    <View style={[styles.container, stroke]}>
      {/* Contenedor 1: solo back + dropdown */}
      <View style={styles.navContainer}>
        <OnboardingNavBar />
      </View>
      {/* Contenedor 2: solo título + subtítulo */}
      <View style={styles.heroContainer}>
        <OnboardingHero
          title={copy.welcomeTitle}
          subtitle={copy.welcomeDescription}
        />
      </View>

      {/* Carrusel tipo pila: una card encima, las demás detrás; swipe cambia la activa */}
      <View style={[styles.carouselWrap, stroke]} {...panResponder.panHandlers}>
        {BENEFITS.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.stackCard,
              {
                left: getCardLeft(index),
                zIndex: getCardZIndex(index),
                opacity: index === activeIndex ? 1 : 0.92,
                transform: [{ translateY: index === activeIndex ? 0 : 6 }],
              },
            ]}
            pointerEvents={index === activeIndex ? 'auto' : 'none'}
          >
            <BenefitCard
              title={item.title}
              description={item.description}
              placeholderColor={item.placeholderColor}
            />
          </View>
        ))}
      </View>

      {/* Page control dots */}
      <View style={[styles.pageControl, stroke]}>
        {BENEFITS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                width: index === activeIndex ? PAGE_DOT_SIZE_ACTIVE : PAGE_DOT_SIZE_INACTIVE,
                height: index === activeIndex ? PAGE_DOT_SIZE_ACTIVE : PAGE_DOT_SIZE_INACTIVE,
                borderRadius: index === activeIndex ? PAGE_DOT_SIZE_ACTIVE / 2 : PAGE_DOT_SIZE_INACTIVE / 2,
                backgroundColor: index === activeIndex ? '#1f0230' : 'rgba(31,2,48,0.2)',
              },
            ]}
          />
        ))}
      </View>

      {/* CTA */}
      <View style={[styles.footer, stroke]}>
        <View style={[styles.cta, stroke]}>
          <Text style={styles.ctaText}>{copy.connectBankCta}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 56,
  },
  navContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  heroContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingHorizontal: navPaddingHorizontal,
    paddingBottom: spacing.sm,
  },
  carouselWrap: {
    flex: 1,
    position: 'relative',
    minHeight: 400,
  },
  stackCard: {
    position: 'absolute',
    top: 0,
    width: CARD_WIDTH,
  },
  pageControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  dot: {},
  footer: {
    paddingHorizontal: navPaddingHorizontal,
    paddingBottom: spacing.xl + 8,
  },
  cta: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});
