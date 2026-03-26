import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  NText,
  CloseIcon,
  SearchIcon,
  CheckIcon,
} from '@nubank/nuds-vibecode-react-native';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PinwheelMock'>;

type Step = 'search' | 'connecting' | 'success';

const EMPLOYERS = [
  { id: '1', name: 'Amazon', platform: 'ADP' },
  { id: '2', name: 'Walmart', platform: 'Workday' },
  { id: '3', name: 'Target', platform: 'ADP' },
  { id: '4', name: 'Apple', platform: 'Workday' },
  { id: '5', name: 'Google', platform: 'ADP' },
  { id: '6', name: 'Microsoft', platform: 'Workday' },
  { id: '7', name: 'Meta', platform: 'ADP' },
  { id: '8', name: 'Starbucks', platform: 'ADP' },
  { id: '9', name: 'JPMorgan Chase', platform: 'ADP' },
  { id: '10', name: 'Bank of America', platform: 'Workday' },
  { id: '11', name: 'UnitedHealth Group', platform: 'ADP' },
  { id: '12', name: 'FedEx', platform: 'Workday' },
];

export function PinwheelMockScreen({ navigation }: Props) {
  const [step, setStep] = useState<Step>('search');
  const [query, setQuery] = useState('');
  const progress = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(0)).current;

  const filtered = query.length > 0
    ? EMPLOYERS.filter(e => e.name.toLowerCase().includes(query.toLowerCase()))
    : EMPLOYERS;

  const handleSelectEmployer = () => {
    setStep('connecting');
  };

  useEffect(() => {
    if (step === 'connecting') {
      Animated.timing(progress, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: false,
      }).start(() => {
        setStep('success');
      });
    }
  }, [step, progress]);

  useEffect(() => {
    if (step === 'success') {
      Animated.spring(checkScale, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        navigation.replace('FlowConfirmationUS');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, checkScale, navigation]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Header bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.closeButton}
            accessibilityLabel="Close"
          >
            <CloseIcon size={20} color="#1F0230" opacity={0.62} />
          </Pressable>
        </View>
        <View style={styles.headerCenter}>
          <NText variant="labelSmallStrong">
            {step === 'search' ? 'Select your employer' : step === 'connecting' ? 'Connecting...' : 'Connected!'}
          </NText>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Powered by badge */}
      <View style={styles.poweredBy}>
        <NText variant="paragraphSmallDefault" tone="secondary">
          Powered by Pinwheel
        </NText>
      </View>

      {step === 'search' && (
        <>
          {/* Search input */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputWrap}>
              <SearchIcon size={18} color="#1F023099" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for your employer..."
                placeholderTextColor="#1F023066"
                value={query}
                onChangeText={setQuery}
                autoFocus
              />
            </View>
          </View>

          {/* Employer list */}
          <FlatList
            data={filtered}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.employerRow,
                  pressed && styles.employerRowPressed,
                ]}
                onPress={handleSelectEmployer}
              >
                <View style={styles.employerIcon}>
                  <NText variant="labelSmallStrong" color="#fff">
                    {item.name.charAt(0)}
                  </NText>
                </View>
                <View style={styles.employerInfo}>
                  <NText variant="labelSmallStrong">{item.name}</NText>
                  <NText variant="paragraphSmallDefault" tone="secondary">
                    via {item.platform}
                  </NText>
                </View>
              </Pressable>
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <NText variant="paragraphSmallDefault" tone="secondary">
                  No employers found
                </NText>
              </View>
            }
          />
        </>
      )}

      {step === 'connecting' && (
        <View style={styles.connectingContainer}>
          <View style={styles.spinnerWrap}>
            <View style={styles.spinnerOuter}>
              <View style={styles.spinnerInner} />
            </View>
          </View>
          <NText variant="titleMedium" style={styles.connectingTitle}>
            Switching your direct deposit
          </NText>
          <NText variant="subtitleMediumDefault" tone="secondary" style={styles.connectingSubtitle}>
            This may take a moment...
          </NText>
          <View style={styles.progressBarBg}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>
        </View>
      )}

      {step === 'success' && (
        <View style={styles.successContainer}>
          <Animated.View style={[styles.successCircle, { transform: [{ scale: checkScale }] }]}>
            <CheckIcon size={40} color="#fff" />
          </Animated.View>
          <NText variant="titleMedium" style={styles.successTitle}>
            Direct deposit switched!
          </NText>
          <NText variant="subtitleMediumDefault" tone="secondary" style={styles.successSubtitle}>
            Your payroll has been updated successfully.
          </NText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 47 : StatusBar.currentHeight ?? 0,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: { width: 44 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerRight: { width: 44 },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poweredBy: {
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F0230',
    fontFamily: 'NuSansText-Regular',
  },
  listContent: {
    paddingHorizontal: 0,
  },
  employerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 14,
  },
  employerRowPressed: {
    backgroundColor: '#F5F5F5',
  },
  employerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#820AD1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  employerInfo: {
    flex: 1,
    gap: 2,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  connectingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  spinnerWrap: {
    marginBottom: 32,
  },
  spinnerOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#820AD1',
    borderTopColor: 'transparent',
  },
  connectingTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  connectingSubtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  progressBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: '#E8E8E8',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#820AD1',
    borderRadius: 3,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  successSubtitle: {
    textAlign: 'center',
  },
});
