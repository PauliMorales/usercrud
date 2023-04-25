import "./App.css";
import { useEffect, useState } from "react";
import useUserCrud from "./hooks/useUserCrud";
import UserCard from "./components/UserCard/UserCard";
import FormUser from "./components/FormUser/FormUser";
import Loading from "./components/Loading/Loading";

function App() {
  const [updateInfo, setUpdateInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletedModal, setDeletedModal] = useState(false);
  const [createdModal, setCreatedModal] = useState(false);
  const [userId, setUserId] = useState();

  const { users, getAllUsers, createNewUser, deleteUserById, updateUserById } =
    useUserCrud();

  useEffect(() => {
    loadAllUsers();
  }, []);

  const handleOpenForm = () => {
    setUpdateInfo(null);
    setFormOpen(true);
  };

  const loadAllUsers = async () => {
    setIsLoading(true);
    try {
      await getAllUsers();
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  const handleDeleteYes = async () => {
    setIsLoading(true);
    await deleteUserById(userId);
    setConfirmDelete(false);
    setIsLoading(false);
    setDeletedModal(true);
  };

  const handleDeleteNo = () => {
    setConfirmDelete(false);
  };

  const handleCreated = () => {
    setDeletedModal(false);
  };

  const handleDeleted = () => {
    setCreatedModal(false);
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Users </h1>
        <button onClick={handleOpenForm} className="app__btn">
          + Create New User
        </button>
      </header>

      <FormUser
        createNewUser={createNewUser}
        updateInfo={updateInfo}
        updateUserById={updateUserById}
        setUpdateInfo={setUpdateInfo}
        setFormOpen={setFormOpen}
        formOpen={formOpen}
        setCreatedModal={setCreatedModal}
      />
      {isLoading && <Loading />}

      <div className="app__user-container">
        {users?.length > 0 ? (
          users?.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              setUpdateInfo={setUpdateInfo}
              setFormOpen={setFormOpen}
              setConfirmDelete={setConfirmDelete}
              setUserId={setUserId}
            />
          ))
        ) : (
          <div>
            <h2>No users found</h2>
          </div>
        )}

        {confirmDelete && (
          <div className="modal">
            <div className="modal-container">
              <p>¿Estás seguro de que deseas eliminar el registro?</p>
              <button onClick={handleDeleteYes}>Si</button>
              <button onClick={handleDeleteNo}>No</button>
            </div>
          </div>
        )}
        {deletedModal && (
          <div className="modal">
            <div className="modal-container">
              <p>Usuario eliminado exitosamente</p>
              <button onClick={handleCreated}>Listo</button>
            </div>
          </div>
        )}
        {createdModal && (
          <div className="modal">
            <div className="modal-container">
              <p>Usuario agregado exitosamente</p>
              <button onClick={handleDeleted}>Listo</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
