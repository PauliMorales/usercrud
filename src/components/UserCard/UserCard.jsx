import "../UserCard/userCard.css";

const UserCard = ({
  user,
  setUpdateInfo,
  setFormOpen,
  setConfirmDelete,
  setUserId,
}) => {
  const HandleDelete = () => {
    setUserId(user.id);
    setConfirmDelete(true);
  };

  const handleUpdate = () => {
    setUpdateInfo(user);
    setFormOpen(true);
  };

  return (
    <article className="user">
      <h2 className="user__name">
        {user.first_name} {user.last_name}{" "}
        <i className="bx bxs-user-circle"></i>
      </h2>
      <ul className="user__list">
        <li className="user__item">
          <span className="user__label">
            <i className="bx bxs-envelope"></i> Email
          </span>
          <span className="user__value">{user.email}</span>
        </li>
        <li className="user__item">
          <span className="user__label">
            <i className="bx bxs-cake"></i> Birthday
          </span>
          <span className="user__value">{user.birthday}</span>
        </li>
      </ul>
      <footer className="user__footer">
        <div>
          <button className="user__btn user__delete" onClick={HandleDelete}>
            <i className="bx bxs-trash user__icon"></i>
          </button>
        </div>
        <button className="user__btn user__update" onClick={handleUpdate}>
          <i className="bx bx-edit user__icon"></i>
        </button>
      </footer>
    </article>
  );
};

export default UserCard;
