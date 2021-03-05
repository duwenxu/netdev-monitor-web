import bread from '../components/common/bread'

const components = {
  bread
}

const install = function(Vue, opts = {}) {
  if (install.installed) return;
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};

export default install
