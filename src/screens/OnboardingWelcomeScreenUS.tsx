import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import {
  Header,
  BottomBar,
} from '@nubank/nuds-vibecode-react-native';
import {
  BenefitCard,
  CARD_HEIGHT,
} from '../components/BenefitCard';
import { OnboardingNavBar } from '../components/OnboardingNavBar';
import { spacing } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingUS'>;

const PAGE_DOT_SIZE_ACTIVE = 8;
const PAGE_DOT_SIZE_INACTIVE = 4;
const SCREEN_WIDTH = Dimensions.get('window').width;

const BENEFITS = [
  {
    title: 'Disfruta a tus artistas favoritos',
    description: 'Accede a boletos exclusivos para conciertos',
    color: '#9032EB',
    imageSource: require('../../assets/benefit-card-1.png'),
  },
  {
    title: 'Dinero de regreso en todo',
    description: 'Gana cashback en cada compra con débito',
    color: '#7B2FBF',
    imageSource: require('../../assets/benefit-card-2.png'),
  },
  {
    title: 'Viaja a donde quieras',
    description: 'Paga boletos de avión y viajes con Nu Plus',
    color: '#6B28A3',
    imageSource: require('../../assets/benefit-card-3.png'),
  },
];

type BenefitItem = typeof BENEFITS[number];

function CardSlide({ item, animationValue }: { item: BenefitItem; animationValue: SharedValue<number> }) {
  const containerStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      Math.abs(animationValue.value),
      [0, 0.3, 1],
      [24, 16, 16],
    );
    return { borderRadius, overflow: 'hidden' as const };
  });

  const blurStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      Math.abs(animationValue.value),
      [0, 0.3, 1],
      [0, 1, 1],
    );
    return { opacity };
  });

  return (
    <View style={styles.cardItem}>
      <Animated.View style={containerStyle}>
        <BenefitCard
          title={item.title}
          description={item.description}
          placeholderColor={item.color}
          imageSource={item.imageSource}
          compactLevel={0}
        />
        <Animated.View style={[StyleSheet.absoluteFill, blurStyle]}>
          <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFill} />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export function OnboardingWelcomeScreenUS({ navigation }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      {/* Nav bar with country selector */}
      <View style={styles.navContainer}>
        <OnboardingNavBar onBack={() => navigation.goBack()} />
      </View>

      {/* V3 Header — title, subtitle, centered (no top bar — nav bar above handles it) */}
      <Header
        type="standard"
        centered
        title="Ellos eligieron el día de pago. Tú eliges el banco"
        subtitle="Mueve tu nómina a Nu y recibe recompensas."
        showSubtitle
        showTopBar={false}
        showAction={false}
        style={styles.header}
      />

      {/* Carousel — reused from Mexico version */}
      <View style={styles.carouselWrap}>
        <Carousel
          width={SCREEN_WIDTH}
          height={CARD_HEIGHT}
          data={BENEFITS}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 350,
            parallaxAdjacentItemScale: 0.85,
          }}
          scrollAnimationDuration={400}
          // @ts-expect-error inverted works at runtime in v4
          inverted
          onSnapToItem={setActiveIndex}
          renderItem={({ item, animationValue }) => (
            <CardSlide item={item} animationValue={animationValue} />
          )}
        />
      </View>

      {/* Page control dots */}
      <View style={styles.pageControl}>
        {BENEFITS.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                width: i === activeIndex ? PAGE_DOT_SIZE_ACTIVE : PAGE_DOT_SIZE_INACTIVE,
                height: i === activeIndex ? PAGE_DOT_SIZE_ACTIVE : PAGE_DOT_SIZE_INACTIVE,
                borderRadius: i === activeIndex ? PAGE_DOT_SIZE_ACTIVE / 2 : PAGE_DOT_SIZE_INACTIVE / 2,
                backgroundColor: i === activeIndex ? '#1f0230' : 'rgba(31,2,48,0.2)',
              },
            ]}
          />
        ))}
      </View>

      {/* V3 BottomBar — primary CTA */}
      <BottomBar
        primaryLabel="Traer mi nómina"
        onPrimaryPress={() => navigation.navigate('FlowInputUS')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 56,
  },
  navContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  header: {
    alignSelf: 'stretch',
  },
  carouselWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  dot: {},
});
