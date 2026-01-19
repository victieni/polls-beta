import UsersProvider from "@/contexts/users.context";
import { useColor } from "@/hooks/useColor";
import { useAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Octicons";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import {
	Badge,
	Icon,
	Label,
	NativeTabs,
	VectorIcon,
} from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

export default function TabsLayout() {
	const red = useColor("red");
	const primary = useColor("primary");
	const foreground = useColor("foreground");

	return (
		<NativeTabs
			minimizeBehavior="onScrollDown"
			labelStyle={{
				default: { color: foreground },
				selected: { color: primary },
			}}
			iconColor={{
				default: foreground,
				selected: primary,
			}}
			badgeBackgroundColor={red}
			labelVisibilityMode="labeled"
			disableTransparentOnScrollEdge={true}
			badgeTextColor={red}
		>
			<NativeTabs.Trigger options={{}} name="polls">
				{Platform.select({
					ios: <Icon sf="cube.box.fill" />,
					// ios: <Icon src={<VectorIcon family={Ionicons} name="home" />} />,
					android: <Icon src={<VectorIcon family={Ionicons} name="home" />} />,
				})}
				<Label>Polls</Label>
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name="profile">
				{Platform.select({
					ios: <Icon sf="person.crop.circle" />,
					android: (
						<Icon src={<VectorIcon family={Ionicons} name="person" />} />
					),
				})}
				<Label>Profile</Label>
				<Badge>3</Badge>
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name="create">
				{Platform.select({
					ios: <Icon sf={"plus.circle"} />,
					android: (
						<Icon src={<VectorIcon family={Ionicons} name="plus-circle" />} />
					),
				})}

				<Label>Create</Label>
			</NativeTabs.Trigger>

			<NativeTabs.Trigger
				name="search"
				role={isLiquidGlassAvailable() ? "search" : undefined}
			>
				{Platform.select({
					ios: <Icon sf="magnifyingglass" />,
					android: (
						<Icon src={<VectorIcon family={Ionicons} name="search" />} />
					),
				})}
				<Label>Search</Label>
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
