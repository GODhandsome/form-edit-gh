import TableFormEdit from './packages/formEdit/TableFormEdit.vue';
import CustomerForm from './packages/components/CustomerForm.vue';

TableFormEdit.install = (Vue) => {
  Vue.component(TableFormEdit.name, TableFormEdit);
};

CustomerForm.install = (Vue) => {
  Vue.component(CustomerForm.name, CustomerForm);
};

export { TableFormEdit, CustomerForm };
