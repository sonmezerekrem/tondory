import {HugeiconsIcon} from "@hugeicons/react";
import {Loading02Icon} from "@hugeicons/core-free-icons";

export default function Loading() {
    return (
        <div className="flex h-screen justify-center items-center">
            <HugeiconsIcon icon={Loading02Icon} size={32} className="mr-2 animate-spin text-primary" />
        </div>
    )
}