> with basic react-navigator ( stack / modal / drawer ) mode

## React Native Starter Project (RN: 0.62.2 & React: 16.11.0)

This is a react native basic project includes react-navigator ( stack / v5 modal / drawer exmaple), react-native-paper, native-base, react-native-element, fancy carsel, fancy picker (full page or wheel), react-native-modal example

Use React hooks, and include custom axios hooks to implement api.


---

Before you start : 

please install react native environment (ios / android)

[see here](https://reactnative.dev/docs/environment-setup)

-> **This project use React Native CLI but not EXPO**

After environment setup

ensure you nodejs version is upon `12.0.0`

then run below comment to setup react native environment

```
yarn install

npm run pod # if you will run on ios

npm run link # for setting react native navigation
```

And then run the project!

`npm run ios` to run ios simulator ( should install xcode and cocopods )

`npm run android` to run android emulator ( should install android studio and has emulator with android 9 and android 28 api )

---

### else

**RN 0.62 `useNativeDriver` issue**
[0.62 about useNativeDriver](https://github.com/react-native-community/releases/blob/master/CHANGELOG.md#deprecated)

how to fix this warning ? 

[official way](https://reactnative.dev/blog/2017/02/14/using-native-driver-for-animated#how-do-i-use-this-in-my-app)

now the project use `native-base` as a basic ui library

Content component use ScrollView but still hasn't fix this warning

[see here](https://github.com/GeekyAnts/NativeBase/issues/3109)
