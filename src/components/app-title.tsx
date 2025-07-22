import {MobileRefreshButton} from "@/components/mobile-refresh-button";

type Props = {
    title: string,
    subtitle: string,
}

export default function AppTitle({title, subtitle}: Props) {
    return (
        <div className="flex items-start justify-between">
            <div>
                <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                <p className="text-sm text-muted-foreground">
                    {subtitle}
                </p>
            </div>
            <MobileRefreshButton/>
        </div>
    )
}