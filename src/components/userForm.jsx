import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import TextField from "./textField";
import { validator } from "../utils/validator";
import { storage } from "../utils/storage";
import { useHistory } from "react-router";
import Modal from "./modal";

const UserForm = () => {
  const [data] = useState({
    name: "",
    surname: "",
    yearOfBirth: "",
    portfolio: "",
  });
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const isUser = storage.get("user");
  const [user, setUser] = useState(isUser ? isUser : data);
  const [showModal, setShowModal] = useState(false);
  const handleChange = ({ target }) => {
    setUser((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
    },
    surname: {
      isRequired: {
        message: "Фамилия обязательна для заполнения",
      },
    },
    yearOfBirth: {
      isRequired: {
        message: "Год рождения обязателен для заполнения",
      },
      isYear: {
        message: "Год введен некорректно",
      },
    },
    portfolio: {
      isRequired: {
        message: "Портфолио обязательно для заполнения",
      },
      isLink: {
        message: "Ссылка на портфолио введена некорректно",
      },
    },
  };

  useEffect(() => {
    validate();
  }, [user]);

  const validate = () => {
    const errors = validator(user, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(user);
    storage.save("user", user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    history.push("/student-card/");
  };

  return (
    <div className="container mt-5">
      <Modal show={showModal} handleClose={handleCloseModal} />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">{isUser ? "Редактировать" : "Создать"}</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              name="name"
              value={user.name}
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="Фамилия"
              name="surname"
              value={user.surname}
              onChange={handleChange}
              error={errors.surname}
            />
            <TextField
              label="Год рождения"
              type="number"
              name="yearOfBirth"
              value={user.yearOfBirth}
              onChange={handleChange}
              error={errors.yearOfBirth}
            />
            <TextField
              label="Портфолио"
              type="text"
              name="portfolio"
              value={user.portfolio}
              onChange={handleChange}
              error={errors.portfolio}
            />
            {/* <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Подтвердить
            </button> */}

            {isUser && (
              <button
                type="button"
                onClick={() => history.push("/student-card/")}
                className="btn btn-secondary"
              >
                Назад
              </button>
            )}
            <button
              type="submit"
              disabled={!isValid}
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className="btn btn-primary"
            >
              {isUser ? "Обновить" : "Создать"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
