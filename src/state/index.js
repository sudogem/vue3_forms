import { ShippingModel, BillingModel, CreditCardModel } from "@/models";
import { reactive } from "vue";

export default reactive({
  billing: new BillingModel(),
  shipping: new ShippingModel(),
  creditCard: new CreditCardModel(),
  error: ""
});
