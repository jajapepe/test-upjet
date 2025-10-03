// Проверить имя.
export const validateName = (name: string): string => {
  if (!name.trim()) return "Имя обязательно для заполнения";
  if (name.trim().length < 2) return "Имя должно содержать минимум 2 символа";
  return "";
};

// Проверить emall.
export const validateEmail = (email: string): string => {
  if (!email.trim()) return "Email обязателен для заполнения";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Введите корректный email";
  return "";
};

// Проверить телефон.
export const validatePhone = (phone: string): string => {
  if (!phone.trim()) return "Телефон обязателен для заполнения";
  const phoneRegex =
    /^(\+7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, "")))
    return "Введите корректный российский номер телефона";
  return "";
};
