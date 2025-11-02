import { View, Text } from 'react-native';

type ToastProps = {
  text1: string;
  text2?: string;
};

export const toastProvider = {
  success: (props: ToastProps) => (
    <View className="bg-green-500 p-4 rounded-lg">
      <Text className="text-white font-bold">{props.text1}</Text>
      {props.text2 && <Text className="text-white">{props.text2}</Text>}
    </View>
  ),
  position: "bottom",
  visibilityTime: 4000,
  autoHide: true,
};

