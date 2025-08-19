"use client";
import {
  deleteProjectAction,
  updateProjectNameAction,
} from "@/app/api/chat/actions";
import { appStore } from "@/app/store";
import { Project } from "app-types/chat";
import { Loader, PencilLine, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { type PropsWithChildren, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { safe } from "ts-safe";
import { Button } from "ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "ui/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/dialog";

import { Input } from "ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "ui/popover";
import { useTranslations } from "next-intl";

type Props = PropsWithChildren<{
  project: Pick<Project, "id" | "name">;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "end" | "center";
}>;

export function ProjectDropdown({ project, children, side, align }: Props) {
  const router = useRouter();
  const t = useTranslations("Chat.Project");
  const currentProjectId = appStore((state) => state.currentProjectId);

  const [open, setOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    safe()
      .watch(() => setIsDeleting(true))
      .ifOk(() => deleteProjectAction(project.id))
      .watch(() => setIsDeleting(false))
      .watch(({ isOk, error }) => {
        if (isOk) {
          toast.success(t("projectDeleted"));
        } else {
          toast.error(error.message || t("failedToDeleteProject"));
        }
      })
      .ifOk(() => {
        if (currentProjectId === project.id) {
          router.push("/");
        }
        mutate("threads");
        mutate("projects");
      })
      .unwrap();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-[220px]" side={side} align={align}>
        <Command>
          <div className="flex items-center gap-2 px-2 py-1 text-sm pt-2 font-semibold">
            {t("project")}
          </div>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem className="cursor-pointer p-0">
                <UpdateProjectNameDialog
                  initialName={project.name}
                  onUpdated={() => setOpen(false)}
                  projectId={project.id}
                >
                  <div className="flex items-center gap-2 w-full px-2 py-1 rounded">
                    <PencilLine className="text-foreground" />
                    {t("renameProject")}
                  </div>
                </UpdateProjectNameDialog>
              </CommandItem>
              <CommandItem disabled={isDeleting} className="cursor-pointer p-0">
                <div
                  className="flex items-center gap-2 w-full px-2 py-1 rounded"
                  onClick={handleDelete}
                >
                  <Trash className="text-destructive" />
                  <span className="text-destructive">{t("deleteProject")}</span>
                  {isDeleting && (
                    <Loader className="ml-auto h-4 w-4 animate-spin" />
                  )}
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function UpdateProjectNameDialog({
  initialName,
  children,
  onUpdated,
  projectId,
}: PropsWithChildren<{
  initialName: string;
  onUpdated: (name: string) => void;
  projectId: string;
}>) {
  const t = useTranslations("Chat.Project");
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(initialName);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    safe(() => setIsLoading(true))
      .map(() => updateProjectNameAction(projectId, name))
      .watch(() => setIsLoading(false))
      .ifOk(() => setIsOpen(false))
      .ifOk(() => toast.success(t("projectUpdated")))
      .ifOk(() => onUpdated(name))
      .ifOk(() => mutate("projects"))
      .ifFail((error) => toast.error(error.message || t("failedToUpdateProject")));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("renameProject")}</DialogTitle>
          <DialogDescription>
            {t("enterNameForNewProject")}
          </DialogDescription>
        </DialogHeader>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("projectName")}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t("Common.cancel")}</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={isLoading || !name.trim()}>
            {isLoading && <Loader className="h-4 w-4 animate-spin mr-2" />}
            {t("Common.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
