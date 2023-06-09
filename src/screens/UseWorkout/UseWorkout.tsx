import React, { useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from '../DrawerNavigator';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
  ListRenderItem,
  ViewToken,
} from 'react-native';
import AnimatedExerciseCardContainer from '../../components/AnimatedExerciseCardContainer';
import UseWorkoutHeader from '../../components/headers/UseWorkoutHeader';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import Block from '../../components/blocks/Block';
import ConsumableExerciseCard from '../../components/ConsumableExerciseCard';
import { useActiveWorkout } from '../../hooks/useActiveWorkout';

type UseWorkoutPageProps = NativeStackScreenProps<NavigatorParamList, 'UseWorkout'>;

const UseWorkoutPage: React.FC<UseWorkoutPageProps> = ({ navigation, route }) => {
  const [consumableWorkout, isActive, stop] = useActiveWorkout((state) => [
    state.workout,
    state.isActive,
    state.stop,
  ]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 90 });
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (
      viewableItems &&
      viewableItems.length > 0 &&
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      setVisibleIndex(viewableItems[0].index);
    }
  });
  const [cardView, setCardView] = useState(true);
  const flatlistRef = useRef<FlatList>(null);

  const renderCardItem: ListRenderItem<string> = ({ item: exerciseName, index }) => {
    return (
      <AnimatedExerciseCardContainer visible={index === visibleIndex} className="bg-white">
        <ConsumableExerciseCard exerciseName={exerciseName} userId={route.params.userId} />
      </AnimatedExerciseCardContainer>
    );
  };

  const renderListItem: ListRenderItem<string> = ({ item: exerciseName, index }) => {
    const goToCard = () => {
      setCardView(true);
      setTimeout(() => {
        flatlistRef.current?.scrollToIndex({ index, animated: true });
      }, 500);
    };

    return (
      <Animated.View entering={FadeInLeft.duration(200).delay(100 * index)} className="self-center">
        <Block title={exerciseName} icon="expand" onPress={goToCard} onOptionsPress={goToCard} />
      </Animated.View>
    );
  };

  const endWorkout = async () => {
    stop();
    navigation.navigate('WorkoutSummary', {});
  };

  const onStopPress = () => {
    Alert.alert('End workout session?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: endWorkout,
      },
    ]);
  };

  return (
    <>
      {consumableWorkout && isActive && (
        <UseWorkoutHeader
          consumableWorkout={consumableWorkout}
          index={visibleIndex}
          isCardView={cardView}
          toggleView={() => {
            setCardView(!cardView);
          }}
          onStopPress={onStopPress}
        />
      )}

      {consumableWorkout && isActive && (
        <View className="h-full w-full flex-1 bg-slate-50">
          <FlatList
            ref={flatlistRef}
            data={consumableWorkout.exercises}
            keyExtractor={(item) => item}
            renderItem={cardView ? renderCardItem : renderListItem}
            horizontal={cardView}
            snapToAlignment="end"
            viewabilityConfig={viewabilityConfig.current}
            onViewableItemsChanged={onViewableItemsChanged.current}
            decelerationRate={'fast'}
            className="w-full"
            style={styles.flatlist}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flatlist: {},
  card: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  smallCard: {
    width: Dimensions.get('window').width,
    height: '50%',
  },
});

export default UseWorkoutPage;
