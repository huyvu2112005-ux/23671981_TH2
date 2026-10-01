import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {STUDENT_LINE, VARIANT} from '../constants/student';
import {colors} from '../constants/theme';

type Props = {
  children: React.ReactNode;
};

export default function Watermark({children}: Props) {
  return (
    <View style={styles.root}>
      {VARIANT.watermarkAtTop && (
        <Text style={[styles.watermark, styles.top]}>{STUDENT_LINE}</Text>
      )}
      <View style={styles.content}>{children}</View>
      {!VARIANT.watermarkAtTop && (
        <Text style={[styles.watermark, styles.bottom]}>{STUDENT_LINE}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  watermark: {
    color: colors.textLight,
    fontSize: 11,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  top: {
    paddingTop: 8,
    paddingBottom: 4,
  },
  bottom: {
    paddingTop: 4,
    paddingBottom: 8,
  },
});
