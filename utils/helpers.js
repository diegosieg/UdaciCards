import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';

export function formatQuestionsLength(questionsLength) {
  const ql = questionsLength;

  if (ql === 1) {
    return `${ql} card`;
  }
  return `${ql} cards`;
}
