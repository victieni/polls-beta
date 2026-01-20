import { Icon } from "@/components/ui/icon";
import { useColor } from "@/hooks/useColor";
import { Tabs } from "expo-router";
import { Home, Search, Users } from "lucide-react-native";
import React from "react";

export default function WebTabsLayout() {
	const primary = useColor("primary");

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: primary,
			}}
		>
			<Tabs.Screen
				name="polls"
				options={{
					title: "Polls",
					tabBarIcon: ({ color }) => (
						<Icon name={Home} size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<Icon name={Users} size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="create"
				options={{
					title: "Create",
					tabBarIcon: ({ color }) => (
						<Icon name={Users} size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					tabBarIcon: ({ color }) => (
						<Icon name={Search} size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
