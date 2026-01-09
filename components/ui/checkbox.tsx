import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { BORDER_RADIUS } from "@/theme/globals";
import { Check } from "lucide-react-native";
import React, { ComponentProps } from "react";
import { TextStyle, TouchableOpacity } from "react-native";
import { withUniwind } from "uniwind";

interface CheckboxProps {
	checked: boolean;
	label?: string;
	error?: string;
	disabled?: boolean;
	labelStyle?: TextStyle;
	onCheckedChange: (checked: boolean) => void;
}

export const Checkbox = withUniwind(
	({
		checked,
		error,
		disabled = false,
		label,
		labelStyle,
		onCheckedChange,
		// style,
		className,
		...props
	}: CheckboxProps & ComponentProps<typeof TouchableOpacity>) => {
		const primary = useColor("primary");
		const primaryForegroundColor = useColor("primaryForeground");
		const foregroundColor = useColor("foreground");
		const danger = useColor("red");
		const borderColor = useColor("border");

		return (
			<TouchableOpacity
				{...props}
				// style={
				// 	style
				// 	// opacity: disabled ? 0.5 : 1,
				// }
				className={`flex-row items-center ${
					disabled && "opacity-30"
				} ${className}`}
				activeOpacity={0.7}
				onPress={() => !disabled && onCheckedChange(!checked)}
				disabled={disabled}
			>
				<View
					style={{
						width: BORDER_RADIUS,
						height: BORDER_RADIUS,
						borderRadius: BORDER_RADIUS,
						borderWidth: 1.5,
						borderColor: checked ? primary : borderColor,
						backgroundColor: checked ? primary : "transparent",
						alignItems: "center",
						justifyContent: "center",
						marginRight: label ? 8 : 0,
					}}
				>
					{checked && (
						<Check
							size={16}
							color={primaryForegroundColor}
							strokeWidth={3}
							strokeLinecap="round"
						/>
					)}
				</View>
				{label && (
					<Text
						variant="caption"
						numberOfLines={1}
						ellipsizeMode="tail"
						style={[
							{
								color: error ? danger : foregroundColor,
							},
							labelStyle,
						]}
						pointerEvents="none"
					>
						{label}
					</Text>
				)}
			</TouchableOpacity>
		);
	}
);
