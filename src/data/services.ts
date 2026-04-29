import {
  Wallet,
  FileText,
  Receipt,
  LineChart,
  BookOpen,
  Users,
  Banknote,
  Landmark,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory = "Financial" | "Documents" | "Planning" | "Registry";

export interface Service {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  url: string;
  icon: LucideIcon;
  category: ServiceCategory;
}

export const services: Service[] = [
  {
    id: "freebalance",
    name: "Freebalance (FA, PB, CSM)",
    shortName: "Freebalance",
    description:
      "GOL Financial accountability, budgeting and human resource system.",
    url: "https://ifmis.mfdp.gov.lr",
    icon: Wallet,
    category: "Financial",
  },
  {
    id: "edms",
    name: "Electronic Data Management System",
    shortName: "EDMS",
    description:
      "Electronic Document Management System for GOL financial transactions.",
    url: "https://edms.mfdp.gov.lr",
    icon: FileText,
    category: "Documents",
  },
  {
    id: "ovts",
    name: "Online Voucher Tracking System",
    shortName: "OVTS",
    description:
      "Legacy system still in use for GoL voucher transactions at MACs not using EDMS.",
    url: "https://ovts.mfdp.gov.lr",
    icon: Receipt,
    category: "Documents",
  },
  {
    id: "projects",
    name: "Liberia Projects Dashboard",
    shortName: "Aid Management",
    description:
      "Platform for tracking donor-funded projects across the Government of Liberia.",
    url: "https://development.mfdp.gov.lr",
    icon: LineChart,
    category: "Planning",
  },
  {
    id: "budgetbook",
    name: "Budget Book",
    description:
      "Platform used by the Department of Budget for budget book management.",
    url: "https://budgetbook.mfdp.gov.lr",
    icon: BookOpen,
    category: "Planning",
  },
  {
    id: "ngo",
    name: "NGO System",
    description:
      "Platform for registration and monitoring of NGOs in Liberia.",
    url: "https://development.mfdp.gov.lr/ngo",
    icon: Users,
    category: "Registry",
  },
  {
    id: "eft",
    name: "Electronic Funds Transfer",
    shortName: "EFT",
    description: "Electronic Fund Transfer System for the Government of Liberia.",
    url: "https://eft.mfdp.gov.lr",
    icon: Banknote,
    category: "Financial",
  },
  {
    id: "meridian",
    name: "Meridian (Debt Management)",
    shortName: "Meridian",
    description: "Government of Liberia Debt Management System.",
    url: "https://dmu.mfdp.gov.lr",
    icon: Landmark,
    category: "Financial",
  },
];

export const categories: ("All" | ServiceCategory)[] = [
  "All",
  "Financial",
  "Documents",
  "Planning",
  "Registry",
];
