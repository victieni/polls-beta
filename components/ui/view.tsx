import { forwardRef } from "react";
import { View as RNView, type ViewProps } from "react-native";
import { withUniwind } from "uniwind";

export const View = withUniwind(
	forwardRef<RNView, ViewProps>(({ style, ...otherProps }, ref) => {
		return (
			<RNView
				ref={ref}
				style={[{ backgroundColor: "transparent" }, style]}
				{...otherProps}
			/>
		);
	})
);
