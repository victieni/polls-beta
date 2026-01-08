import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { BORDER_RADIUS } from "@/theme/globals";
import { TextStyle, ViewStyle } from "react-native";
import { withUniwind } from "uniwind";

interface CardProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const Card = withUniwind(({ children, style }: CardProps) => {
	const cardColor = useColor("card");
	const foregroundColor = useColor("foreground");

	return (
		<View
			style={[
				{
					width: "100%",
					backgroundColor: cardColor,
					borderRadius: BORDER_RADIUS,
					padding: 18,
					shadowColor: foregroundColor,
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.05,
					shadowRadius: 3,
					elevation: 2,
				},
				style,
			]}
		>
			{children}
		</View>
	);
});

interface CardHeaderProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const CardHeader = withUniwind(
	({ children, style }: CardHeaderProps) => {
		return <View style={[{ marginBottom: 8 }, style]}>{children}</View>;
	}
);

interface CardTitleProps {
	children: React.ReactNode;
	style?: TextStyle;
}

export const CardTitle = withUniwind(({ children, style }: CardTitleProps) => {
	return (
		<Text
			variant="title"
			style={[
				{
					marginBottom: 4,
				},
				style,
			]}
		>
			{children}
		</Text>
	);
});

interface CardDescriptionProps {
	children: React.ReactNode;
	style?: TextStyle;
}

export const CardDescription = withUniwind(
	({ children, style }: CardDescriptionProps) => {
		return (
			<Text variant="caption" style={[style]}>
				{children}
			</Text>
		);
	}
);

interface CardContentProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const CardContent = withUniwind(
	({ children, style }: CardContentProps) => {
		return <View style={[style]}>{children}</View>;
	}
);

interface CardFooterProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const CardFooter = withUniwind(
	({ children, style }: CardFooterProps) => {
		return (
			<View
				style={[
					{
						marginTop: 16,
						flexDirection: "row",
						gap: 8,
					},
					style,
				]}
			>
				{children}
			</View>
		);
	}
);
