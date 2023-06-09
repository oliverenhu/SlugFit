import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorParamList } from '../DrawerNavigator';
import MyWorkouts from './MyWorkouts';
import ToggleDrawerButton from '../../components/buttons/ToggleDrawerButton';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import EditWorkoutPage from '../EditWorkout/EditWorkoutPage';
import EditExercisePage from '../EditExercise/EditExercisePage';
import BreadcrumbHeader from '../../components/headers/BreadcrumbsHeader';
import { RouteProp } from '@react-navigation/native';

type MyWorkoutsStackProps = NativeStackScreenProps<NavigatorParamList, 'MyWorkoutsStack'>;

const Stack = createNativeStackNavigator<NavigatorParamList>();

const MyWorkoutsStack: React.FC<MyWorkoutsStackProps> = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerLeft: () => (
          <>
            <ToggleDrawerButton
              toggleDrawer={() => {
                navigation.toggleDrawer();
              }}
            />
            <View className="w-2"></View>
            <BreadcrumbHeader
              navigation={navigation}
              route={
                route as RouteProp<
                  Pick<NavigatorParamList, 'MyWorkouts' | 'EditWorkoutPage' | 'EditExercisePage'>,
                  'MyWorkouts' | 'EditWorkoutPage' | 'EditExercisePage'
                >
              }
            />
          </>
        ),
        title: '',
      })}
    >
      <Stack.Screen name="MyWorkouts" component={MyWorkouts} />
      <Stack.Screen name="EditWorkoutPage" component={EditWorkoutPage} />
      <Stack.Screen name="EditExercisePage" component={EditExercisePage} />
    </Stack.Navigator>
  );
};

export default MyWorkoutsStack;
