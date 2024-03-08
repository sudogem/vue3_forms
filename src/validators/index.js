import cardValidator from "card-validator";

export const creditCardNumCustomValidator = {
  $validator: value => {
    return cardValidator.number(value).isValid;
  },
  $message: "Must be a valid credit card number."
};
