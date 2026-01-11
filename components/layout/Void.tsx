import React, { ComponentProps } from "react";
import { Icon, Text, View } from "../ui";
import { Omega } from "lucide-react-native";

export default function Void({
	msg,
	className,
	...props
}: { msg: string } & ComponentProps<typeof View>) {
	return (
		<View
			{...props}
			className={`${className} gap-y-3 items-center justify-center`}
		>
			<Icon name={Omega} size={40} colorClassName="text-primary" />
			<Text variant="body" className="font-medium text-muted-foreground">
				{msg}
			</Text>
		</View>
	);
}
