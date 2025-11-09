import { NavItem } from "./NavItem";


const navigationItems = [
  { href: "/", label: "Dashboard", description: "Overview of your workspace" },
  { href: "/products", label: "Products", description: "Manage your product catalog" },
  { href: "/orders", label: "Orders", description: "Track customer orders" },
  { href: "/reports", label: "Reports", description: "Insights and analytics" },
];

export function Navigation () {
  return (
    <nav className="w-72 flex-col border-r border-gray-200 bg-white lg:flex">
      <div className="border-b border-gray-200 px-6 py-5">
        <span className="text-base font-semibold tracking-tight text-gray-900">Next Patterns</span>
        <p className="mt-1 text-sm text-gray-500">Design system playground</p>
      </div>
      <ul className="flex-1 space-y-1 px-2 py-4">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <NavItem {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

