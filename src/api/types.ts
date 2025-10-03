// Пользователь.
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "Admin" | "User" | "Manager";
}

// Форма создания/редактирования пользователя.
export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  role: "Admin" | "User" | "Manager";
}
