"use client";
import { selectProjectByIdAction } from "@/app/api/chat/actions";
import { appStore } from "@/app/store";
import { ProjectDropdown } from "@/components/project-dropdown";
import PromptInput from "@/components/prompt-input";
import { ThreadDropdown } from "@/components/thread-dropdown";
import { useChat } from "@ai-sdk/react";
import { generateUUID } from "lib/utils";

import {
  Loader,
  MoreHorizontal,
  FileUp,
  Pencil,
  MessagesSquare,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import useSWR from "swr";
import { Button } from "ui/button";
import { notImplementedToast } from "ui/shared-toast";
import { Skeleton } from "ui/skeleton";
import { useShallow } from "zustand/shallow";

function FeatureCard({
  title,
  description,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      className="p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors flex-1"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const t = useTranslations("Chat.Project");
  const {
    data: project,
    isLoading,
    mutate: fetchProject,
  } = useSWR(`/projects/${id}`, async () => {
    const project = await selectProjectByIdAction(id as string);
    if (!project) {
      router.push("/");
    }
    return project;
  });

  const router = useRouter();
  const threadId = useMemo(() => generateUUID(), []);

  const [
    appStoreMutate,
    model,
    toolChoice,
    allowedMcpServers,
    allowedAppDefaultToolkit,
  ] = appStore(
    useShallow((state) => [
      state.mutate,
      state.chatModel,
      state.toolChoice,
      state.allowedMcpServers,
      state.allowedAppDefaultToolkit,
    ]),
  );

  const [isCreatingThread, setIsCreatingThread] = useState(false);

  const { input, append, setInput, isLoading: isChatLoading, stop } = useChat({
    id: threadId,
    api: "/api/chat",
    streamProtocol: "text",
    onFinish: () => {
      setIsCreatingThread(false);
      router.push(`/chat/${threadId}`);
    },
    onError: () => {
      setIsCreatingThread(false);
    },
    body: {
      id: threadId,
      chatModel: model,
      toolChoice,
      allowedMcpServers,
      allowedAppDefaultToolkit,
    },
  });

  useEffect(() => {
    if (isChatLoading) {
      setIsCreatingThread(true);
    }
  }, [isChatLoading]);

  useEffect(() => {
    if (project) {
      appStoreMutate({ currentProjectId: project.id });
    }
  }, [project, appStoreMutate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Project not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-w-0 relative h-full ">
      <div className="max-w-3xl mx-auto fade-in animate-in w-full mt-14">
        <div className="px-6 py-6">
          {isLoading ? (
            <Skeleton className="h-10" />
          ) : (
            <div className="flex items-center gap-1">
              <h1 className="text-4xl font-semibold truncate">
                {project?.name}
              </h1>
              <div className="flex-1" />
              <ProjectDropdown
                project={project ?? { id: id as string, name: "" }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="data-[state=open]:bg-secondary!"
                >
                  <MoreHorizontal />
                </Button>
              </ProjectDropdown>
            </div>
          )}
        </div>
        {isCreatingThread && (
          <div className="pb-6 flex flex-col justify-center fade-in animate-in">
            <div className="w-fit rounded-2xl px-6 py-4 flex items-center gap-2">
              <h1 className="font-semibold truncate">{t("creatingChat")}</h1>
              <Loader className="animate-spin" size={16} />
            </div>
          </div>
        )}

        <PromptInput
          input={input}
          append={append}
          setInput={setInput}
          isLoading={isChatLoading}
          onStop={stop}
        />

        <div className="flex my-4 mx-2 gap-4">
          <FeatureCard
            title="Add Files"
            onClick={notImplementedToast}
            description={t("chatInThisProjectCanAccessFileContents")}
            icon={<FileUp size={18} className="text-muted-foreground" />}
          />
          <FeatureCard
            title="Add Instructions"
            description={
              project?.instructions?.systemPrompt ||
              t(
                "writeHowTheChatbotShouldRespondToThisProjectOrWhatInformationItNeeds",
              )
            }
            icon={<Pencil size={18} className="text-muted-foreground" />}
            onClick={notImplementedToast}
          />
        </div>

        {project?.threads && project.threads.length > 0 ? (
          <div className="mt-6 mb-4">
            <h3 className="text-lg font-medium px-4 mb-3 flex items-center gap-2 text-muted-foreground">
              <span>{t("conversationList")}</span>
            </h3>
            <div className="flex flex-col gap-2 px-2">
              {project.threads.map((thread) => (
                <div
                  className="flex gap-1 group/project-thread"
                  key={thread.id}
                >
                  <Link
                    key={thread.id}
                    href={`/chat/${thread.id}`}
                    className="flex w-full min-w-0 items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <MessagesSquare size={16} className="text-primary" />
                    <div className="flex-1 truncate">
                      <div className="font-medium truncate">
                        {thread.title}
                      </div>
                    </div>
                  </Link>
                  <ThreadDropdown
                    threadId={thread.id}
                    beforeTitle={thread.title}
                    onDeleted={fetchProject}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto opacity-0 group-hover/project-thread:opacity-100"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </ThreadDropdown>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !isLoading && (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8">
              <h3 className="text-lg font-medium mb-1">
                {t("noConversationsYet")}
              </h3>
              <p className="text-sm">
                {t("enterNewPromptToStartYourFirstConversation")}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
