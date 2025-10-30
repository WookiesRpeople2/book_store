import { Pressable, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useRouter } from '@/hooks/useRouter';

export const FloatingAddButton = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/books/add');
  };

  return (
    <Pressable
      className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-red-600 opacity-50 justify-center items-center shadow-lg z-50 hover:opacity-100"
      onPress={handlePress}
    >
      <Plus size={28} color="#ffffff" />
    </Pressable>
  );
};
