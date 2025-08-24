"use client"

import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel"
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface RenameDialogProps {
    documentId: Id<"documents">;
    children: React.ReactNode;
    initialTitle: string
}

export const RenameDialog = ({ documentId, children, initialTitle }: RenameDialogProps) => {
    const update = useMutation(api.documents.updateByID)
    const [isUpdating, setIsUpdating] = useState(false)
    const [title, setTitle] = useState(initialTitle)
    const [open, setOpen] = useState(false) //Nen dung vi ta can phai submit form

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsUpdating(true)

        update({ id: documentId, title: title.trim() || "Untitiled" })
            .catch(() => toast.error("Something went wrong"))
            .then(() => toast.success("Rename complete"))
            .finally(() => {
                setIsUpdating(false)
                setOpen(false)
            })
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Rename Docuemnt</DialogTitle>
                        <DialogDescription>
                            Enter a new name for this document
                        </DialogDescription>
                    </DialogHeader>
                    <div className="my-4">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Document name"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            disabled={isUpdating}
                            onClick={(e) => {
                                e.stopPropagation()
                                setOpen(false)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isUpdating}
                            onClick={(e) => e.stopPropagation()}>
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}