import { useState, useEffect } from "react";
import type { User, UserFormData } from "./types";

/**
 * Данные.
 * @returns вызвращает все данные и функции.
 */
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Загрузка пользователей из localStorage.
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Создать пользователя.
  const createUser = (userData: UserFormData) => {
    const newUser: User = {
      id: Date.now(),
      ...userData,
    };
    setUsers((prev) => [...prev, newUser]);
  };

  // Обновить пользователя.
  const updateUser = (id: number, userData: UserFormData) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...userData } : user)),
    );
  };

  // Удалиь пользователя.
  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return {
    users: currentUsers,
    allUsers: users,
    createUser,
    updateUser,
    deleteUser,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};
