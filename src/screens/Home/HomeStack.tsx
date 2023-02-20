import React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorParamList } from '../DrawerNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Home from './Home';
import SelectWorkoutPage from '../SelectWorkout/SelectWorkoutPage';
import BackButton from '../../components/BackButton';

type HomeStackProps = NativeStackScreenProps<NavigatorParamList, 'HomeStack'>;

const Stack = createNativeStackNavigator<NavigatorParamList>();

const HomeStack: React.FC<HomeStackProps> = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="SelectWorkout"
        component={SelectWorkoutPage}
        options={({ navigation }) => ({
          headerLeft: () => (
            <BackButton
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerTitle: () => (
            <Text className="text-center text-sm font-medium">Start a Workout</Text>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
