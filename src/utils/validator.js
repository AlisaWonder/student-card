export function validator(data, config) {
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case "isRequired":
        statusValidate = data.trim() === "";
        break;
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case "isYear": {
        const currentYear = new Date().getFullYear();
        //   console.log(currentYear);
        //   const yearRegExp = /(?:19|20)\d\d/g;
        //   statusValidate = !yearRegExp.test(data) && currentYear < data;
        statusValidate = currentYear < data || data < 1900; //от 1900 до настоящего времени
        //   console.log("status ", statusValidate);
        break;
      }
      case "isLink": {
        const linkRegExp = /^(ftp|http|https):\/\/[^ "]+$/g;
        statusValidate = !linkRegExp.test(data);
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
