import React, { useState } from 'react';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CalloutBox } from '../components/CalloutBox';
import { FlowScreenLayout } from '../components/FlowScreenLayout';
import { PayrollInput } from '../components/PayrollInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { useCountry } from '../context/CountryContext';
import { spacing } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FlowInput'>;

export function FlowInputScreen({ navigation }: Props) {
  const { activeCountry, config } = useCountry();
  const { copy } = config;
  const isMX = activeCountry === 'mx';
  const [value, setValue] = useState('');
  const showInput = !config.usesThirdPartyIntegration;

  const handleInputChange = (text: string) => {
    if (isMX) {
      const digits = text.replace(/[^0-9]/g, '');
      setValue(digits.slice(0, 18));
    } else {
      setValue(text);
    }
  };

  const isValid = isMX ? value.length === 18 : value.length >= 6;
  const canContinue = showInput ? isValid : true;

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }

    if (activeCountry === 'br') {
      navigation.navigate('FlowBankSelection');
      return;
    }

    navigation.navigate('FlowConfirmation', { inputValue: value });
  };

  return (
    <FlowScreenLayout
      title={copy.inputTitle}
      subtitle={copy.inputSubtitle}
      onBack={() => navigation.goBack()}
    >
      <View style={{ flex: 1, paddingTop: spacing.x4 }}>
        {showInput && (
          <PayrollInput
            label={copy.inputLabel}
            placeholder={copy.inputPlaceholder}
            value={value}
            onChangeText={handleInputChange}
            validated={isValid}
            keyboardType={isMX ? 'number-pad' : 'default'}
          />
        )}
        {copy.inputCallout ? (
          <View style={{ paddingHorizontal: spacing.x6 }}>
            <CalloutBox text={copy.inputCallout} />
          </View>
        ) : null}
      </View>

      <View style={{ paddingHorizontal: spacing.x6, paddingBottom: spacing.xl + 8 }}>
        <PrimaryButton label={copy.inputCta} onPress={handleContinue} disabled={!canContinue} />
      </View>
    </FlowScreenLayout>
  );
}
