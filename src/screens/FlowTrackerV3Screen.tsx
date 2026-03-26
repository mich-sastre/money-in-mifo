import React from 'react';
import { Dimensions, Image, Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  TopBar,
  Badge,
  Button,
  NText,
  CreditLetterIcon,
  HeadsetIcon,
  useNuDSTheme,
} from '@nubank/nuds-vibecode-react-native';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FlowTrackerV3'>;

const headerArtwork = require('../../assets/tracker-header-artwork.png');
const cardArtwork = require('../../assets/tracker-card-artwork.png');

const SCREEN_WIDTH = Dimensions.get('window').width;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 47 : StatusBar.currentHeight ?? 0;
const ARTWORK_HEIGHT = 329;
const CARD_OVERLAP = 100;
const SPACER_HEIGHT = ARTWORK_HEIGHT - CARD_OVERLAP;

export function FlowTrackerV3Screen({ navigation }: Props) {
  const theme = useNuDSTheme();

  return (
    <Box surface="screen" style={styles.container}>
      {/* Background artwork */}
      <Image
        source={headerArtwork}
        style={styles.artworkBackground}
        resizeMode="contain"
      />

      {/* White background below artwork */}
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

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Spacer for artwork */}
        <View style={{ height: SPACER_HEIGHT }} />

        {/* Floating title card — top half transparent, bottom half white */}
        <View style={styles.titleCardWrapper}>
          <View style={styles.titleCardBottomHalf} />
          <View style={styles.titleCard}>
            <NText variant="titleMedium" style={{ width: '100%' }}>
              ¡Tu nómina está en camino!
            </NText>
            <NText variant="subtitleMediumDefault" tone="secondary" style={{ marginTop: 8, width: '100%' }}>
              La próxima vez que tu empresa envíe tu pago, estará en Nu. Te avisaremos si surge algo. Ponte a gusto.
            </NText>
          </View>
        </View>

        {/* Timeline section */}
        <View style={styles.timelineSection}>
          {/* Checkpoint 1 — purple bullet */}
          <View style={styles.checkpoint}>
            <View style={styles.checkpointBulletCol}>
              <View
                style={[styles.checkpointDot, { backgroundColor: theme.color.surface.accent.primary }]}
              />
              <View
                style={[styles.checkpointTrackDown, { backgroundColor: theme.color.surface.accent.primary }]}
              />
            </View>
            <View style={styles.checkpointContent}>
              <NText variant="labelSmallStrong" tone="secondary">
                Solicitud de portabilidad enviada
              </NText>
              <NText variant="paragraphSmallDefault" tone="secondary" style={{ marginTop: 8 }}>
                Estamos creando una conexión con el otro banco.
              </NText>
            </View>
          </View>

          {/* Step card */}
          <View style={[styles.stepCard, { backgroundColor: theme.color.surface.subtle }]}>
            {/* Card artwork */}
            <Image
              source={cardArtwork}
              style={styles.cardArtwork}
              resizeMode="cover"
            />

            {/* Step content with bullet */}
            <View style={styles.stepBody}>
              <View style={styles.bulletColumn}>
                <View style={[styles.bulletTrack, { backgroundColor: theme.color.surface.accent.primary }]} />
                <View
                  style={[styles.bulletCircle, { backgroundColor: theme.color.surface.accent.primary }]}
                >
                  <CreditLetterIcon size={20} color="#ffffff" />
                </View>
              </View>

              <View style={styles.stepTextContent}>
                <Badge label="Ve al app de tu otro banco" color="accent" />
                <NText variant="subtitleMediumStrong" style={{ marginTop: 12 }}>
                  Confirma el cambio en tu banco anterior
                </NText>
                <NText variant="paragraphSmallDefault" tone="secondary" style={{ marginTop: 4 }}>
                  Entra a la app de tu otro banco y acepta la portabilidad.
                </NText>
              </View>
            </View>
          </View>

          {/* Track connector */}
          <View style={styles.trackConnector}>
            <View style={[styles.connectorLine, { backgroundColor: theme.color.border.default }]} />
          </View>

          {/* Checkpoint 2 — gray bullet */}
          <View style={styles.checkpoint}>
            <View style={styles.checkpointBulletCol}>
              <View style={[styles.checkpointTrackUp, { backgroundColor: theme.color.border.default }]} />
              <View
                style={[styles.checkpointDot, { backgroundColor: theme.color.surface.strong }]}
              />
            </View>
            <View style={styles.checkpointContent}>
              <NText variant="labelSmallStrong" tone="secondary">
                Todo estará listo para el [15 de diciembre].
              </NText>
              <NText variant="paragraphSmallDefault" tone="secondary" style={{ marginTop: 8 }}>
                Una vez que la conexión esté lista, tendrás tu salario aquí en Nu.
              </NText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <View style={{ paddingHorizontal: theme.spacing[4], paddingVertical: theme.spacing[5] }}>
        <Button
          label="Entendido"
          variant="primary"
          expanded
          onPress={() => navigation.popToTop()}
        />
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
    height: ARTWORK_HEIGHT,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  whiteBackground: {
    position: 'absolute',
    top: ARTWORK_HEIGHT,
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
    paddingBottom: 20,
  },
  titleCardWrapper: {
    paddingHorizontal: 24,
    position: 'relative',
  },
  titleCardBottomHalf: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    backgroundColor: '#fff',
  },
  titleCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    shadowColor: '#1F002F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
  },
  timelineSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  checkpoint: {
    flexDirection: 'row',
    paddingLeft: 32,
    borderRadius: 12,
  },
  checkpointBulletCol: {
    alignItems: 'center',
    width: 12,
    marginLeft: -6,
  },
  checkpointDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  checkpointTrackDown: {
    width: 2,
    flex: 1,
  },
  checkpointTrackUp: {
    width: 2,
    height: 16,
  },
  checkpointContent: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 32,
    paddingLeft: 26,
  },
  stepCard: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  cardArtwork: {
    width: '100%',
    height: 143,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  stepBody: {
    flexDirection: 'row',
    paddingLeft: 32,
    paddingRight: 24,
  },
  bulletColumn: {
    alignItems: 'center',
    width: 32,
    marginLeft: -16,
  },
  bulletTrack: {
    width: 2,
    height: 19,
  },
  bulletCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTextContent: {
    flex: 1,
    paddingVertical: 24,
    paddingLeft: 12,
  },
  trackConnector: {
    paddingLeft: 32,
    height: 24,
  },
  connectorLine: {
    width: 2,
    height: '100%',
  },
});
