export class AddressModel {
  address1 = "";
  state = "";
  postalCode = "";
}

export class ShippingModel {
  fullName = "";
  company = "";
  address = new AddressModel();
}

export class BillingModel extends ShippingModel {
  sameAsShipping = false;
}

export class CreditCardModel {
  cardNumber = "";
  cardHolder = "";
  exMonth = "0";
  exYear = "0";
  cvv = "";
}