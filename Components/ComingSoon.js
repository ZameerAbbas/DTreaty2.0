import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import translate from 'translate';

const ComingSoon = () => {
  const [translatedText, setTranslatedText] = useState('');
  const [isUrdu, setIsUrdu] = useState(true); // Track whether the text is in Urdu

  useEffect(() => {
    const translateText = async (text, from, to) => {
      try {
        const result = await translate(text, { from, to });
        setTranslatedText(result);
      } catch (error) {
        console.error('Error translating text:', error);
        setTranslatedText('Translation error');
      }
    };

    // Initial translation to Urdu
    translateText('This page is coming soon', 'en', 'ur');
  }, []);

  const toggleLanguage = async () => {
    const from = isUrdu ? 'ur' : 'en';
    const to = isUrdu ? 'en' : 'ur';
    const text = isUrdu ? 'یہ صفحہ جلد آرہا ہے' : 'This page is coming soon';

    try {
      const result = await translate(text, { from, to });
      setTranslatedText(result);
      setIsUrdu(!isUrdu); // Toggle the language state
    } catch (error) {
      console.error('Error translating text:', error);
      setTranslatedText('Translation error');
    }
  };

  return (
    <View style={styles.container}>
      <Text>ComingSoon</Text>
      <Text>{translatedText}</Text>
      <Button title="Toggle Language" onPress={toggleLanguage} />
    </View>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 1000,
  },
});
