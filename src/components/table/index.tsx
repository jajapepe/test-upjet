import type { User } from "../../api/types";
import styles from "./index.module.css";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

/**
 * Таблица с пользователями.
 * @param users - список пользователей.
 * @param onEdit - функция редактирования пользователя.
 * @param onDelete - функция удаления пользователя.
 */
export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  if (users.length === 0) {
    return <div>Пользователи не найдены</div>;
  }

  return (
    <table className={styles.Table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Email</th>
          <th>Телефон</th>
          <th>Роль</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.role}</td>
            <td>
              <div className={styles.Actions}>
                <button onClick={() => onEdit(user)}>Редактировать</button>
                <button onClick={() => onDelete(user.id)}>Удалить</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
