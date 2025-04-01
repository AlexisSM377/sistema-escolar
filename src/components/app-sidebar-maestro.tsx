"use client"

import * as React from "react"
import {
    BookOpenIcon,
    ClipboardListIcon,
    GraduationCapIcon,
    GroupIcon,
    HomeIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
    },
    navMain: [
        {
            title: "Inicio",
            url: "/maestro",
            icon: HomeIcon,
            isActive: true
        },
        {
            title: "Mis Grupos",
            url: "/maestro",
            icon: GroupIcon,
        },
        {
            title: "Alumnos",
            url: "/maestro",
            icon: GraduationCapIcon,
        },
        {
            title: "Mis Materias",
            url: "/maestro/materias",
            icon: BookOpenIcon,
        },
        {
            title: "Calificaciones",
            url: "/maestro",
            icon: ClipboardListIcon,
        },
    ],
}

export function AppSidebarMaestro({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                                    <Image
                                        src="/logo.webp"
                                        alt="Logo"
                                        width={32}
                                        height={32}

                                    />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Sistema Escolar</span>
                                    <span className="truncate text-xs">Escuela</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} /> */}
                {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
