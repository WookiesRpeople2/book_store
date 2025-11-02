import { usePathname, useRouter, useSegments } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";



export const BackArrow = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  
  const isHomePage = pathname === '/' || pathname === '/index';  
  if (isHomePage) return null;
  
  return (
    <Pressable
      onPress={() => router.back()}
      style={{ top: insets.top + 16 }}
      className="absolute left-6 z-50 p-3 rounded-full active:opacity-70"
    >
      <ArrowLeft size={24} color="white" strokeWidth={2.5} />
    </Pressable>
  )
};
