import {HugeiconsIcon} from '@hugeicons/react'

type IconSvgElement = readonly (readonly [string, {
    readonly [key: string]: string | number;
}])[];

type Props = {
    title: string
    subtitle: string
    data?: number
    icon: IconSvgElement
}
export default function DashboardStatCard({title, subtitle, data, icon}: Props) {

    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <HugeiconsIcon icon={icon} size={20} className="text-info"/>
                </div>
                <div>
                    <p className="text-sm font-medium text-foreground">{title}</p>
                    <p className="text-xs text-muted-foreground">{subtitle}</p>
                </div>
            </div>
            <div className="text-2xl font-bold text-primary text-center">
                {data || 0}
            </div>
        </div>
    )
}