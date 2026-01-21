import { getInfiniteUsers } from "@/lib/functions/user.functions";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	ComboboxTrigger,
	ComboboxValue,
	OptionType,
	Text,
	View,
} from "./ui";
import Void from "./layout/Void";
import { AvoidKeyboard } from "./ui/avoid-keyboard";

export default function UsersCombobox({
	placeholder,
	selectAction,
}: {
	placeholder?: string;
	selectAction: Dispatch<SetStateAction<string>>;
}) {
	const { data: users } = useSuspenseInfiniteQuery({
		...getInfiniteUsers({ limit: 0 }),
		select: (data) => data.pages.flatMap((u) => u.users),
	});
	const [value, setValue] = useState<OptionType | null>(null);

	console.log("selected", value);

	return (
		<Combobox value={value} onValueChange={setValue}>
			<ComboboxTrigger>
				<ComboboxValue placeholder={placeholder ?? "Select user..."} />
			</ComboboxTrigger>

			<ComboboxContent>
				<ComboboxInput placeholder="Search by name..." />

				{/* <AvoidKeyboard /> */}
				<ComboboxList>
					<ComboboxEmpty>
						<Void msg="No user found😢." />
					</ComboboxEmpty>

					{users.map((user) => (
						<ComboboxItem
							key={user.id}
							value={user.id}
							onSelect={(v) => selectAction(v.value)}
							searchValue={`${user.fname} ${user.lname} ${user.username}`}
						>{`@${user.fname} ${user.lname}`}</ComboboxItem>
					))}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}
