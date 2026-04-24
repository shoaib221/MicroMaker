import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export function useDatePicker() {
	const [date, setDate] = useState<Date | undefined>();

	const Tag = () => {


		return (
			<span className="">
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline">
							{date ? format(date, "PPP") : "Pick a date"}
						</Button>
					</PopoverTrigger>

					<PopoverContent className="w-auto p-0 bg-(--color1) border shadow-md rounded-md">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}

						/>
					</PopoverContent>
				</Popover>
			</span>
		);

	}

	return { date, DatePicker: Tag, setDate };
}
