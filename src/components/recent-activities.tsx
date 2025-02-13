import { Activity } from "lucide-react"

const activities = [
    { id: 1, description: "New student registered", time: "2 minutes ago" },
    { id: 2, description: "Teacher updated class schedule", time: "1 hour ago" },
    { id: 3, description: "New assignment added", time: "3 hours ago" },
    { id: 4, description: "Grades updated for Class 10", time: "5 hours ago" },
    { id: 5, description: "New student registered", time: "1 day ago" },
    { id: 6, description: "Teacher updated class schedule", time: "2 days ago" },
    { id: 7, description: "New assignment added", time: "3 days ago" },
    { id: 8, description: "Grades updated for Class 10", time: "5 days ago" },
]

export function RecentActivities() {
    return (
        <div className="space-y-8">
            {activities.map((activity) => (
                <div key={activity.id} className="flex items-center">
                    <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.description}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}