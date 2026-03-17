import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Badge,
  Header,
  InlineActions,
  NText,
  Divider,
  useNuDSTheme,
  StoreIcon,
  InternationalTransferIcon,
  CardIcon,
  CopyIcon,
  MoreVerticalIcon,
  ExpandLessIcon,
  SmartphoneIcon,
  LendingIcon,
} from '@nubank/nuds-vibecode-react-native';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Deposit'>;

export function DepositScreen({ navigation }: Props) {
  const theme = useNuDSTheme();
  const [moreExpanded, setMoreExpanded] = useState(true);

  const inlineActions = [
    {
      key: 'efectivo',
      label: 'En efectivo',
      icon: <StoreIcon size={24} color={theme.color.content.default} />,
      onPress: () => {},
    },
    {
      key: 'eua',
      label: 'Desde EUA',
      icon: <InternationalTransferIcon size={24} color={theme.color.content.default} />,
      onPress: () => {},
    },
    {
      key: 'disponer',
      label: 'Disponiendo\nsaldo',
      icon: <CardIcon size={24} color={theme.color.content.default} />,
      badge: true,
      badgeLabel: '$10 MXN',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        type="standard"
        title="Deposita dinero"
        showSubtitle={false}
        showAction={false}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Inline actions */}
        <InlineActions actions={inlineActions} />

        {/* CLABE card */}
        <View style={styles.clabeCard}>
          <View style={styles.clabeContent}>
            <NText variant="labelMediumStrong">CLABE</NText>
            <NText variant="paragraphSmallDefault" tone="secondary" style={{ marginTop: 4 }}>
              1112 2233 3333 333334
            </NText>
          </View>
          <View style={styles.clabeActions}>
            <TouchableOpacity style={styles.clabeIconBtn}>
              <CopyIcon size={24} color={theme.color.content.default} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.clabeIconBtn}>
              <MoreVerticalIcon size={24} color={theme.color.content.default} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Más opciones */}
        <TouchableOpacity
          style={styles.moreRow}
          onPress={() => setMoreExpanded(!moreExpanded)}
          activeOpacity={0.7}
        >
          <NText variant="labelSmallStrong" tone="secondary">
            Más opciones
          </NText>
          <View style={{ transform: [{ rotate: moreExpanded ? '0deg' : '180deg' }] }}>
            <ExpandLessIcon size={24} color={theme.color.content.subtle} />
          </View>
        </TouchableOpacity>

        {moreExpanded && (
          <View style={styles.pillsContainer}>
            {/* Dimo pill */}
            <TouchableOpacity
              style={[styles.pill, { backgroundColor: theme.color.surface.subtle }]}
              activeOpacity={0.7}
            >
              <SmartphoneIcon size={24} color={theme.color.content.default} />
              <NText variant="labelSmallStrong" style={{ flex: 1 }}>
                Dimo
              </NText>
            </TouchableOpacity>

            {/* Portabilidad de nómina pill — highlighted */}
            <TouchableOpacity
              style={[styles.pill, { backgroundColor: theme.color.surface.subtle }]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Onboarding')}
            >
              <LendingIcon size={24} color={theme.color.content.default} />
              <NText variant="labelSmallStrong" style={{ flex: 1 }}>
                Portabilidad de nómina
              </NText>
              <Badge label="+3 beneficios" color="accent" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 54,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  /* CLABE card */
  clabeCard: {
    marginHorizontal: 24,
    marginTop: 8,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#efefef',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  clabeContent: {
    flex: 1,
  },
  clabeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clabeIconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Más opciones */
  moreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 8,
  },

  /* Pills */
  pillsContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 12,
    height: 56,
  },
});
