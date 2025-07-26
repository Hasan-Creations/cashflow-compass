import {
  type LucideProps,
  Home,
  CreditCard,
  Settings,
  User,
  MoreHorizontal,
  Plus,
  ArrowRight,
  BarChart,
  Repeat,
  Target,
  Bot,
  LogOut,
  Moon,
  Sun,
  Laptop,
  Wallet,
  Landmark,
} from 'lucide-react';

export const Icons = {
  home: Home,
  transactions: CreditCard,
  settings: Settings,
  user: User,
  more: MoreHorizontal,
  add: Plus,
  arrowRight: ArrowRight,
  barChart: BarChart,
  recurring: Repeat,
  goals: Target,
  recommendations: Bot,
  logout: LogOut,
  moon: Moon,
  sun: Sun,
  laptop: Laptop,
  wallet: Wallet,
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 12h12" />
      <path d="M6 12l4-4" />
      <path d="M18 12l-4 4" />
      <path d="M12 2a10 10 0 1 0 10 10" />
    </svg>
  ),
};
