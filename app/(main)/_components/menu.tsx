"use client";

import { Id } from "@/convex/_generated/dataModel";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface MenuProps {
    documentId: Id<"documents">;
}

export const Menu = ({ documentId }: MenuProps) => {
    const router = useRouter();
    const { user } = useUser();

    const archive = useMutation(api.documents.archive);

    const onArchive = () => {
        const promise = archive({ id: documentId });

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash!",
            error: "Failed to archive note.",
        });

        router.push("/documents");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
        </DropdownMenu>
    );
};
