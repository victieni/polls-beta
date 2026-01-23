import {
	RegistrationFormData,
	useRegistrationConfigForm,
} from "@/lib/schemas/registration.schema";
import { BookText, Edit3, FileQuestion, Settings2 } from "lucide-react-native";
import React, { ComponentProps, useState } from "react";
import { BottomSheet, Button, Input, Text, useBottomSheet, View } from "../ui";
import { Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
	createRegistration,
	updateRegistration,
} from "@/lib/functions/registration.functions";
import { usePolls } from "@/contexts/polls.context";

export function Main({
	successAction,
	registration,
}: {
	successAction?: () => void;
	registration?: IRegistration;
}) {
	const [validIds, setValidIds] = useState<string>("");

	const poll = usePolls().poll!;
	const { handleSubmit, control, watch } =
		useRegistrationConfigForm(registration);

	const { mutate: update, isPending: isUpdating } =
		useMutation(updateRegistration);
	const { mutate: create, isPending: isCreating } =
		useMutation(createRegistration);

	const submitHandler = (data: RegistrationFormData) => {
		const cleanData: IRegistrationCreate = {
			poll: poll.id,
			...data,
			validRegistrationIds: validIds.split(", "),
		};

		console.log("new reg:", data);

		if (registration) {
			update({ ...registration, ...cleanData }, { onSuccess: successAction });
		} else {
			create(cleanData, { onSuccess: successAction });
		}
	};

	return (
		<View className="flex-1 gap-y-4">
			<Controller
				control={control}
				name="prompt"
				render={({ field, fieldState: { error } }) => (
					<View>
						<Input
							{...field}
							onChangeText={field.onChange}
							error={error?.message}
							icon={FileQuestion}
							label="Prompt"
							placeholder="Registration question..."
							autoCapitalize="sentences"
						/>
						{!!error || (
							<Text variant="caption" className="text-sm pl-5">
								This is a question asking users what you want as their
								registration ID. E.g 'What is your student-ID number?'
							</Text>
						)}
					</View>
				)}
			/>

			<Controller
				control={control}
				name="description"
				render={({ field, fieldState: { error } }) => (
					<Input
						{...field}
						type="textarea"
						onChangeText={field.onChange}
						error={error?.message}
						icon={BookText}
						label="Description"
						placeholder="Enter extra guidance for registration requirements..."
						autoCapitalize="sentences"
					/>
				)}
			/>

			<View>
				<View className="flex-row items-center justify-between">
					<Text variant="subtitle">Auto Verification</Text>
					<Button
					disabled={!validIds}
						size="sm"
						variant="ghost"
						onPress={() => setValidIds("")}
						className="p-0!"
					>
						Clear
					</Button>
				</View>

				<Input
					value={validIds}
					onChangeText={setValidIds}
					type={"textarea"}
					label="Valid Registration IDs"
					// className="h-52 text-foregrounds"
					inputStyle={{ height: 200 }}
					placeholder="Enter comma-separated list of valid registration IDs e.g.(student-IDs) ,std-234, std-24n, std-d24,...'"
				/>
			</View>

			{registration ? (
				<Button
					icon={Edit3}
					disabled={isUpdating}
					loading={isUpdating}
					onPress={handleSubmit(submitHandler, (err) => console.log(err))}
				>
					Edit
				</Button>
			) : (
				<Button
					disabled={isCreating || !watch("prompt")}
					loading={isCreating}
					onPress={handleSubmit(submitHandler, (err) => console.log(err))}
				>
					Set Up
				</Button>
			)}
		</View>
	);
}

const Trigger = ({
	className,
	children,
	registration,
	...props
}: {
	registration?: IRegistration;
} & ComponentProps<typeof Button>) => {
	const { close, open, isVisible } = useBottomSheet();

	return (
		<>
			{children ? (
				<View onTouchStart={open}>{children}</View>
			) : (
				<Button
					{...props}
					icon={Settings2}
					onPress={open}
					className={`${className} `}
				>
					Configure
				</Button>
			)}
			<BottomSheet
				title={registration ? "Edit registration" : "Configure registration"}
				isVisible={isVisible}
				onClose={close}
				snapPoints={[0.8, 0.95]}
			>
				<Main successAction={close} />
			</BottomSheet>
		</>
	);
};

export const RegistrationConfigForm = { Main, Trigger };
