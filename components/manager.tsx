"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Filter, Search, User } from "lucide-react"

// Mock data for translators - just showing a few for the demo
const initialTranslators = [
  {
    id: 1,
    name: "Emma Johnson",
    language: "Spanish",
    status: "occupied",
    project: "Marketing Website Localization",
    deadline: "2023-05-10",
    progress: 85,
  },
  {
    id: 2,
    name: "Michael Chen",
    language: "Mandarin",
    status: "free",
    project: null,
    deadline: null,
    progress: null,
  },
  {components
ui
table.tsx
,
    project: "Product Documentation",
    deadline: "2023-05-15",
    progress: 45,
  },
  {
    id: 4,
    name: "Liam Wilson",
    language: "French",
    status: "occupied",
    project: "Mobile App Localization",
    deadline: "2023-05-08",
    progress: 92,
  },
  {
    id: 5,
    name: "Aisha Patel",
    language: "Hindi",
    status: "free",
    project: null,
    deadline: null,
    progress: null,
  },
]

export default function TranslatorsPage() {
  const [translators, setTranslators] = useState(initialTranslators)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Function to mark a translator as finished with their task
  const markAsFinished = (id: number) => {
    setTranslators(
      translators.map((translator) =>
        translator.id === id
          ? {
              ...translator,
              status: "free",
              project: null,
              deadline: null,
              progress: null,
            }
          : translator,
      ),
    )
  }

  // Filter translators based on search query and status filter
  const filteredTranslators = translators.filter((translator) => {
    const matchesSearch =
      translator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      translator.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (translator.project && translator.project.toLowerCase().includes(searchQuery.toLowerCase()))

    if (statusFilter === "all") return matchesSearch
    return matchesSearch && translator.status === statusFilter
  })

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Translator Management</h1>
          <p className="text-muted-foreground">
            Manage translator availability and assignments (showing 5 of ~10,000 translators)
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search translators..."
              className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Status</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="free">Free</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Project</TableHead>
              <TableHead className="hidden md:table-cell">Progress</TableHead>
              <TableHead className="hidden md:table-cell">Deadline</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTranslators.map((translator) => (
              <TableRow key={translator.id}>
                <TableCell className="font-medium">{translator.name}</TableCell>
                <TableCell>{translator.language}</TableCell>
                <TableCell>
                  <Badge variant={translator.status === "free" ? "success" : "secondary"}>
                    {translator.status === "free" ? "Free" : "Occupied"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {translator.project || <span className="text-muted-foreground">-</span>}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {translator.progress ? (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${translator.progress}%` }} />
                      </div>
                      <span className="text-xs">{translator.progress}%</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {translator.deadline ? (
                    new Date(translator.deadline).toLocaleDateString()
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {translator.status === "occupied" ? (
                    <Button size="sm" onClick={() => markAsFinished(translator.id)}>
                      Mark as Finished
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline">
                      Assign Project
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>Showing {filteredTranslators.length} of ~10,000 Translators</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <span className="text-sm">Page 1 of 2,000</span>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

