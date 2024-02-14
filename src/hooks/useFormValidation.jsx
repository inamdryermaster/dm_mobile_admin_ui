import { useEffect, useState } from 'react';

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  emailError: false,
  passwordError: false,
  firstNameError: false,
  lastNameError: false,
  firstNameErrorList: [],
  lastNameErrorList: [],
  emailErrorList: [],
  passwordErrorList: [],
};
const useFormValidation = () => {
  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const validateFirstName = () => {
    let errorMessages = [];
    const firstName = formState.firstName;

    if (!firstName) {
      errorMessages.push('First Name is required');
    }

    setFormState((prevState) => ({
      ...prevState,
      firstNameErrorList: errorMessages,
      firstNameError: errorMessages.length > 0,
    }));
    return errorMessages.length === 0;
  };

  const validateLastName = () => {
    let errorMessages = [];
    const lastName = formState.lastName;

    if (!lastName) {
      errorMessages.push('Last Name is required');
    }

    setFormState((prevState) => ({
      ...prevState,
      lastNameErrorList: errorMessages,
      lastNameError: errorMessages.length > 0,
    }));
    return errorMessages.length === 0;
  };

  const validateEmail = () => {
    let errorMessages = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = formState.email;

    if (!email) {
      errorMessages.push('Email is required');
    }
    if (!emailRegex.test(email)) {
      errorMessages.push('Invalid email format');
    }

    setFormState((prevState) => ({
      ...prevState,
      emailErrorList: errorMessages,
      emailError: errorMessages.length > 0,
    }));
    return errorMessages.length === 0;
  };

  const validatePassword = () => {
    let errorMessages = [];
    const password = formState.password;
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);

    if (password.length < minLength) {
      errorMessages.push('Password must be at least 8 characters');
    }
    if (!hasUpperCase) {
      errorMessages.push('Password must include an uppercase letter');
    }
    if (!hasNumber) {
      errorMessages.push('Password must include a number');
    }
    if (!hasLetter) {
      errorMessages.push('Password must include a letter');
    }

    setFormState((prevState) => ({
      ...prevState,
      passwordErrorList: errorMessages,
      passwordError: errorMessages.length > 0,
    }));
    return errorMessages.length === 0;
  };
  useEffect(() => {
    if (formState.firstNameError) {
      validateFirstName();
    }
    if (formState.lastNameError) {
      validateLastName();
    }
    if (formState.emailError) {
      validateEmail();
    }
    if (formState.passwordError) {
      validatePassword();
    }
  }, [
    formState.firstName,
    formState.lastName,
    formState.email,
    formState.password,
  ]);
  return {
    formState,
    setFormState,
    initialFormState,
    handleChange,
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePassword,
  };
};

export default useFormValidation;
