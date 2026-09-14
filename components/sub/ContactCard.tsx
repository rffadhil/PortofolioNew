/** @format */

import React from "react";

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  meta?: string;
  badge?: string;
  href?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
  actionLabel?: string;
}

const ContactCard = ({
  icon,
  label,
  value,
  meta,
  badge,
  href,
  onAction,
  actionIcon,
  actionLabel,
}: ContactCardProps) => {
  const content = (
    <div className="flex items-center justify-between w-full gap-3">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 shrink-0 rounded-xl bg-[#0300145e] border border-[#7042f861] flex items-center justify-center text-purple-300 group-hover:text-cyan-300 group-hover:border-cyan-400/40 transition-colors">
          {icon}
        </div>
        <div className="min-w-0 text-left">
          <p className="text-[11px] tracking-wide uppercase text-gray-400">
            {label}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[15px] font-medium text-gray-200 truncate group-hover:text-cyan-300 transition-colors">
              {value}
            </p>
            {badge && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-cyan-300 whitespace-nowrap">
                {badge}
              </span>
            )}
          </div>
          {meta && <p className="text-[12px] text-gray-500 truncate">{meta}</p>}
        </div>
      </div>

      {onAction ? (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onAction();
          }}
          aria-label={actionLabel}
          className="p-2 rounded-lg bg-[#0300145e] border border-[#7042f861] text-gray-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors shrink-0"
        >
          {actionIcon}
        </button>
      ) : href ? (
        <span className="text-gray-500 group-hover:text-cyan-300 transition-colors shrink-0">
          {actionIcon}
        </span>
      ) : null}
    </div>
  );

  const className =
    "group relative w-full rounded-2xl bg-[#0300145e] border border-[#7042f861] p-4 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_24px_rgba(112,66,248,0.25)] hover:-translate-y-0.5";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
};

export default ContactCard;
