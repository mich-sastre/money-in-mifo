import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Header,
  BottomBar,
  EyeSparkleIcon,
  NText,
} from '@nubank/nuds-vibecode-react-native';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FlowInputUS'>;

export function FlowInputScreenUS({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* V3 Header with TopBar (back arrow + more icon) */}
      <Header
        type="standard"
        title="Let's switch your direct deposit"
        subtitle="Money Lion partner with Pinwheel's network of over 60K employes"
        showSubtitle
        showTopBar
        showAction
        onBackPress={() => navigation.goBack()}
      />

      {/* Banner with icon — decorative lavender background */}
      <View style={styles.bannerFrame}>
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <EyeSparkleIcon size={20} />
            <View style={styles.bannerTextWrap}>
              <NText variant="paragraphSmallDefault" tone="secondary">
                We will use money lion to find your bank in seconds.
              </NText>
            </View>
          </View>
        </View>
      </View>

      {/* Spacer */}
      <View style={styles.spacer} />

      {/* V3 BottomBar — disabled primary CTA */}
      <BottomBar
        primaryLabel="Find my employer"
        onPrimaryPress={() => navigation.navigate('PinwheelMock')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 47 : StatusBar.currentHeight ?? 0,
  },
  bannerFrame: {
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  banner: {
    backgroundColor: '#EEEEFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  bannerTextWrap: {
    flex: 1,
  },
  spacer: {
    flex: 1,
  },
});
