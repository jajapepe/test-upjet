import { useState, useEffect } from "react";

import type { User, UserFormData } from "../../api";
import { validateName, validateEmail, validatePhone } from "../../api";
import styles from "./index.module.css";

interface UserFormProps {
  user?: User | null;
  onSubmit: (userData: UserFormData) => void;
  onCancel: () => void;
}

/**
 * Форма пользователя.
 * @param user - ползоветель.
 * @param onSubmit - функция создния/редактирования пользователя.
 * @param onCancel - функция отмены действия.
 */
export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    role: "User",
  });

  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      });
    }
  }, [user]);

  // Проверить данные формы.
  const validateForm = (): boolean => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  // Сохранить данные.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Изменить данные.
  const handleChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.Form}>
      <h2>{user ? "Редактировать пользователя" : "Добавить пользователя"}</h2>

      <div className={styles.Input}>
        <label htmlFor="name">Имя *</label>
        <input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div className={styles.Input}>
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div className={styles.Input}>
        <label htmlFor="phone">Телефон *</label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="+7 (999) 999-99-99"
        />
        {errors.phone && <span>{errors.phone}</span>}
      </div>

      <div className={styles.Input}>
        <label htmlFor="role">Роль</label>
        <select
          id="role"
          value={formData.role}
          onChange={(e) =>
            handleChange("role", e.target.value as UserFormData["role"])
          }
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
        </select>
      </div>

      <div className={styles.Actions}>
        <button type="submit">{user ? "Обновить" : "Создать"}</button>
        <button type="button" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  );
}
