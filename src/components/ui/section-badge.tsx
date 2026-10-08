interface SectionBadgeProps {
  children: React.ReactNode;
}

export default function SectionBadge({ children }: SectionBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-blue-500/30">
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
      <span className="text-sm text-gray-300">{children}</span>
    </div>
  );
}
