import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Avatar,
  Box,
  NText,
  Divider,
  InlineActions,
  SectionTitle,
  useNuDSTheme,
  UserIcon,
  VisibilityOnIcon,
  HelpIcon,
  UsersKidAdultIcon,
  MoreVerticalIcon,
  MoneyInIcon,
  MoneyOutIcon,
  LendingIcon,
  DollarSignIcon,
  CardStackIcon,
  ChevronIcon,
  ArrowUpRightIcon,
} from '@nubank/nuds-vibecode-react-native';
import { useCountry } from '../context/CountryContext';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'> & {
  footer?: React.ReactNode;
};

export function HomeScreenV2({ navigation, footer }: Props) {
  const theme = useNuDSTheme();
  const { activeCountry } = useCountry();
  const isUS = activeCountry === 'us';

  const inlineActions = [
    {
      key: 'depositar',
      label: 'Depositar',
      icon: <MoneyInIcon size={24} color={theme.color.content.default} />,
      onPress: () => navigation.navigate('Deposit'),
    },
    {
      key: 'transferir',
      label: 'Transferir',
      icon: <MoneyOutIcon size={24} color={theme.color.content.default} />,
      onPress: () => {},
    },
    {
      key: 'simular',
      label: 'Simular\npréstamo',
      icon: <LendingIcon size={24} color={theme.color.content.default} />,
      onPress: () => {},
    },
    {
      key: 'disponer',
      label: 'Disponer de\nsaldo',
      icon: <DollarSignIcon size={24} color={theme.color.content.default} />,
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: theme.color.surface.accent.primary }]}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Avatar
            variant="icon"
            size="medium"
            icon={<UserIcon size={20} color={theme.color.content.onColor} />}
            backgroundColor="rgba(255,255,255,0.2)"
          />

          <View style={styles.topBarActions}>
            <TouchableOpacity style={styles.headerIconBtn}>
              <VisibilityOnIcon size={24} color={theme.color.content.onColor} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn}>
              <HelpIcon size={24} color={theme.color.content.onColor} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn}>
              <UsersKidAdultIcon size={24} color={theme.color.content.onColor} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Greeting */}
        <View style={styles.greeting}>
          <NText variant="subtitleMediumStrong" style={{ color: '#ffffff' }}>
            Hola, Paulina
          </NText>
        </View>

        {/* Salary portability banner — entry point */}
        <View style={styles.bannerContainer}>
          <TouchableOpacity
            style={styles.banner}
            activeOpacity={0.85}
            onPress={() => navigation.navigate(isUS ? 'OnboardingUS' : 'Onboarding')}
          >
            <Image
              source={require('../../assets/payments-explained.png')}
              style={styles.bannerIllustration}
              resizeMode="contain"
            />
            <NText
              variant="labelXSmallStrong"
              style={styles.bannerText}
            >
              Trae tu nómina a Nubank y empieza a recibir los beneficios que mereces.
            </NText>
            <TouchableOpacity hitSlop={8}>
              <MoreVerticalIcon size={16} color={theme.color.content.subtle} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Cuenta Nu Section ── */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.sectionHeader}>
            <NText variant="titleXSmall">Cuenta Nu</NText>
            <ChevronIcon size={24} color={theme.color.content.default} />
          </TouchableOpacity>

          <View style={styles.balanceBlock}>
            <NText variant="labelSmallStrong" tone="secondary">
              Saldo disponible
            </NText>
            <NText variant="titleSmall" style={{ marginTop: 8 }}>
              $ 19,000.00
            </NText>
          </View>

          <InlineActions actions={inlineActions} />
        </View>

        <Divider />

        {/* ── Tarjeta de crédito Section ── */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.sectionHeader}>
            <NText variant="titleXSmall">Tarjeta de crédito</NText>
            <ChevronIcon size={24} color={theme.color.content.default} />
          </TouchableOpacity>

          <View style={styles.balanceBlock}>
            <NText variant="labelSmallStrong" tone="secondary">
              Saldo actual
            </NText>
            <NText variant="titleSmall" style={{ marginTop: 8 }}>
              $1,094.80
            </NText>
            <View style={{ marginTop: 4 }}>
              <NText variant="paragraphSmallDefault" tone="secondary">
                {'Fecha de corte: '}
                <NText variant="paragraphSmallStrong">05 JUN</NText>
              </NText>
              <NText variant="paragraphSmallDefault" tone="secondary">
                {'Límite disponible: '}
                <NText variant="paragraphSmallStrong">$2,000.00</NText>
              </NText>
            </View>
          </View>

          {/* CTA button */}
          <View style={styles.ctaRow}>
            <TouchableOpacity
              style={[styles.ctaButton, { backgroundColor: theme.color.surface.accent.primary }]}
            >
              <NText variant="labelSmallStrong" style={{ color: '#ffffff' }}>
                ¿Cómo pagar?
              </NText>
            </TouchableOpacity>
          </View>

          {/* Pill widget — Mis tarjetas */}
          <View style={styles.pillContainer}>
            <TouchableOpacity
              style={[styles.pillWidget, { backgroundColor: theme.color.surface.subtle }]}
            >
              <CardStackIcon size={24} color={theme.color.content.default} />
              <NText variant="labelSmallStrong" style={{ flex: 1 }}>
                Mis tarjetas
              </NText>
            </TouchableOpacity>
          </View>
        </View>

        <Divider />

        {/* ── Discover Carousel Section ── */}
        <SectionTitle title="Descubre más" compact />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
        >
          {/* Card 1 — Bike */}
          <View style={[styles.carouselCard, { backgroundColor: theme.color.surface.subtle }]}>
            <View style={styles.carouselCardTop}>
              <Image
                source={require('../../assets/carousel-card-1.png')}
                style={styles.carouselImage}
                resizeMode="cover"
              />
              <View style={[styles.carouselBadge, { backgroundColor: theme.color.content.default }]}>
                <NText variant="labelXSmallStrong" style={{ color: '#ffffff' }}>
                  Nueva
                </NText>
              </View>
            </View>
            <View style={styles.carouselCardBottom}>
              <View style={{ flex: 1, gap: 8 }}>
                <NText variant="paragraphSmallStrong">{' '}</NText>
                <NText variant="paragraphSmallDefault" tone="secondary" style={{ flex: 1 }}>
                  ¡No vuelvas a esperar por una transferencia!
                </NText>
              </View>
              <TouchableOpacity style={styles.carouselLink}>
                <ArrowUpRightIcon size={16} color={theme.color.content.default} />
                <NText variant="paragraphSmallDefault">Descubre cómo</NText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card 2 — Brunch */}
          <View style={[styles.carouselCard, { backgroundColor: theme.color.surface.subtle }]}>
            <View style={styles.carouselCardTop}>
              <Image
                source={require('../../assets/carousel-card-2.png')}
                style={styles.carouselImage}
                resizeMode="cover"
              />
              <View style={[styles.carouselBadge, { backgroundColor: theme.color.surface.accent.primary }]}>
                <NText variant="labelXSmallStrong" style={{ color: '#ffffff' }}>
                  Badge
                </NText>
              </View>
            </View>
            <View style={styles.carouselCardBottom}>
              <View style={{ flex: 1, gap: 8 }}>
                <NText variant="paragraphSmallStrong">Disfruta de muchos</NText>
                <NText variant="paragraphSmallDefault" tone="secondary" style={{ flex: 1 }}>
                  Con Nu tienes mas que una tarjeta de crédito
                </NText>
              </View>
              <TouchableOpacity style={styles.carouselLink}>
                <ArrowUpRightIcon size={16} color={theme.color.content.default} />
                <NText variant="paragraphSmallDefault">Conoce más</NText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card 3 — Couple */}
          <View style={[styles.carouselCard, { backgroundColor: theme.color.surface.subtle }]}>
            <View style={styles.carouselCardTop}>
              <Image
                source={require('../../assets/carousel-card-3.png')}
                style={styles.carouselImage}
                resizeMode="cover"
              />
              <View style={[styles.carouselBadge, { backgroundColor: theme.color.surface.accent.primary }]}>
                <NText variant="labelXSmallStrong" style={{ color: '#ffffff' }}>
                  Nuevo
                </NText>
              </View>
            </View>
            <View style={styles.carouselCardBottom}>
              <View style={{ flex: 1, gap: 8 }}>
                <NText variant="paragraphSmallStrong">Comparte momentos</NText>
                <NText variant="paragraphSmallDefault" tone="secondary" style={{ flex: 1 }}>
                  Invita a quien quieras y disfruten juntos
                </NText>
              </View>
              <TouchableOpacity style={styles.carouselLink}>
                <ArrowUpRightIcon size={16} color={theme.color.content.default} />
                <NText variant="paragraphSmallDefault">Conoce más</NText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {footer}

        {/* Bottom padding for scroll */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  /* ── Header ── */
  header: {
    paddingTop: 54,
    paddingBottom: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  topBarActions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 0,
  },
  headerIconBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },

  /* ── Salary banner ── */
  bannerContainer: {
    paddingHorizontal: 24,
  },
  banner: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bannerIllustration: {
    width: 40,
    height: 40,
  },
  bannerText: {
    flex: 1,
    color: '#820ad1',
  },

  /* ── Scroll ── */
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  /* ── Sections ── */
  section: {
    paddingBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  balanceBlock: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },

  /* ── CTA ── */
  ctaRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  ctaButton: {
    height: 40,
    borderRadius: 100,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ── Pill widget ── */
  pillContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  pillWidget: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 12,
  },

  /* ── Carousel ── */
  carouselContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 16,
  },
  carouselCard: {
    width: 240,
    borderRadius: 8,
    overflow: 'hidden',
  },
  carouselCardTop: {
    height: 120,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 16,
    overflow: 'hidden',
  },
  carouselImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  carouselBadge: {
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    minHeight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselCardBottom: {
    height: 156,
    padding: 16,
    gap: 16,
  },
  carouselLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
