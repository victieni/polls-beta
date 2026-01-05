import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { UButton, UCard, UIcon, UText, UView } from "@/components/uniwind";
import { useColor } from "@/hooks/useColor";
import { LockKeyhole, Terminal } from "lucide-react-native";

export default function HomeScreen() {
	const green = useColor("green");
	const muted = useColor("muted");

	return (
		<UView
			style={{
				flex: 1,
				gap: 16,
				padding: 24,
				justifyContent: "center",
			}}
		>
			<UText
				variant="heading"
				style={{
					textAlign: "center",
				}}
			>
				Built with ❤️ by BNA
			</UText>

			<UView
				style={{
					marginBottom: 20,
				}}
			>
				<UCard>
					<UView
						style={{
							gap: 8,
							marginBottom: 16,
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<UIcon name={Terminal} />

						<UText
							variant="body"
							style={{
								fontWeight: "600",
							}}
						>
							Add Components
						</UText>
					</UView>
					<UText className="text-xs text-center font-medium text-red-500">
						This is Uniwind
					</UText>
					<UView
						style={{
							backgroundColor: muted,
							paddingHorizontal: 16,
							paddingVertical: 12,
							borderRadius: 8,
							marginBottom: 16,
							minWidth: "100%",
						}}
					>
						<UText
							variant="caption"
							style={{
								color: green,
								fontFamily: "monospace",
								fontSize: 16,
								textAlign: "center",
							}}
						>
							npx bna-ui add avatar
						</UText>
					</UView>
					<UText
						variant="caption"
						style={{
							textAlign: "center",
							opacity: 0.7,
						}}
					>
						Add components with a single command
					</UText>
				</UCard>
			</UView>

			<Link asChild href="/sheet">
				<UButton
					// variant="secondary"
					size="sm"
					className="bg-green-500 w-52 mx-auto line-clamp-1 rounded-3xl"
				>
					Open Components Sheet
				</UButton>
			</Link>

			<Link href="/auth" asChild>
				<UButton size="icon" variant="outline" className="">
					<Icon name={LockKeyhole} />
				</UButton>
			</Link>
		</UView>
	);
}
