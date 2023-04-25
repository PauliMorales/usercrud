import { useForm } from "react-hook-form";
import defaultValues from "../../utils/defaultValues";
import { useEffect } from "react";
import "../FormUser/formUser.css";

const FormUser = ({
  createNewUser,
  updateInfo,
  setUpdateInfo,
  updateUserById,
  setFormOpen,
  formOpen,
  setCreatedModal,
}) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (updateInfo) {
      reset(updateInfo);
    } else {
      console.warn("RESET");
      reset(defaultValues);
    }
  }, [formOpen]);

  const submit = (data) => {
    if (updateInfo) {
      updateUserById(updateInfo.id, data);
      setUpdateInfo();
    } else {
      createNewUser(data);
      setCreatedModal(true);
    }
    handleExit();
    reset(defaultValues);
  };

  const handleExit = () => {
    setFormOpen(false);
    // reset(defaultValues);
  };

  return (
    <div className={`form-container ${!formOpen ? "close" : ""}`}>
      <form className="form" onSubmit={handleSubmit(submit)}>
        <h3 className="form__title">
          {updateInfo ? "Update User Information" : "Create New User"}
        </h3>
        <i onClick={handleExit} className="bx bxs-x-square form__exit"></i>

        <div className="form__item">
          <label className="form_label" htmlFor="email">
            Email
          </label>
          <input
            className="form__input"
            {...register("email", { required: true })}
            type="email"
            id="email"
          />
        </div>

        <div className="form__item">
          <label className="form_label" htmlFor="password">
            Password
          </label>
          <input
            className="form__input"
            {...register("password", { required: true })}
            type="password"
            id="password"
          />
        </div>

        <div className="form__item">
          <label className="form_label" htmlFor="first_name">
            First Name
          </label>
          <input
            className="form__input"
            {...register("first_name", { required: true })}
            type="text"
            id="first_name"
          />
        </div>

        <div className="form__item">
          <label className="form_label" htmlFor="last_name">
            Last Name
          </label>
          <input
            className="form__input"
            {...register("last_name", { required: true })}
            type="text"
            id="last_name"
          />
        </div>

        <div className="form__item">
          <label className="form_label" htmlFor="birthday">
            Birthday
          </label>
          <input
            className="form__input"
            {...register("birthday", { required: true })}
            type="date"
            id="birthday"
          />
        </div>

        <button type="submit" className="form__btn">
          {updateInfo ? "update" : "create"}
        </button>
      </form>
    </div>
  );
};

export default FormUser;
