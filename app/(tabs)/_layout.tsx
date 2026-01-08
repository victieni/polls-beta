import { useColor } from "@/hooks/useColor";
import Ionicons from "@expo/vector-icons/Ionicons";
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
				default: { color: primary },
				selected: { color: foreground },
			}}
			iconColor={{
				default: primary,
				selected: foreground,
			}}
			badgeBackgroundColor={red}
			labelVisibilityMode="labeled"
			disableTransparentOnScrollEdge={true}
			badgeTextColor={red}
		>
			<NativeTabs.Trigger name="(home)">
				{Platform.select({
					ios: <Icon sf="house.fill" />,
					android: <Icon src={<VectorIcon family={Ionicons} name="home" />} />,
				})}
				<Label>Home</Label>
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name="profile">
				{Platform.select({
					ios: <Icon sf="person.2.fill" />,
					android: (
						<Icon src={<VectorIcon family={Ionicons} name="person-circle" />} />
					),
				})}
				<Label>Profile</Label>
				<Badge>3</Badge>
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name="settings">
				{Platform.select({
					ios: <Icon sf="gear" />,
					android: (
						<Icon src={<VectorIcon family={Ionicons} name="settings" />} />
					),
				})}
				<Label>Settings</Label>
				<Badge>1</Badge>
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name="new">
				{Platform.select({
					ios: <Icon sf={"plus.bubble"} />,
					android: (
						<Icon src={<VectorIcon family={Ionicons} name="pulse-outline" />} />
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
