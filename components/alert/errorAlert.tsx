import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Text } from '@/components/ui/text';
import { AlertCircleIcon, CheckCircle2Icon, Terminal } from 'lucide-react-native';
import { View } from 'react-native';
import { FC } from 'react';

type Props = {
  message: string;
};

export const ErrorAlert: FC<Props> = ({ message }) => {
  return (
    <View className="w-full max-w-xl gap-4">
      <Alert variant="destructive" icon={AlertCircleIcon}>
        <AlertTitle>An error has occured</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </View>
  );
};
