import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import React from "react";
import { ViewStyle } from "react-native";
import { withUniwind } from "uniwind";

interface SeparatorProps {
	orientation?: "horizontal" | "vertical";
	style?: ViewStyle;
}

export const Separator = withUniwind(
	({ orientation = "horizontal", style }: SeparatorProps) => {
		const borderColor = useColor("border");

		return (
			<View
				style={[
					{
						backgroundColor: borderColor,
						...(orientation === "horizontal"
							? { height: 1, width: "100%" }
							: { width: 1, height: "100%" }),
					},
					style,
				]}
			/>
		);
	}
);
