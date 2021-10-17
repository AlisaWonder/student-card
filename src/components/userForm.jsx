import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import TextField from "./textField";
import { validator } from "../utils/validator";

const UserForm = () => {
  const [data, setData] = useState({
    name: "",
    surname: "",
    yearOfBirth: "",
    portfolio: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData((prevState) => ({
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
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Создать</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              name="name"
              value={data.name}
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="Фамилия"
              name="surname"
              value={data.surname}
              onChange={handleChange}
              error={errors.surname}
            />
            <TextField
              label="Год рождения"
              type="number"
              name="yearOfBirth"
              value={data.yearOfBirth}
              onChange={handleChange}
              error={errors.yearOfBirth}
            />
            <TextField
              label="Портфолио"
              type="text"
              name="portfolio"
              value={data.portfolio}
              onChange={handleChange}
              error={errors.portfolio}
            />
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Подтвердить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
