import { Button, Card, Icon, Link, Text, View } from "@/components/ui";
import { useColor } from "@/hooks/useColor";
import { Terminal } from "lucide-react-native";

export default function HomeScreen() {
	const green = useColor("green");
	const muted = useColor("muted");

	return (
		<View
			style={{
				flex: 1,
				gap: 16,
				padding: 24,
				justifyContent: "center",
			}}
		>
			<Text
				variant="heading"
				style={{
					textAlign: "center",
				}}
			>
				Built with ❤️ by BNA
			</Text>

			<View
				style={{
					marginBottom: 20,
				}}
			>
				<Card>
					<View
						style={{
							gap: 8,
							marginBottom: 16,
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Icon name={Terminal} />

						<Text
							variant="body"
							style={{
								fontWeight: "600",
							}}
						>
							Add Components
						</Text>
					</View>
					<Text className="text-xs text-center font-medium text-red-500">
						This is Uniwind
					</Text>
					<View
						style={{
							backgroundColor: muted,
							paddingHorizontal: 16,
							paddingVertical: 12,
							borderRadius: 8,
							marginBottom: 16,
							minWidth: "100%",
						}}
					>
						<Text
							variant="caption"
							style={{
								color: green,
								fontFamily: "monospace",
								fontSize: 16,
								textAlign: "center",
							}}
						>
							npx bna-ui add avatar
						</Text>
					</View>
					<Text
						variant="caption"
						style={{
							textAlign: "center",
							opacity: 0.7,
						}}
					>
						Add components with a single command
					</Text>
				</Card>
			</View>

			<Link asChild href="/sheet">
				<Button
					// variant="secondary"
					size="sm"
					className="bg-green-500 w-52 mx-auto line-clamp-1 rounded-3xl"
				>
					Open Components Sheet
				</Button>
			</Link>
		</View>
	);
}
