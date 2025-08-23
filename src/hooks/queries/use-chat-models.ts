import { appStore } from "@/app/store";
import { fetcher } from "lib/utils";
import useSWR from "swr";

export const useChatModels = () => {
  return useSWR<
    {
      provider: string;
      models: {
        name: string;
        isToolCallUnsupported: boolean;
      }[];
    }[]
  >("/api/chat/models", fetcher, {
    dedupingInterval: 60_000 * 5,
    revalidateOnFocus: false,
    fallbackData: [],
    onSuccess: (data) => {
      const status = appStore.getState();
      if (!status.chatModel) {
        // Prefer Google Gemini models for new users when available
        let provider = data[0].provider;
        let model = data[0].models[0].name;

        const googleEntry = data.find((d) => d.provider === "google");
        if (googleEntry && googleEntry.models.length > 0) {
          // preferred names in order
          const preferred = [
            "gemini-2.5-flash-lite",
            "gemini-2.5-flash",
            "gemini-2.0-flash-lite",
          ];
          const found = preferred
            .map((name) => googleEntry.models.find((m) => m.name === name))
            .find(Boolean);
          if (found) {
            provider = "google";
            model = found!.name;
          } else {
            // use the first google model if none of the preferred names are present
            provider = "google";
            model = googleEntry.models[0].name;
          }
        }

        appStore.setState({ chatModel: { provider, model } });
      }
    },
  });
};
