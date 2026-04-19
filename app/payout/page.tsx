import { Suspense } from "react";
import { PayoutPage } from "./spage";
import { Loading } from "@/library/miscel/loading";

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <PayoutPage />
        </Suspense>
    );
}