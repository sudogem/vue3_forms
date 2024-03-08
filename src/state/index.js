import { ShippingModel, BillingModel, CreditCardModel } from "@/models";
import useVuelidate from "@vuelidate/core";
import { reactive } from "vue";

export default reactive({
  billing: new BillingModel(),
  shipping: new ShippingModel(),
  creditCard: new CreditCardModel(),
  error: "",
  toModel() {
    const rules = {
      billing: this.billing.rules,
      shipping: this.shipping.rules,
      creditCard: this.creditCard.rules
    }

    return useVuelidate(rules, this);
  }
});
