import { Suspense } from "react";
import { SuccessPage } from "./spage";
import { Loading } from "@/library/miscel/loading";

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <SuccessPage />
        </Suspense>
    );
}