import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';

interface BlockActionsModalProps {
  deleteWorkout: () => void;
  setModalVisible: (bool: boolean) => void;
}
const BlockActionsModal: React.FC<BlockActionsModalProps> = ({
  deleteWorkout,
  setModalVisible,
}) => {
  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={true}
      onBackdropPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      swipeDirection="down"
    >
      <View className="absolute top-3/4 h-full w-full rounded-t-3xl border-2 bg-white ">
        <View className="my-3 h-1 w-16 self-center rounded-lg bg-gray-400"></View>
        <TouchableOpacity accessibilityRole="button" onPress={deleteWorkout}>
          <Text className="text-center text-lg font-bold">Delete</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default BlockActionsModal;
