import React, { useMemo, useRef } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import {
  VisibilityOnIcon,
  UserAddIcon,
  HeadsetIcon,
  MoneyOutIcon,
} from '@nubank/nuds-vibecode-react-native';
import { useCountry } from '../context/CountryContext';
import type { RootStackParamList } from '../navigation/types';

const DEBUG = { borderWidth: 2, borderColor: 'red' } as const;

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { activeCountry } = useCountry();
  const isUS = activeCountry === 'us';
  const bottomSheetRef = useRef<BottomSheet>(null);

  const screenHeight = Dimensions.get('window').height;
  const snapPoints = useMemo(() => [screenHeight - 150, screenHeight], [screenHeight]);

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
            <TouchableOpacity style={styles.iconButton}>
              <HeadsetIcon size={24} color="#ffffff" />
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
        backgroundStyle={[styles.sheetBackground, DEBUG]}
        handleIndicatorStyle={{ display: 'none' }}
        handleStyle={{ display: 'none' }}
        overDragResistanceFactor={4}
      >
        <BottomSheetView style={styles.sheetContent}>
          {/* Salary Portability Widget */}
          <View style={styles.widget}>
            {/* Top: Title + Trailing Icon */}
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

            {/* Bottom: Two buttons */}
            <View style={styles.widgetButtons}>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => navigation.navigate(isUS ? 'OnboardingUS' : 'Onboarding')}
              >
                <Text style={styles.buttonSecondaryLabel}>Traer mi nómina</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonPrimary} onPress={() => {}}>
                <Text style={styles.buttonPrimaryLabel}>Ahora no</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
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
  sheetHandle: {
    backgroundColor: '#c4c0c7',
    width: 40,
    height: 4,
  },
  sheetContent: {
    flex: 1,
    padding: 16,
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
});
