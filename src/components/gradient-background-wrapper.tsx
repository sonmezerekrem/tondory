type Props = {
    children: React.ReactNode
}
export default function GradientBackgroundWrapper({children}: Props) {
    return (
        <div className="min-h-screen w-full bg-white relative">
            {/* Gradient Grid Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "white",
                    backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(14,165,233,0.15) 0%, rgba(59,130,246,0.05) 40%, transparent 70%)
          `,
                    backgroundSize: "40px 40px, 40px 40px, 100% 100%",
                }}
            />

            {/* Dark mode version */}
            <div
                className="absolute inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
                style={{
                    background: "#0f172a",
                    backgroundImage: `
            linear-gradient(to right, rgba(148,163,184,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148,163,184,0.1) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(56,189,248,0.1) 0%, rgba(59,130,246,0.05) 40%, transparent 70%)
          `,
                    backgroundSize: "40px 40px, 40px 40px, 100% 100%",
                }}
            />

            {/* Content wrapper */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}