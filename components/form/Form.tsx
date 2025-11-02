import { Children, FC, PropsWithChildren } from "react";
import { Platform, View } from "react-native";


type Props = {
  onSubmit: () => void;
};

export const Form: FC<PropsWithChildren<Props>> = ({ onSubmit, children }) => (
  Platform.OS === "web" ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit();
      }}
    >
      {children}
    </form>
  ) : (
    <View>
      {children}
    </View>
  )
);
