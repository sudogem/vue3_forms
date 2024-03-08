import cardValidator from "card-validator";

export const creditCardNumCustomValidator = {
  $validator: value => {
    return cardValidator.number(value).isValid;
  },
  $message: "Must be a valid credit card number."
};

// sample asynchronous validation
export const checkBalance = {
  $validator: async () => {
    const result = await fetch("https://arest.me/api/sites/1068");
    return result.status == 200;
  },
  $message: "Balance too low."
};