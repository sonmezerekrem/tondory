import {MobileRefreshButton} from "@/components/mobile-refresh-button";
import { ReactNode } from "react";

type Props = {
    title: string,
    subtitle: string,
    rightElement?: ReactNode,
}

export default function AppTitle({title, subtitle, rightElement}: Props) {
    return (
        <div className="flex items-start justify-between">
            <div>
                <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                <p className="text-sm text-muted-foreground">
                    {subtitle}
                </p>
            </div>
            {rightElement || <MobileRefreshButton/>}
        </div>
    )
}