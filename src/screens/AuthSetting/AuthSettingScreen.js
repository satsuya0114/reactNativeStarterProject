import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import md5 from 'md5';
import { commonStyle, messageStyle } from '~style/';
import { FloatFormLabelInput, FloatLabelPwd, Button } from '~atoms/';
import { useUserStore } from '~store/userStore';
import { storeUserInfo } from '~utils/common';
import useQuery from '~hooks/useQuery';
import { CommonApi } from '~apis/';

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 10,
  },
  loginFont: {
    fontWeight: '600',
  },
});

const percentageStyles = () => {
  const { width } = Dimensions.get('screen');
  const pixelRatio = PixelRatio.get();
  const resolutionX = width * pixelRatio;
  if (resolutionX === 828) { // ios
    return ({
      content: {
        marginHorizontal: 50,
      },
    });
  }
  return StyleSheet.create({ // 480 TC20 | 720 TC75
    content: {
      marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(30),
    },
  });
};

const AuthSettingScreen = ({ type }) => {
  console.log(type);
  const { serverUrl, workstationIp, authData, setServerUrl, setWorkstationIp, setAuthData } = useUserStore();
  const { register, handleSubmit, errors, reset, control } = useForm({
    defaultValues: {
      serverUrl: 'http://',
    },
  });
  const loginQuery = useQuery(CommonApi.authLogin);
  useEffect(() => {
    register({ name: 'serverUrl' }, { required: true });
    register('workstationIp');
    register({ name: 'authUsername' }, { required: true });
    register({ name: 'password' }, { required: true });
  }, [register]);

  useEffect(() => {
    reset({
      serverUrl: serverUrl || 'http://',
      workstationIp,
      authUsername: authData.username,
    });
  }, [authData, reset, serverUrl, workstationIp]);

  const storeUser = (data) => {
    storeUserInfo({
      serverUrl: data.serverUrl,
      workstationIp: data.workstationIp,
      authUsername: data.authUsername,
    });
    setServerUrl(data.serverUrl);
    setWorkstationIp(data.workstationIp);
    setAuthData({ username: data.authUsername });
  };

  const onSubmit = async (data) => {
    const queryResult = await loginQuery.execLogin(data.serverUrl, data.authUsername, {
      userId: data.authUsername,
      password: md5(data.password),
    });
    const { result } = queryResult;
    if (result) {
      storeUser(data);
    }
  };

  return (
    <Container>
      <Content contentContainerStyle={commonStyle.centerRowContent}>
        <View style={[percentageStyles().content, { flex: 1 }]}>
          <Controller
            as={(
              <FloatFormLabelInput
                error={errors.serverUrl && true}
                label="Server Url"
                iconSetting={{
                  name: 'link',
                  type: 'Feather',
                }}
              />
            )}
            control={control}
            // rules={{ required: true }}
            name="serverUrl"
            onChangeName="onChangeText"
            onChange={([text]) => (text)}
            // defaultValue=""
          />
          {errors.serverUrl && <Text style={messageStyle.errorMessage}>This is required.</Text>}
          <Controller
            as={(
              <FloatFormLabelInput
                label="WorkStation IP"
                iconSetting={{
                  name: 'computer',
                  type: 'MaterialIcons',
                }}
              />
            )}
            control={control}
            name="workstationIp"
            onChangeName="onChangeText"
            onChange={([text]) => (text)}
          />
          <Controller
            as={(
              <FloatFormLabelInput
                error={errors.authUsername && true}
                label="Username"
                iconSetting={{
                  name: 'user',
                  type: 'Feather',
                }}
              />
            )}
            control={control}
            name="authUsername"
            onChangeName="onChangeText"
            onChange={([text]) => (text)}
          />
          {errors.authUsername && <Text style={messageStyle.errorMessage}>This is required.</Text>}
          <Controller
            as={(
              <FloatLabelPwd error={errors.password && true} />
            )}
            control={control}
            name="password"
            onChangeName="onChangeText"
            onChange={([text]) => (text)}
          />
          {errors.password && <Text style={messageStyle.errorMessage}>This is required.</Text>}
          <Button block success style={styles.loginButton} onPress={handleSubmit(onSubmit)} loading={loginQuery.isLoading}>
            <Text style={styles.loginFont}>Auth Login</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

AuthSettingScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.shape({
    type: PropTypes.string,
  }),
  type: PropTypes.string.isRequired,
};

AuthSettingScreen.defaultProps = {
  navigation: {},
  route: {
    type: '',
  },
};

export default AuthSettingScreen;
