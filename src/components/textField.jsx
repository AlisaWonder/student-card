import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={getInputClasses()}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};
TextField.defaultProps = {
  type: "text",
  placeholder: "",
};
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default TextField;
