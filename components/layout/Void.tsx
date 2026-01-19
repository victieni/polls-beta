import { useColor } from "@/hooks/useColor";
import { Omega } from "lucide-react-native";
import React, { ComponentProps } from "react";
import { Icon, Text, View } from "../ui";

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
			<Text
				variant="caption"
				className="font-medium text-muted-foreground font-mono text-center"
			>
				{msg}
			</Text>
		</View>
	);
}
