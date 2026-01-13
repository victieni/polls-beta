import React, { ComponentProps } from "react";
import { Icon, Text, View } from "../ui";
import { Omega } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { useCSSVariable, useUniwind } from "uniwind";

export default function Void({
	msg,
	className,
	...props
}: { msg: string } & ComponentProps<typeof View>) {
	const muted = useColor("muted");

	return (
		<View
			{...props}
			className={`${className} gap-y-2 items-center justify-center`}
		>
			<Icon
				name={Omega}
				size={100}
				strokeWidth={5}
				className="text-primary size-50"
				color={muted}
			/>
			<Text variant="title" className="font-medium text-muted font-mono">
				{msg}
			</Text>
		</View>
	);
}
