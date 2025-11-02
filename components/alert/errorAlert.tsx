import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Text } from '@/components/ui/text';
import { AlertCircleIcon, CheckCircle2Icon, Terminal } from 'lucide-react-native';
import { View } from 'react-native';
import { FC } from 'react';
import { BackArrow } from '../backArrow';

type Props = {
  message: string;
};

export const ErrorAlert: FC<Props> = ({ message }) => {
  return (
    <>
      <BackArrow />
      <View className="w-full max-w-xl">
        <View className="items-center mb-6 animate-bounce">
          <View className="w-20 h-20 rounded-full bg-red-100 items-center justify-center shadow-lg">
            <AlertCircleIcon className="w-10 h-10 text-red-600" strokeWidth={2.5} />
          </View>
        </View>

        <View className="bg-white rounded-2xl shadow-2xl border border-red-100 overflow-hidden">
          <View className="h-1.5 bg-gradient-to-r from-red-500 via-red-600 to-red-500" />

          <View className="p-6">
            <Alert icon={AlertCircleIcon} variant="destructive" className="border-0 shadow-none bg-transparent">
              <AlertTitle className="text-2xl font-bold text-red-900 mb-3">
                Something went wrong
              </AlertTitle>
              <AlertDescription className="text-base text-red-800 leading-relaxed">
                {message}
              </AlertDescription>
            </Alert>

            <View className="mt-6 pt-6 border-t border-red-100">
              <View className="text-sm text-red-700">
                Try refreshing the page or contact support if the problem persists.
              </View>
            </View>
          </View>
        </View>

        <View className="absolute -z-10 top-0 right-0 w-32 h-32 bg-red-200 rounded-full opacity-20 blur-3xl" />
        <View className="absolute -z-10 bottom-0 left-0 w-40 h-40 bg-red-300 rounded-full opacity-15 blur-3xl" />
      </View>
    </>
  );
};
