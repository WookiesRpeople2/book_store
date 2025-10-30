import { FC } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Text, View } from "react-native";
import { Delete } from "lucide-react-native";


type Props = {
  buttonText: string;
  header: string;
  description: string;
  continueAction: () => void;
};

export const DeleteAlerte: FC<Props> = ({ buttonText, header, description, continueAction }) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="destructive">
        <View className="flex-row items-center justify-center gap-2">
          <Delete size={20} color="white" /> 
          <Text className="text-white font-semibold text-base">{buttonText}</Text>
        </View>
      </Button>    
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{header}</AlertDialogTitle>
        <AlertDialogDescription>
          {description}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>
          <Text>Cancel</Text>
        </AlertDialogCancel>
        <AlertDialogAction onPress={continueAction}>
          <Text className="text-white">Continue</Text>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
