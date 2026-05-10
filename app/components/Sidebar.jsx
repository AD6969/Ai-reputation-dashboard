import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
}) {

  const items = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Reviews",
      icon: <MessageSquare size={18} />,
    },
    {
      name: "Analytics",
      icon: <BarChart3 size={18} />,
    },
    {
      name: "Settings",
      icon: <Settings size={18} />,
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">

      <h2 className="text-2xl font-bold text-blue-600 mb-10">
        OnShore AI
      </h2>

      <div className="space-y-3">

        {items.map((item) => (

          <div
            key={item.name}
            onClick={() =>
              setActiveTab(item.name)
            }
            className={`sidebar-item
              ${
                activeTab === item.name
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700"
              }
            `}
          >

            {item.icon}

            <span>{item.name}</span>

          </div>

        ))}

      </div>

    </div>
  );
}

