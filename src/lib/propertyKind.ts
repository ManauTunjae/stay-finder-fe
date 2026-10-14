import { Building, House, type LucideIcon } from "lucide-react";

type KindInfo = {
  label: string;
  icon: LucideIcon;
};

export const kindInfo: Record<string, KindInfo> = {
  apartment: { label: "Lägenhet", icon: Building },
  villa: { label: "Villa", icon: House },
};

export const defaultKind: KindInfo = { label: "Boende", icon: House };
