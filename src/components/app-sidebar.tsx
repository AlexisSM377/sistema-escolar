"use client"

import * as React from "react"
import {
  BookOpenIcon,
  CalendarRangeIcon,
  GraduationCapIcon,
  GroupIcon,
  HomeIcon,
  NotebookPenIcon,
  UserPlusIcon,
  UsersIcon,
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
      url: "/admin",
      icon: HomeIcon,
      isActive: true
    },
    {
      title: "Usuarios",
      url: "/admin/usuarios",
      icon: UsersIcon,
    },
    {
      title: "Carreras",
      url: "/admin/carreras",
      icon: GraduationCapIcon,
    },
    {
      title: "Grupos",
      url: "/admin/grupos",
      icon: GroupIcon,
    },
    {
      title: "Materias",
      url: "/admin/materias",
      icon: BookOpenIcon,
      isActive: true,
      items: [
        {
          title: "Materias por carrera",
          url: "/admin/materia-nivel",
        }
      ]
    },
    {
      title: "Planes de estudio",
      url: "/admin/planes",
      icon: NotebookPenIcon,
    },
    {
      title: "Cuatrimestres",
      url: "/admin/cuatrimestres",
      icon: CalendarRangeIcon,
    },
    {
      title: "Asignación de profesores",
      url: "/admin/profesor",
      icon: UsersIcon,
    },
    {
      title: "Asignacion de alumnos",
      url: "/admin/alumnos",
      icon: UserPlusIcon
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
