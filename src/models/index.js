import { required, numeric, minLength, maxLength } from '@vuelidate/validators';
import { creditCardNumCustomValidator, checkBalance } from '@/validators';

export class AddressModel {
  address1 = "";
  state = "";
  postalCode = "";

  get rules() {
    return {
      address1: { required, minLength: minLength(10) },
      state: { required },
      postalCode: { required },
    }
  }
}

export class ShippingModel {
  fullName = "";
  company = "";
  address = new AddressModel();

  get rules() {
    return {
      fullName: { required },
      company: { required },
      address: this.address.rules
    }
  }
}

export class BillingModel extends ShippingModel {
  sameAsShipping = false;
  get rules() {
    return {
      fullName: { required },
      company: { required },
      address: {
        address1: { required, minLength: minLength(10) },
        state: { required },
        postalCode: { required },
      }
    }
  }
}

export class CreditCardModel {
  cardNumber = "";
  cardHolder = "";
  exMonth = "0";
  exYear = "0";
  cvv = "";

  // validation rules
  get rules() {
    return {
      cardNumber: { required, creditCardNumCustomValidator, checkBalance },
      cardHolder: { required, minLength: minLength(5) },
      exMonth: { required },
      exYear: { required },
      cvv: { required, numeric, minLength: minLength(3), maxLength: maxLength(3) },
    };
  }
}
