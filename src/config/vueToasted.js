import Vue from 'vue';
import VueToasted from 'vue-toasted';

Vue.use(VueToasted, {
  iconPack: 'fontawesome',
  position: 'top-right',
  theme: 'toasted-primary',
  duration: 5000,
});

Vue.toasted.register(
  'defaultSuccess',
  payload => (!payload.msg ? 'Operação realizada com sucesso!' : payload.msg),
  { type: 'success', icon: 'check' },
);

Vue.toasted.register(
  'defaultError',
  payload => (!payload.msg ? 'Oops.. Erro inesperado.' : payload.msg),
  { type: 'error', icon: 'times' },
);
export default Vue;
