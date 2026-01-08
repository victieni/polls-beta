import { useColor } from "@/hooks/useColor";
import { LucideProps } from "lucide-react-native";
import React from "react";
import { withUniwind } from "uniwind";

export type Props = LucideProps & {
	lightColor?: string;
	darkColor?: string;
	name: React.ComponentType<LucideProps>;
};

export const Icon = withUniwind(
	({
		lightColor,
		darkColor,
		name: IconComponent,
		color,
		size = 24,
		strokeWidth = 1.8,
		...rest
	}: Props) => {
		const themedColor = useColor("icon", {
			light: lightColor,
			dark: darkColor,
		});

		// Use provided color prop if available, otherwise use themed color
		const iconColor = color || themedColor;

		return (
			<IconComponent
				color={iconColor}
				size={size}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				{...rest}
			/>
		);
	}
);
