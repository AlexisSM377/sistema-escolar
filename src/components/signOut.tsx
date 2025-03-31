"use client";

import { logout } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import React, { useTransition } from "react";


export default function SignOut() {
    const [isPending, startTransition] = useTransition();
    const onSubmit = async () => {
        startTransition(async () => {
            await logout();
        });
    };

    return (
        <form action={onSubmit} className="w-full flex items-center gap-2">
            <Button
                className="w-full flex items-center gap-2"
                variant="default"
            >
                Cerrar sesión{" "}
                <LoaderCircle
                    className={cn("animate-spin", { hidden: !isPending })}
                />
            </Button>
        </form>
    );
}
