

// ---------QUERY & MUTATION KEYS---------- //
import {getAllGlobalSettings} from "@/services/global-setting/queries";
import {useQuery} from "@tanstack/react-query";

export const globalSettingQueryKeys = {
    globalSettingsKey: ["global-settings-list"],
};

// --------------- QUERIES HOOKS --------------- //

export const useGlobalSettings = () => {
    return useQuery({
        queryKey: globalSettingQueryKeys.globalSettingsKey,
        queryFn: () => getAllGlobalSettings(),
    });
};
