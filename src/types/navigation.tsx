import {
  type NavigationContainer,
  type NavigatorScreenParams,
} from '@react-navigation/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {type ComponentProps} from 'react';

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer>> {}

export type RootNavigatorParamList = {
  UnAuthenticatedStack: NavigatorScreenParams<UnAuthenticatedStackNavigatorParamList>;
  AuthenticatedStack: NavigatorScreenParams<AuthenticatedStackNavigatorParamList>;
};

export type UnAuthenticatedStackNavigatorParamList = {
  Login: undefined;
};

export type AuthenticatedStackNavigatorParamList = {
  Home: undefined;
};

export type RootNavigatorScreenProps<T extends keyof RootNavigatorParamList> =
  NativeStackScreenProps<RootNavigatorParamList, T>;

export type UnAuthenticatedStackNavigatorScreenProps<
  T extends keyof UnAuthenticatedStackNavigatorParamList,
> = NativeStackScreenProps<UnAuthenticatedStackNavigatorParamList, T>;

export type AuthenticatedStackNavigatorScreenProps<
  T extends keyof AuthenticatedStackNavigatorParamList,
> = NativeStackScreenProps<AuthenticatedStackNavigatorParamList, T>;

declare global {
  namespace ReactNavigation {
    export interface RootParamList
      extends RootNavigatorParamList,
        UnAuthenticatedStackNavigatorParamList,
        AuthenticatedStackNavigatorParamList {}
  }
}
