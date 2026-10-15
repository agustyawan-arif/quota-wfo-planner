import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';
import {
  Building2,
  Home,
  Plane,
  Sparkles,
  Coffee,
  PartyPopper,
  Armchair,
  Briefcase,
  Laptop,
  Palmtree,
  Compass,
  Waves,
  Monitor,
  CalendarOff,
  Castle,
  Ghost,
  Skull,
  Wand2,
  Moon,
  Bed,
  BatteryCharging
} from 'lucide-react';
import type { AppTheme } from '../components/PlannerControls';

export type CalendarCondition = 'planned' | 'available' | 'leave' | 'holiday' | 'weekend';

export interface ThemeIconSet {
  planned: ComponentType<LucideProps>;
  available: ComponentType<LucideProps>;
  leave: ComponentType<LucideProps>;
  holiday: ComponentType<LucideProps>;
  weekend: ComponentType<LucideProps>;
}

export const THEME_ICONS: Record<AppTheme, ThemeIconSet> = {
  default: {
    planned: Building2,   // WFO: Office building
    available: Home,      // WFH: Home
    leave: Plane,         // Leave: Travel/Flight
    holiday: Sparkles,    // Holiday: Festive sparkles
    weekend: Bed,         // Weekend: Sleep / rebahan ngga ngapa-ngapain
  },
  wfc: {
    planned: Building2,   // WFO: Office building
    available: Coffee,    // WFH / WFC: Cafe coffee cup
    leave: Plane,         // Leave: Vacation flight
    holiday: PartyPopper, // Holiday: Celebration
    weekend: Armchair,    // Weekend: Cozy sofa santai
  },
  wfa: {
    planned: Briefcase,   // WFO: Headquarter briefcase
    available: Laptop,    // WFH / WFA: Nomad laptop
    leave: Palmtree,      // Leave: Tropical beach
    holiday: Compass,     // Holiday: Exploration compass
    weekend: Waves,       // Weekend: Beach ocean waves
  },
  wfo: {
    planned: Building2,   // WFO: Corporate building
    available: Monitor,   // WFH / Flex: Remote screen
    leave: CalendarOff,   // Leave: Scheduled time-off
    holiday: Sparkles,    // Holiday: Official holiday
    weekend: BatteryCharging, // Weekend: Corporate recharge battery
  },
  halloween: {
    planned: Castle,      // WFO: Haunted castle
    available: Ghost,     // WFH / Crypt: Wandering ghost
    leave: Skull,         // Leave: Deep crypt rest
    holiday: Wand2,       // Holiday: Magic wand
    weekend: Moon,        // Weekend: Full moon night
  },
};

export function getConditionIcon(theme: AppTheme = 'default', condition: CalendarCondition) {
  const iconSet = THEME_ICONS[theme] || THEME_ICONS.default;
  return iconSet[condition];
}
