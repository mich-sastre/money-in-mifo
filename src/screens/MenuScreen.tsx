import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Badge,
  CloseIcon,
  DivideIcon,
  HelpIcon,
  LendingIcon,
  ListRow,
  MoneyBoxIcon,
  MoneyShieldIcon,
  MoneyStackIcon,
  CardIcon,
  RecurringPaymentsIcon,
  RewardsIcon,
  SearchBar,
  SectionTitle,
  SettingsIcon,
  useNuDSTheme,
  DollarSignIcon,
} from '@nubank/nuds-vibecode-react-native';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const PANEL_HEIGHT = SCREEN_HEIGHT - 87;

export function MenuScreen({ navigation }: Props) {
  const theme = useNuDSTheme();
  const [searchText, setSearchText] = useState('');

  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const panelTranslateY = useRef(new Animated.Value(PANEL_HEIGHT)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(panelTranslateY, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const dismiss = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(panelTranslateY, {
        toValue: PANEL_HEIGHT,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.goBack());
  };

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={dismiss}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.panel,
          { backgroundColor: theme.color.background.subtle, transform: [{ translateY: panelTranslateY }] },
        ]}
      >
        {/* Handle indicator */}
        <View style={styles.handleContainer}>
          <View style={[styles.handle, { backgroundColor: theme.color.surface.disabled.strong }]} />
        </View>

        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconAction} onPress={dismiss}>
            <CloseIcon size={20} color={theme.color.content.default} />
          </TouchableOpacity>

          <View style={styles.trailingActions}>
            <TouchableOpacity style={styles.iconAction}>
              <HelpIcon size={20} color={theme.color.content.default} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconAction}>
              <MoneyShieldIcon size={20} color={theme.color.content.default} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconAction}>
              <SettingsIcon size={20} color={theme.color.content.default} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Search bar */}
          <SearchBar
            placeholder="Buscar"
            value={searchText}
            onChangeText={setSearchText}
            onClear={() => setSearchText('')}
            style={styles.searchBar}
          />

          {/* Featured rows */}
          <View style={[styles.cardGroup, {
            backgroundColor: theme.color.surface.default,
            borderColor: theme.color.border.default,
          }]}>
            <ListRow
              label="Asistente de pagos"
              leading={<RecurringPaymentsIcon size={20} color={theme.color.content.default} />}
              trailing={<Badge label="Destacado" />}
              showDivider
              onPress={() => {}}
            />
            <ListRow
              label="MSI con Nu"
              leading={<DivideIcon size={20} color={theme.color.content.default} />}
              trailing={<Badge label="Destacado" />}
              onPress={() => {}}
            />
          </View>

          {/* Servicios financieros */}
          <SectionTitle title="Servicios financieros" compact />

          <View style={[styles.cardGroup, {
            backgroundColor: theme.color.surface.default,
            borderColor: theme.color.border.default,
          }]}>
            <ListRow
              label="Cuenta"
              leading={<DollarSignIcon size={20} color={theme.color.content.default} />}
              showChevron
              showDivider
              onPress={() => {}}
            />
            <ListRow
              label="Portabilidad de nómina"
              leading={<MoneyStackIcon size={20} color={theme.color.content.default} />}
              showChevron
              showDivider
              onPress={() => {
                Animated.parallel([
                  Animated.timing(backdropOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
                  Animated.timing(panelTranslateY, { toValue: PANEL_HEIGHT, duration: 280, useNativeDriver: true }),
                ]).start(() => {
                  navigation.goBack();
                  navigation.navigate('Onboarding');
                });
              }}
            />
            <ListRow
              label="Tarjeta de crédito"
              leading={<CardIcon size={20} color={theme.color.content.default} />}
              showChevron
              showDivider
              onPress={() => {}}
            />
            <ListRow
              label="Préstamos"
              leading={<LendingIcon size={20} color={theme.color.content.default} />}
              showDivider
              onPress={() => {}}
            />
            <ListRow
              label="Cajitas"
              leading={<MoneyBoxIcon size={20} color={theme.color.content.default} />}
              onPress={() => {}}
            />
          </View>

          {/* Programas de beneficio */}
          <SectionTitle title="Programas de beneficio" compact />

          <View style={[styles.cardGroup, {
            backgroundColor: theme.color.surface.default,
            borderColor: theme.color.border.default,
          }]}>
            <ListRow
              label="Nu +"
              leading={<RewardsIcon size={20} color={theme.color.content.default} />}
              onPress={() => {}}
            />
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: PANEL_HEIGHT,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 9,
    paddingBottom: 4,
  },
  handle: {
    width: 64,
    height: 4,
    borderRadius: 64,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  iconAction: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 64,
  },
  trailingActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  searchBar: {
    marginBottom: 12,
  },
  cardGroup: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 12,
  },
});
