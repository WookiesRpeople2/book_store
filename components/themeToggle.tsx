import { Moon, Sun } from "lucide-react-native";
import { useTheme } from "@/hooks/useTheme";
import { Pressable, Text } from "react-native";

export const ThemeToggle = () => {
  const {toggleColorScheme, isDarkColorScheme} = useTheme();

  return (
    <Pressable
      onPress={toggleColorScheme}
      className="flex-row items-center gap-2 p-3 rounded-lg bg-secondary"
    >
      {isDarkColorScheme ? (
        <Moon size={20} className="text-foreground" />
      ) : (
        <Sun size={20} className="text-foreground" />
      )}
    </Pressable>
  )
};
