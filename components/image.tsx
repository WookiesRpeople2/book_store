import { Image as ExpoImage, ImageProps } from "react-native";
import { IMAGE_PLACEHOLDER } from "@/constants";
import { cn } from "@/lib/utils";
import { FC } from "react";

type Props = {
  url: string;
  className: string;
}&ImageProps;

export const Image: FC<Props> = ({url, className, ...props}) => (
  <ExpoImage
    source={{ uri: !url ? IMAGE_PLACEHOLDER : url }}
    className={cn(className)}
    {...props}
  />

)

