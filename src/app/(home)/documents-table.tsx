import { PaginationStatus } from "convex/react"
import { Doc } from "../../../convex/_generated/dataModel"
import { LoaderIcon } from "lucide-react"

interface DocumentsTableProps {
    documents: Doc<"documents">[] | undefined
    loadMore: (numItems: number) => void
    status: PaginationStatus
}

export const DocumentsTable = ({ documents, loadMore, status }: DocumentsTableProps) => {
    return (
        <div className="max-w-screen-xl mx-auto px-16 flex flex-col gap-5">
            {documents === undefined ? (
                <div>
                    <LoaderIcon className="animate-spin text-muted-foreground" />
                </div>
            ) : (
                <div>
                    Loaded
                </div>
            )}
        </div>
    )
}