import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Avatar,
  BottomBar,
  ListRow,
  NText,
  TopBar,
  ArrowDownIcon,
  ExpandLessIcon,
  ExpandMoreIcon,
  NuLogoIcon,
} from '@nubank/nuds-vibecode-react-native';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FlowConfirmationUS'>;

export function FlowConfirmationScreenUS({ navigation }: Props) {
  const [detailsExpanded, setDetailsExpanded] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <View style={styles.container}>
      {/* Top Bar with progress indicator */}
      <TopBar
        title=""
        show1stAction={false}
        onBackPress={() => navigation.goBack()}
        style={styles.topBar}
      />
      <View style={styles.progressTrack}>
        <View style={styles.progressFill} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile section */}
        <View style={styles.profileSection}>
          <Avatar
            variant="icon"
            size="medium"
          />
          <View style={styles.profileText}>
            <NText variant="labelSmallStrong" style={styles.centerText}>
              Name account holder
            </NText>
            <NText variant="paragraphSmallDefault" tone="secondary" style={styles.centerText}>
              Checking account
            </NText>
          </View>
        </View>

        {/* Bank transfer card */}
        <View style={styles.bankCardWrapper}>
          <View style={styles.bankCard}>
            {/* Source bank */}
            <View style={styles.bankRow}>
              <Avatar
                variant="icon"
                size="small"
                backgroundColor="#1a1a2e"
              />
              <View style={styles.bankInfo}>
                <NText variant="labelSmallStrong">Bank payroll holder</NText>
                <NText variant="paragraphSmallDefault" tone="secondary">
                  Routing ••• 4567
                </NText>
              </View>
            </View>

            {/* Arrow divider */}
            <View style={styles.arrowDivider}>
              <View style={styles.dividerLine} />
              <ArrowDownIcon size={24} color="#1F023040" />
              <View style={styles.dividerLine} />
            </View>

            {/* Destination bank */}
            <View style={styles.bankRow}>
              <Avatar
                variant="icon"
                size="small"
                backgroundColor="#820AD1"
                icon={<NuLogoIcon size={16} color="#fff" />}
              />
              <View style={styles.bankInfo}>
                <NText variant="labelSmallStrong">Nubank</NText>
                <NText variant="paragraphSmallDefault" tone="secondary">
                  Routing ••• 8901
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
            Portability details
          </NText>
          {detailsExpanded
            ? <ExpandLessIcon size={20} color="#1F0230" opacity={0.62} />
            : <ExpandMoreIcon size={20} color="#1F0230" opacity={0.62} />
          }
        </Pressable>

        {detailsExpanded && (
          <View>
            <ListRow
              label="Date of birth"
              description="June 25, 2004"
              compact
              style={styles.detailRow}
            />
            <ListRow
              label="Account type"
              description="Checking"
              compact
              style={styles.detailRow}
            />
          </View>
        )}

        {/* Terms checkbox */}
        <Pressable
          style={styles.termsRow}
          onPress={() => setTermsAccepted(!termsAccepted)}
        >
          <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
            {termsAccepted && (
              <NText variant="labelSmallStrong" color="#fff" style={{ fontSize: 12 }}>
                ✓
              </NText>
            )}
          </View>
          <NText variant="paragraphSmallDefault" tone="secondary" style={{ flex: 1 }}>
            I accept the terms and conditions
          </NText>
        </Pressable>
      </ScrollView>

      {/* Bottom bar */}
      <BottomBar
        primaryLabel="Switch my direct deposit"
        primaryDisabled={!termsAccepted}
        onPrimaryPress={() => navigation.navigate('FlowSuccess')}
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
  topBar: {
    backgroundColor: 'transparent',
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#E8E8E8',
    marginHorizontal: 100,
    borderRadius: 2,
    marginTop: -8,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    width: '66%',
    backgroundColor: '#820AD1',
    borderRadius: 2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 20,
    gap: 4,
  },
  profileText: {
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  centerText: {
    textAlign: 'center',
  },
  bankCardWrapper: {
    paddingHorizontal: 24,
  },
  bankCard: {
    borderWidth: 1,
    borderColor: 'rgba(31, 2, 48, 0.08)',
    borderRadius: 16,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
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
    backgroundColor: 'rgba(31, 2, 48, 0.08)',
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 12,
  },
  detailRow: {
    backgroundColor: 'transparent',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(31, 2, 48, 0.20)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#820AD1',
    borderColor: '#820AD1',
  },
});
