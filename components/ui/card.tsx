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

export function Card({ children, style }: CardProps) {
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
}

const UCard = withUniwind(Card);

interface CardHeaderProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export function CardHeader({ children, style }: CardHeaderProps) {
	return <View style={[{ marginBottom: 8 }, style]}>{children}</View>;
}
const UCardHeader = withUniwind(CardHeader);

interface CardTitleProps {
	children: React.ReactNode;
	style?: TextStyle;
}

export function CardTitle({ children, style }: CardTitleProps) {
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
}
const UCardTitle = withUniwind(CardTitle);

interface CardDescriptionProps {
	children: React.ReactNode;
	style?: TextStyle;
}

export function CardDescription({ children, style }: CardDescriptionProps) {
	return (
		<Text variant="caption" style={[style]}>
			{children}
		</Text>
	);
}
const UCardDescription = withUniwind(CardDescription);

interface CardContentProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export function CardContent({ children, style }: CardContentProps) {
	return <View style={[style]}>{children}</View>;
}
const UCardContent = withUniwind(CardContent);

interface CardFooterProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export function CardFooter({ children, style }: CardFooterProps) {
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
const UCardFooter = withUniwind(CardFooter);

/**
 * @uniwind
 */

export {
	UCardDescription,
	UCardContent,
	UCardFooter,
	UCard,
	UCardTitle,
	UCardHeader,
};
