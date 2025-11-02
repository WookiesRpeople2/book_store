import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export const BackArrow = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isHomePage = pathname === '/' || pathname === '/index';

  if (isHomePage) return null;

 

  const arrowClasses = cn(
    'rounded-full p-3 active:opacity-70',
    'relative left-3 bg-transparent'
  );

  return (
    <View>
      <Pressable
        onPress={() => router.back()}
        className={arrowClasses}
        style={{ marginTop: insets.top + 16 }}
      >
        <ArrowLeft
          size={24}
          color="black"
          strokeWidth={2.5}
        />
      </Pressable>
    </View>
  );
};

