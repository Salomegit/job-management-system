import { Briefcase } from "lucide-react";

const StatCard = ({ icon, title, value, color, iconColor }) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-900"
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-900"
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-900"
    }
  };

  const iconColorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600"
  };

  return (
    <div className={`${colorClasses[color].bg} ${colorClasses[color].border} border rounded-lg p-6 hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${colorClasses[color].text} opacity-70`}>
            {title}
          </p>
          <p className={`text-3xl font-bold ${colorClasses[color].text} mt-1`}>
            {value}
          </p>
        </div>
        <div className={`${iconColorClasses[iconColor]} opacity-80`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;