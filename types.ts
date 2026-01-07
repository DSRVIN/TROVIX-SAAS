import { LucideIcon } from 'lucide-react';

export interface KPIProps {
  title: string;
  value: string;
  unit: string;
  status: 'optimal' | 'neutral' | 'warning' | 'critical';
  icon: LucideIcon;
  trend?: string;
}

export interface Alert {
  id: number;
  time: string;
  location: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface MenuItem {
  label: string;
  icon: LucideIcon;
  active?: boolean;
}