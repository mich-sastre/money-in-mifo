import React, { useMemo, useRef, useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  Avatar,
  InlineActions,
  NText,
  useNuDSTheme,
  VisibilityOnIcon,
  UserAddIcon,
  MenuIcon,
  MoneyOutIcon,
  MoneyInIcon,
  CreditLetterIcon,
  MoreHorizontalIcon,
  DollarSignIcon,
  CreditCardIcon,
  VirtualCardIcon,
  LimitBar,
} from '@nubank/nuds-vibecode-react-native';
import { useCountry } from '../context/CountryContext';
import type { RootStackParamList } from '../navigation/types';
import { HomeScreenV2 } from './HomeScreenV2';

const DEBUG = { borderWidth: 2, borderColor: 'red' } as const;

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeV3({ navigation, footer }: Props & { footer?: React.ReactNode }) {
  const theme = useNuDSTheme();
  const { activeCountry } = useCountry();
  const isUS = activeCountry === 'us';
  const bottomSheetRef = useRef<BottomSheet>(null);

  const screenHeight = Dimensions.get('window').height;
  const snapPoints = useMemo(() => [screenHeight - 150, screenHeight], [screenHeight]);

  const magicActions = [
    {
      key: 'transferir',
      label: 'Transferir',
      icon: <MoneyOutIcon size={24} color={theme.color.content.default} />,
      onPress: () => {},
    },
    {
      key: 'recibir',
      label: 'Recibir',
      icon: <MoneyInIcon size={24} color={theme.color.content.default} />,
      onPress: () => {},
    },
    {
      key: 'pagar',
      label: 'Pagar',
      icon: <CreditLetterIcon size={24} color={theme.color.content.default} />,
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      {/* ═══ LAYER 1: Header with background image ═══ */}
      <ImageBackground
        source={require('../../assets/home-header-bg.png')}
        style={styles.layer1}
        resizeMode="cover"
        imageStyle={styles.layer1Image}
      >
        <View style={styles.topBar}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../assets/avatar-profile.png')}
              style={styles.avatarImage}
            />
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.nameText} numberOfLines={1}>Gabriela</Text>
          </View>

          <View style={styles.trailingIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <VisibilityOnIcon size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <UserAddIcon size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Menu')}>
              <MenuIcon size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* ═══ LAYER 2: Bottom sheet (draggable, overlaps Layer 1) ═══ */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}
        enableDynamicSizing={false}
        enableContentPanningGesture={true}
        enableHandlePanningGesture={true}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={{ display: 'none' }}
        handleStyle={{ display: 'none' }}
        overDragResistanceFactor={4}
      >
        <BottomSheetScrollView
          style={styles.sheetScroll}
          contentContainerStyle={styles.sheetContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Salary Portability Widget */}
          <View style={styles.widget}>
            <View style={styles.widgetTop}>
              <View style={styles.widgetTitleContainer}>
                <Text style={styles.widgetTitle}>
                  Sé libre de mover tu nómina a Nu y recibe recompensas
                </Text>
              </View>
              <View style={styles.widgetTrailingIcon}>
                <MoneyOutIcon size={20} color="#ffffff" />
              </View>
            </View>
            <View style={styles.widgetButtons}>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => navigation.navigate(isUS ? 'OnboardingUS' : 'OnboardingV3')}
              >
                <Text style={styles.buttonSecondaryLabel}>Traer mi nómina</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonPrimary} onPress={() => {}}>
                <Text style={styles.buttonPrimaryLabel}>Ahora no</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ═══ Magic Inline Actions ═══ */}
          <InlineActions
            actions={magicActions}
            showMore
            moreTitle="Más opciones"
            style={{ paddingVertical: 12 }}
          />

          {/* ═══ Active — Account Balance Card ═══ */}
          <View style={styles.activeCard}>
            <View style={styles.activeCardTop}>
              <View style={{ flex: 1, gap: 4 }}>
                <NText variant="labelXSmallDefault" tone="secondary">
                  Saldo total en Cuenta Nu
                </NText>
                <NText variant="titleMedium">$0.00</NText>
              </View>
              <Avatar
                variant="icon"
                size="medium"
                icon={<DollarSignIcon size={20} color={theme.color.content.accent.primary} />}
              />
            </View>

            {/* Sub-rows */}
            <View style={styles.activeCardRows}>
              <TouchableOpacity style={styles.activeSubRow}>
                <NText variant="labelXSmallDefault" tone="secondary">
                  Disponible
                </NText>
                <NText variant="labelXSmallStrong" style={{ color: theme.color.content.accent.primary }}>
                  Haz tu primer depósito
                </NText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.activeSubRow}>
                <NText variant="labelXSmallDefault" tone="secondary">
                  Cajitas Nu
                </NText>
                <NText variant="labelXSmallStrong" style={{ color: theme.color.content.accent.primary }}>
                  Crea tu primera Cajita
                </NText>
              </TouchableOpacity>
            </View>
          </View>

          {/* ═══ Credit Card Active ═══ */}
          <View style={styles.activeCard}>
            <View style={styles.activeCardTop}>
              <View style={{ flex: 1, gap: 4 }}>
                <NText variant="labelXSmallDefault" tone="secondary">
                  Saldo en tarjeta de crédito
                </NText>
                <NText variant="titleMedium">$0.00</NText>
                <NText variant="labelSmallDefault" tone="secondary" style={{ marginTop: 2 }}>
                  Fecha de corte: 27 Noviembre
                </NText>
              </View>
              <Avatar
                variant="icon"
                size="medium"
                icon={<CreditCardIcon size={20} color={theme.color.content.accent.primary} />}
              />
            </View>

            <LimitBar
              availableAmount={25000}
              totalLimit={25000}
              label="Límite disponible: $25,000.00"
              style={{ paddingHorizontal: 20, paddingBottom: 16, paddingTop: 4 }}
            />
          </View>

          {/* ═══ Missions — Tus tarjetas ═══ */}
          <View style={styles.activeCard}>
            <View style={styles.activeCardTop}>
              <View style={{ flex: 1, gap: 4 }}>
                <NText variant="labelXSmallDefault" tone="secondary">
                  Tus tarjetas
                </NText>
                <NText variant="labelSmallStrong" style={{ color: theme.color.content.accent.primary }}>
                  Crea una tarjeta virtual
                </NText>
              </View>
              <Avatar
                variant="icon"
                size="medium"
                icon={<VirtualCardIcon size={20} color={theme.color.content.accent.primary} />}
              />
            </View>
          </View>

          {footer}
          <View style={{ height: 40 }} />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

function VersionToggle({
  version,
  onSwitch,
}: {
  version: 'V2' | 'V3';
  onSwitch: (v: 'V2' | 'V3') => void;
}) {
  return (
    <View style={styles.versionToggle}>
      <TouchableOpacity
        style={[styles.toggleButton, version === 'V2' && styles.toggleButtonActive]}
        onPress={() => onSwitch('V2')}
      >
        <Text style={[styles.toggleLabel, version === 'V2' && styles.toggleLabelActive]}>V2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleButton, version === 'V3' && styles.toggleButtonActive]}
        onPress={() => onSwitch('V3')}
      >
        <Text style={[styles.toggleLabel, version === 'V3' && styles.toggleLabelActive]}>V3</Text>
      </TouchableOpacity>
    </View>
  );
}

export function HomeScreen(props: Props) {
  const [version, setVersion] = useState<'V2' | 'V3'>('V2');

  const toggle = <VersionToggle version={version} onSwitch={setVersion} />;

  return version === 'V2' ? (
    <HomeScreenV2 navigation={props.navigation} route={props.route} footer={toggle} />
  ) : (
    <HomeV3 {...props} footer={toggle} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#820ad1',
  },

  /* ═══ LAYER 1: Header container with background image (375×156) ═══ */
  layer1: {
    width: '100%',
    height: 156,
    justifyContent: 'flex-end',
  },
  layer1Image: {
    opacity: 0.7,
  },

  /* ═══ Top Bar: 76px tall, 16px padding, items centered ═══ */
  topBar: {
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },

  /* Avatar: 40px circle with profile image */
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  /* Name */
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontFamily: 'NuSansDisplay-Medium',
    fontSize: 20,
    lineHeight: 24,
    color: '#ffffff',
  },

  /* Trailing icons */
  trailingIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ═══ LAYER 2: Bottom sheet ═══ */
  sheetBackground: {
    backgroundColor: '#edebee',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  sheetScroll: {
    flex: 1,
  },
  sheetContent: {
    padding: 16,
    gap: 12,
  },

  /* ═══ Salary Portability Widget ═══ */
  widget: {
    backgroundColor: '#820ad1',
    borderRadius: 24,
    overflow: 'hidden',
  },
  widgetTop: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  widgetTitleContainer: {
    flex: 1,
  },
  widgetTitle: {
    fontFamily: 'NuSansText-Semibold',
    fontSize: 18,
    lineHeight: 18 * 1.3,
    color: '#ffffff',
  },
  widgetTrailingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  widgetButtons: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: '#ffffff',
    borderRadius: 64,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondaryLabel: {
    fontFamily: 'NuSansText-Semibold',
    fontSize: 12,
    lineHeight: 12 * 1.3,
    letterSpacing: 12 * 0.01,
    color: '#000000',
    textAlign: 'center',
  },
  buttonPrimary: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 64,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimaryLabel: {
    fontFamily: 'NuSansText-Semibold',
    fontSize: 12,
    lineHeight: 12 * 1.3,
    letterSpacing: 12 * 0.01,
    color: '#ffffff',
    textAlign: 'center',
  },

  /* ═══ Active Card (Account Balance) ═══ */
  activeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(31,2,48,0.08)',
    overflow: 'hidden',
    shadowColor: '#1f002f',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 0,
    elevation: 1,
  },
  activeCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 20,
  },
  activeCardRows: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  activeSubRow: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    borderRadius: 16,
    padding: 12,
    gap: 2,
    height: 56,
    justifyContent: 'center',
  },

  /* ═══ Version Toggle ═══ */
  versionToggle: {
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
    padding: 4,
    gap: 4,
    marginTop: 24,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  toggleButtonActive: {
    backgroundColor: '#820ad1',
  },
  toggleLabel: {
    fontFamily: 'Graphik-Medium',
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
  },
  toggleLabelActive: {
    color: '#ffffff',
  },
});
