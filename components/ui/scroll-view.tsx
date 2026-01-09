import { forwardRef } from "react";
import { ScrollView as RNScrollView, ScrollViewProps } from "react-native";
import { withUniwind } from "uniwind";

export const ScrollView = withUniwind(
	forwardRef<RNScrollView, ScrollViewProps>(({ style, ...otherProps }, ref) => {
		return (
			<RNScrollView
				ref={ref}
				style={[{ backgroundColor: "transparent" }, style]}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				{...otherProps}
			/>
		);
	})
);
