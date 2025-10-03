import { useState } from "react";
import { UserForm } from "./components";
import { UserTable } from "./components";
import { Pagination } from "./components";
import { useUsers } from "./api/api";
import type { User, UserFormData } from "./api/types";
import styles from "./App.module.css";

function App() {
  const {
    users,
    allUsers,
    createUser,
    updateUser,
    deleteUser,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useUsers();

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Создать пользователя.
  const handleCreateUser = (userData: UserFormData) => {
    createUser(userData);
    setShowForm(false);
  };

  // Обновить пользователя.
  const handleUpdateUser = (userData: UserFormData) => {
    if (editingUser) {
      updateUser(editingUser.id, userData);
      setEditingUser(null);
      setShowForm(false);
    }
  };

  // Отоборазить форму редактирования пользователя.
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  // Удалить пользователя.
  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      deleteUser(id);
    }
  };

  // Закрыть форму создания/редактирвоания.
  const handleCancel = () => {
    setEditingUser(null);
    setShowForm(false);
  };

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <h1>Управление пользователями</h1>
        <button
          onClick={() => setShowForm(true)}
          disabled={showForm}
        >
          Добавить пользователя
        </button>
      </header>

      <main className={styles.Main}>
        {showForm ? (
          <UserForm
            user={editingUser}
            onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <div>
              Всего пользователей: {allUsers.length}
            </div>

            <UserTable
              users={users}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
