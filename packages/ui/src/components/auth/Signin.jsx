import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import CustomInput from "../common/input/CustomInput";
import Button from "../common/button/Button";
import styles from "./SignForm.module.css";
import { isValidEmail, isValidPassword } from "../../utils/Helpers";

const SIGN_IN_FIELDS = [
  { type: "email", name: "email", label: "Email" },
  { type: "password", name: "password", label: "Password" },
];

const SignInForm = ({ toggleForm, onClose }) => {
  const initialValues = { email: "", password: "" };
  const [formData, setFormData] = useState(initialValues);
  const [feedbackMessage, setFeedbackMessage] = useState({
    type: "",
    message: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setFeedbackMessage({
        type: "error",
        message: Object.values(validationErrors)[0],
      });
      return;
    }
    console.log(feedbackMessage);
    setFeedbackMessage({ type: "success", message: "Signed in successfully!" });

    setTimeout(() => {
      resetForm();
      onClose();
    }, 1500);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!isValidEmail(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    const passwordErrors = isValidPassword(values.password);
    if (Object.keys(passwordErrors).length > 0) {
      errors.password = passwordErrors.password;
    }

    return errors;
  };

  const resetForm = () => {
    setFormData(initialValues);
    setFeedbackMessage({ type: "", message: "" });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.logoWrapperBack}>
        <img src="/logo-images.png" alt="openlogo" className={styles.logo} />
      </div>
      <div className={styles.signintitle}>
        <h2 className={styles.title}>Go to dashboard</h2>
      </div>
      <div className={styles.cusomeinputcss}>
        {SIGN_IN_FIELDS.map((field) => (
          <CustomInput
            key={field.name}
            type={field.type}
            name={field.name}
            label={field.label}
            value={formData[field.name]}
            onChange={handleChange}
            className={styles.input}
          />
        ))}
      </div>
      <p className={styles.forgotPassword}>Forgot Password?</p>
      <div className={styles.inputGroup}>
        <Button type="submit" variant="primary" className={styles.signbutton}>
          Sign In
        </Button>
        <Button type="submit" variant="secondary" className={styles.continueasguest}>
          Continue as Guest
        </Button>
      </div>
      <hr className={styles.horizontalLine} />

      <span
        onClick={toggleForm}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            toggleForm();
          }
        }}
        role="button"
        tabIndex={0}
        className={styles.inputActiontext}
        aria-label="Switch to Sign Up"
        style={{ cursor: "pointer" }}
      >
        Don&apos;t have an account?
      </span>

      <button onClick={onClose} className={styles.closeButton}>
        ×
      </button>
    </form>
  );
};

SignInForm.propTypes = {
  toggleForm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SignInForm;
