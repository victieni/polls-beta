import { SafeAreaView } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";
import { Button, Icon, Input, Link, Text, View } from "../ui";
import { Image } from "../ui/image";

export const UButton = withUniwind(Button);
export const UIcon = withUniwind(Icon);
export const ULink = withUniwind(Link);
export const UText = withUniwind(Text);
export const UView = withUniwind(View);
export const UInput = withUniwind(Input);
export const UImage = withUniwind(Image);
export const USafeAreaView = withUniwind(SafeAreaView);
