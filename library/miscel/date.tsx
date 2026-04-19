import { format } from "date-fns";

export function DateDisplay({ date }: { date: Date }) {
    return (
        <span>
            {format(date, "dd/MM/yyyy")}
        </span>
    );
}
