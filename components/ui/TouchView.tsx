import { Icon } from "@/components/ui/icon";
import { ButtonSpinner, SpinnerVariant } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { useColor } from "@/hooks/useColor";
import { CORNERS, FONT_SIZE, HEIGHT } from "@/theme/globals";
import * as Haptics from "expo-haptics";
import { LucideProps } from "lucide-react-native";
import { forwardRef } from "react";
import {
	Pressable,
	TextStyle,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
	ViewStyle,
} from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { withUniwind } from "uniwind";

export type ButtonVariant =
	| "default"
	| "destructive"
	| "success"
	| "outline"
	| "secondary"
	| "ghost"
	| "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends Omit<TouchableOpacityProps, "style"> {
	label?: string;
	children?: React.ReactNode;
	animation?: boolean;
	haptic?: boolean;
	icon?: React.ComponentType<LucideProps>;
	onTouch?: () => void;
	variant?: ButtonVariant;
	size?: ButtonSize;
	disabled?: boolean;
	loading?: boolean;
	loadingVariant?: SpinnerVariant;
	style?: ViewStyle | ViewStyle[];
	textStyle?: TextStyle;
}

export const Button = withUniwind(
	forwardRef<View, ViewProps>(
		(
			{
				children,
				onTouch,
				animation = true,
				haptic = true,
				style,
				...props
			},
			ref
		) => {
			const primaryColor = useColor("primary");
			const primaryForegroundColor = useColor("primaryForeground");
			const secondaryColor = useColor("secondary");
			const secondaryForegroundColor = useColor("secondaryForeground");
			const destructiveColor = useColor("red");
			const destructiveForegroundColor = useColor("destructiveForeground");
			const greenColor = useColor("green");
			const borderColor = useColor("border");

			// Animation values for liquid glass effect
			const scale = useSharedValue(1);
			const brightness = useSharedValue(1);

			const getButtonStyle = (): ViewStyle => {
				const baseStyle: ViewStyle = {
					borderRadius: CORNERS,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				};
			};

			const getButtonTextStyle = (): TextStyle => {
				const baseTextStyle: TextStyle = {
					fontSize: FONT_SIZE,
					fontWeight: "500",
				};
			};

			const getColor = (): string => {
				switch (variant) {
					case "destructive":
						return destructiveForegroundColor;
					case "success":
						return destructiveForegroundColor;
					case "outline":
						return primaryColor;
					case "secondary":
						return secondaryForegroundColor;
					case "ghost":
						return primaryColor;
					case "link":
						return primaryColor;
					default:
						return primaryForegroundColor;
				}
			};


			// Trigger haptic feedback
			const triggerHapticFeedback = () => {
				if (haptic && !disabled && !loading) {
					if (process.env.EXPO_OS === "ios") {
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
					}
				}
			};

			// Improved animation handlers for liquid glass effect
			const handlePressIn = (ev?: any) => {
				"worklet";
				// Trigger haptic feedback
				triggerHapticFeedback();

				// Scale up with bouncy spring animation
				scale.value = withSpring(1.05, {
					damping: 15,
					stiffness: 400,
					mass: 0.5,
				});

				// Slight brightness increase for glass effect
				brightness.value = withSpring(1.1, {
					damping: 20,
					stiffness: 300,
				});

				// Call original onPressIn if provided
				props.onPressIn?.(ev);
			};

			const handlePressOut = (ev?: any) => {
				"worklet";
				// Return to original size with smooth spring
				scale.value = withSpring(1, {
					damping: 20,
					stiffness: 400,
					mass: 0.8,
					overshootClamping: false,
				});

				// Return brightness to normal
				brightness.value = withSpring(1, {
					damping: 20,
					stiffness: 300,
				});

				// Call original onPressOut if provided
				props.onPressOut?.(ev);
			};

			// Handle actual press action
			const handlePress = () => {
				if (onTouch && !disabled && !loading) {
					onTouch();
				}
			};

			// Handle press for TouchableOpacity (non-animated version)
			const handleTouchablePress = () => {
				triggerHapticFeedback();
				handlePress();
			};

			// Animated styles using useAnimatedStyle
			const animatedStyle = useAnimatedStyle(() => {
				return {
					transform: [{ scale: scale.value }],
					opacity: brightness.value * (disabled ? 0.5 : 1),
				};
			});

			// Extract flex value from style prop
			const getFlexFromStyle = () => {
				if (!style) return null;

				const styleArray = Array.isArray(style) ? style : [style];

				// Find the last occurrence of flex (in case of multiple styles with flex)
				for (let i = styleArray.length - 1; i >= 0; i--) {
					const s = styleArray[i];
					if (s && typeof s === "object" && "flex" in s) {
						return s.flex;
					}
				}
				return null;
			};

			// Alternative simpler solution - replace flex with alignSelf
			const getPressableStyle = (): ViewStyle => {
				const flexValue = getFlexFromStyle();
				// If flex: 1 is applied, use alignSelf: 'stretch' instead to only affect width
				return flexValue === 1
					? {
							flex: 1,
							alignSelf: "stretch",
					  }
					: flexValue !== null
					? {
							flex: flexValue,
							maxHeight: size === "sm" ? 44 : size === "lg" ? 54 : HEIGHT,
					  }
					: {};
			};

			// Updated getStyleWithoutFlex function
			const getStyleWithoutFlex = () => {
				if (!style) return style;

				const styleArray = Array.isArray(style) ? style : [style];
				return styleArray.map((s) => {
					if (s && typeof s === "object" && "flex" in s) {
						const { flex, ...restStyle } = s;
						return restStyle;
					}
					return s;
				});
			};

			const buttonStyle = getButtonStyle();
			const finalTextStyle = getButtonTextStyle();
			const contentColor = getColor();
			const iconSize = getIconSize();
			const styleWithoutFlex = getStyleWithoutFlex();

			return (
				<View
					ref={ref}
					onTouch={handlePress}
					onPressIn={handlePressIn}
					onPressOut={handlePressOut}
					disabled={disabled || loading}
					style={getPressableStyle()}
					{...props}
				>
					<Animated.View style={[animatedStyle, buttonStyle, styleWithoutFlex]}>
						{loading ? (
							<ButtonSpinner
								size={size}
								variant={loadingVariant}
								color={contentColor}
							/>
						) : typeof children === "string" ? (
							<View
								style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
							>
								{icon && (
									<Icon name={icon} color={contentColor} size={iconSize} />
								)}
								<Text style={[finalTextStyle, textStyle]}>{children}</Text>
							</View>
						) : (
							<View
								style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
							>
								{icon && (
									<Icon name={icon} color={contentColor} size={iconSize} />
								)}
								{children}
							</View>
						)}
					</Animated.View>
				</View>
			);
		}
	)
);

// Add display name for better debugging
Button.displayName = "Button";
