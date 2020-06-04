import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button as BaseButton, Text as BaseText, Picker as BasePicker, Item } from 'native-base';
import PropTypes from 'prop-types';
import { LanguageKey } from '~locales/';

const DetailScreen = ({ route, navigation }) => {
  const { itemId, otherParam } = route.params;
  const { t, i18n } = useTranslation();
  const languageOptions = Object.values(LanguageKey)
    .map(language => ({
      label: i18n.getFixedT(language)('languageName'),
      value: language,
    }));

  const changeLanguage = language => i18n.changeLanguage(language);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail Screen 00</Text>
      <Text>itemId: {itemId}</Text>
      <Text>otherParam: {otherParam}</Text>
      <BaseButton bordered success onPress={() => navigation.push('Details', { itemId: Math.floor(Math.random() * 100) })}>
        <BaseText success>Go to Details... again</BaseText>
      </BaseButton>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <Text>{t('hello')}</Text>
      <Text>{t('chanageLanguage')}</Text>
      <Item picker>
        <BasePicker
          mode="dropdown"
          selectedValue={i18n.language}
          onValueChange={changeLanguage}
        >
          {
            languageOptions
              .map(option => (
                <BasePicker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))
          }
        </BasePicker>
      </Item>
      <Text>{t('look.deep.escape', { myVar: '~~~' })}</Text>
      <Text>{t('look.deep.escape', { myVar: '<img />' })}</Text>
      <Text>{t('look.deep.unescape', { myVar: '<img />' })}</Text>
    </View>
  );
};

DetailScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

DetailScreen.defaultProps = {
  route: {
    params: {
      itemId: 0,
      otherParam: '',
    },
  },
  navigation: {},
};

export default DetailScreen;
