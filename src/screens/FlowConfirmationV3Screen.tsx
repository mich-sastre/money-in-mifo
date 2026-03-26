import React, { useState } from 'react';
import { Image, Platform, Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  TopBar,
  NText,
  Button,
  ArrowDownIcon,
  ExpandLessIcon,
  ExpandMoreIcon,
  HeadsetIcon,
  useNuDSTheme,
} from '@nubank/nuds-vibecode-react-native';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FlowConfirmationV3'>;

const avatarAndrea = require('../../assets/avatar-andrea.png');
const avatarBbva = require('../../assets/avatar-bbva.png');
const avatarNu = require('../../assets/avatar-nu.png');
const headerArtwork = require('../../assets/review-header-artwork.png');

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 47 : StatusBar.currentHeight ?? 0;
const ARTWORK_HEIGHT = 132;
const AVATAR_SIZE = 92;
const SPACER_HEIGHT = STATUS_BAR_HEIGHT + ARTWORK_HEIGHT - (AVATAR_SIZE + 6) / 2;


export function FlowConfirmationV3Screen({ navigation, route }: Props) {
  const theme = useNuDSTheme();
  const inputValue = route.params?.inputValue ?? '';
  const [detailsExpanded, setDetailsExpanded] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <Box surface="screen" style={styles.container}>
      {/* Background artwork — absolutely positioned */}
      <Image
        source={headerArtwork}
        style={styles.artworkBackground}
        resizeMode="cover"
      />

      {/* White background filling everything below artwork */}
      <View style={styles.whiteBackground} />

      {/* TopBar floating over artwork */}
      <View style={styles.topBarOverlay}>
        <TopBar
          title=""
          show1stAction={true}
          show2ndAction={false}
          trailing={<HeadsetIcon size={24} color="#fff" />}
          onBackPress={() => navigation.goBack()}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>

      {/* All content in one scrollable stream */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Transparent spacer — lets the artwork show through */}
        <View style={{ height: SPACER_HEIGHT }} />

        {/* Avatar zone: top half transparent, bottom half white */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarBottomHalf} />
          <View style={styles.avatarRing}>
            <Image source={avatarAndrea} style={styles.profileAvatar} />
          </View>
        </View>

        {/* Content area */}
        <View style={styles.contentArea}>
          {/* Profile name */}
          <View style={styles.profileText}>
            <NText variant="labelSmallStrong" style={{ textAlign: 'center' }}>
              Andrea Jiménez
            </NText>
            <NText variant="paragraphSmallDefault" tone="secondary" style={{ textAlign: 'center' }}>
              Cuenta de nómina
            </NText>
          </View>

          {/* Banks transfer card */}
          <View style={styles.bankCardWrapper}>
            <View style={[styles.bankCard, { borderColor: theme.color.border.default }]}>
              <View style={styles.bankRow}>
                <Image source={avatarBbva} style={styles.bankAvatar} />
                <View style={styles.bankInfo}>
                  <NText variant="labelSmallStrong">BBVA</NText>
                  <NText variant="paragraphSmallDefault" tone="secondary">
                    {inputValue || '182 945 62 349092876 7'}
                  </NText>
                </View>
              </View>

              <View style={styles.arrowDivider}>
                <View style={[styles.dividerLine, { backgroundColor: theme.color.border.default }]} />
                <ArrowDownIcon size={24} color={theme.color.content.subtle} />
                <View style={[styles.dividerLine, { backgroundColor: theme.color.border.default }]} />
              </View>

              <View style={styles.bankRow}>
                <Image source={avatarNu} style={styles.bankAvatar} />
                <View style={styles.bankInfo}>
                  <NText variant="labelSmallStrong">Nu</NText>
                  <NText variant="paragraphSmallDefault" tone="secondary">
                    282 945 62 349032879 8
                  </NText>
                </View>
              </View>
            </View>
          </View>

          {/* Details section */}
          <Pressable
            style={styles.detailsHeader}
            onPress={() => setDetailsExpanded(!detailsExpanded)}
          >
            <NText variant="labelSmallStrong" style={{ flex: 1 }}>
              Detalles de portabilidad
            </NText>
            {detailsExpanded
              ? <ExpandLessIcon size={20} color={theme.color.content.subtle} />
              : <ExpandMoreIcon size={20} color={theme.color.content.subtle} />
            }
          </Pressable>

          {detailsExpanded && (
            <View style={styles.detailsList}>
              <View style={styles.detailRow}>
                <NText variant="labelSmallStrong">Fecha de nacimiento</NText>
                <NText variant="paragraphSmallDefault" tone="secondary">25 Junio 2004</NText>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Terms checkbox — sticky above button */}
      <Pressable
        style={[styles.termsRow, { backgroundColor: '#fff' }]}
        onPress={() => setTermsAccepted(!termsAccepted)}
      >
        <View
          style={[
            styles.checkbox,
            {
              borderColor: termsAccepted
                ? theme.color.surface.accent.primary
                : theme.color.border.strong,
              backgroundColor: termsAccepted
                ? theme.color.surface.accent.primary
                : 'transparent',
            },
          ]}
        >
          {termsAccepted && (
            <NText variant="labelSmallStrong" color="#fff" style={{ fontSize: 12 }}>
              ✓
            </NText>
          )}
        </View>
        <NText variant="paragraphSmallDefault" tone="secondary" style={{ flex: 1 }}>
          Acepto términos en condiciones
        </NText>
      </Pressable>

      {/* Bottom bar */}
      <View style={{ paddingHorizontal: theme.spacing[4], paddingTop: theme.spacing[5], paddingBottom: theme.spacing[5], backgroundColor: '#fff' }}>
        {termsAccepted ? (
          <Button
            label="Entendido"
            variant="primary"
            expanded
            onPress={() => navigation.navigate('PinChallengeV3')}
          />
        ) : (
          <View
            style={{
              height: 48,
              borderRadius: 9999,
              backgroundColor: theme.color.surface.disabled,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <NText variant="labelSmallStrong" color={theme.color.content.disabled}>
              Entendido
            </NText>
          </View>
        )}
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  artworkBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: STATUS_BAR_HEIGHT + ARTWORK_HEIGHT,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  whiteBackground: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT + ARTWORK_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  topBarOverlay: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  avatarContainer: {
    height: AVATAR_SIZE + 6,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  avatarBottomHalf: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    backgroundColor: '#fff',
  },
  avatarRing: {
    borderRadius: AVATAR_SIZE / 2 + 4,
    padding: 3,
    backgroundColor: '#fff',
    shadowColor: '#1F002F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 4,
  },
  profileAvatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  contentArea: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  profileText: {
    alignItems: 'center',
    gap: 4,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  bankCardWrapper: {
    paddingHorizontal: 24,
  },
  bankCard: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  bankAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  bankInfo: {
    flex: 1,
    gap: 4,
  },
  arrowDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 12,
  },
  detailsList: {
    paddingHorizontal: 20,
  },
  detailRow: {
    gap: 4,
    paddingVertical: 8,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
