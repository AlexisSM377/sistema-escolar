import { AppSidebarMaestro } from "@/components/app-sidebar-maestro"
import { ModeToggle } from "@/components/toggle-theme"
import {
    Breadcrumb,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import readUserSession from "@/lib/actions"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const { data } = await readUserSession()

    if (!data.user) {
        return redirect("/login?role=maestro")
    }

    return (
        <SidebarProvider>
            <AppSidebarMaestro />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <h1>
                                Nombre de la pagina a la que se esta navegando
                            </h1>
                        </Breadcrumb>
                    </div>
                    <div className="flex justify-end items-end flex-1 gap-4 px-4">

                        <ModeToggle />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
