export interface User {
  _id: string;
  id?: string;
  fullName: string;
  username: string;
  email: string;
  avatar?: string;
  currency?: string;
}

export interface Friend {
  _id: string;
  user: User;
  createdAt: string;
}

export interface FriendRequest {
  _id: string;
  from: User;
  to: User;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface GroupInvite {
  _id: string;
  from: User;
  to: User;
  group: Group;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface Group {
  _id: string;
  name: string;
  description?: string;
  avatar?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  owner: User;
  members: User[];
  membersCanInvite: boolean;
  totalExpenses?: number;
  createdAt: string;
}

export type SplitMethod = "equal" | "unequal" | "percentage" | "shares";
export type ExpenseCategory =
  | "food" | "travel" | "hotel" | "shopping" | "fuel"
  | "activities" | "tickets" | "emergency" | "miscellaneous";

export interface ExpenseSplit {
  user: string | User;
  amount: number;
  percentage?: number;
  shares?: number;
}

export interface Expense {
  _id: string;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  category: ExpenseCategory;
  contributors: { user: string | User; amount: number }[];
  group?: Group | string;
  participants: User[];
  splits: ExpenseSplit[];
  splitMethod: SplitMethod;
  expenseDate: string;
  receipt?: string;
  createdAt: string;
}

export interface Settlement {
  _id: string;
  from: User;
  to: User;
  amount: number;
  currency: string;
  group?: Group | string;
  status: "pending" | "paid" | "confirmed";
  date?: string;
  createdAt: string;
}

export interface Activity {
  _id: string;
  type:
    | "group_created" | "expense_added" | "expense_edited"
    | "member_joined" | "settlement_completed" | "friend_added";
  actor: User;
  target?: string;
  group?: Group;
  expense?: Expense;
  message: string;
  createdAt: string;
}

export interface Notification {
  _id: string;
  type: "friend_request" | "group_invite" | "expense_added" | "settlement_reminder";
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface DashboardSummary {
  totalGroups: number;
  totalExpenses: number;
  amountYouOwe: number;
  amountOwedToYou: number;
  monthlySpending: number;
  currency: string;
}
