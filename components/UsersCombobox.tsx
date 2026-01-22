import { getInfiniteUsers } from "@/lib/functions/user.functions";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useState } from "react";
import Void from "./layout/Void";
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
} from "./ui";

export default function UsersCombobox({
	placeholder,
	selectAction,
	defaultValue,
}: {
	placeholder?: string;
	selectAction: Dispatch<SetStateAction<OptionType | null>>;
	defaultValue: OptionType | null;
}) {
	const { data: users } = useSuspenseInfiniteQuery({
		...getInfiniteUsers({ limit: 0 }),
		select: (data) => data.pages.flatMap((u) => u.users),
	});
	const [value, setValue] = useState<OptionType | null>(defaultValue);

	console.log("selected", value);

	return (
		<Combobox value={value} onValueChange={setValue}>
			<ComboboxTrigger>
				<ComboboxValue placeholder={placeholder ?? "Select user..."} />
			</ComboboxTrigger>

			<ComboboxContent>
				<ComboboxInput placeholder="Search by name..." />

				<ComboboxList>
					<ComboboxEmpty>
						<Void msg="No user found😢." />
					</ComboboxEmpty>

					{users.map((user) => (
						<ComboboxItem
							key={user.id}
							value={user.id}
							onSelect={(v) => selectAction(v)}
							searchValue={`${user.fname} ${user.lname} ${user.username}`}
						>{`@${user.fname} ${user.lname}`}</ComboboxItem>
					))}
				</ComboboxList>
			</ComboboxContent>
			{/* <AvoidKeyboard /> // ! Fix */}
		</Combobox>
	);
}
