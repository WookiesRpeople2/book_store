import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeToggle } from "./themeToggle";


export const BackArrow = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isHomePage = pathname === '/' || pathname === '/index';

  return (
    <View
      className="flex-row justify-between items-center px-4"
      style={{ marginTop: insets.top + 16 }}
    >
      {!isHomePage ? (
        <Pressable
          onPress={() => router.back()}
          className="rounded-full p-3 active:opacity-70 bg-transparent"
        >
          <ArrowLeft
            size={24}
            color="black"
            strokeWidth={2.5}
          />
        </Pressable>
      ) : <View />} 

      <ThemeToggle />
    </View>
  );
};

