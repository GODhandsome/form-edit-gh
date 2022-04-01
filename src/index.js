import FormEdit from './packages/formEdit/FormEdit.vue';
import CustomerForm from './packages/components/CustomerForm.vue';

FormEdit.install = (Vue) => {
  Vue.component(FormEdit.name, FormEdit);
};

CustomerForm.install = (Vue) => {
  Vue.component(CustomerForm.name, CustomerForm);
};

export { FormEdit, CustomerForm };
