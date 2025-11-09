import type { FC } from "react";

import clsx from "clsx";
import Link from "next/link";

export interface NavItemProps {
  href: string;
  label: string;
  description?: string;
  className?: string;
}

export const NavItem: FC<NavItemProps> = ({
  href,
  label,
  description,
  className,
}) => {
  return (
    <Link
      href={href}
      className={clsx(
        "block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors",
        "hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2",
        "focus-visible:outline-offset-2 focus-visible:outline-blue-500",
        className
      )}
    >
      <span className="block leading-5">{label}</span>
      {description ? (
        <span className="mt-1 block text-xs text-gray-500">{description}</span>
      ) : null}
    </Link>
  );
};
