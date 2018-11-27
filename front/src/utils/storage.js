const setLocalStorage = (props) => {
  for (let prop in props) {
    window.localStorage.setItem(prop, props[prop]);
  }
}

const getLocalStorage = (name) => {
  return window.localStorage.getItem(name)
}

const getLocalStorages = (...objs) => {
  let storage = {};
  for (let obj of objs) {
    storage[obj] = window.localStorage.getItem(obj) || "";
  }
  return storage;
}

const removeLocalStorage = (...args) => {
  console.log("localstorage name: ", args);
  for (let keyName of args) {
    window.localStorage.removeItem(keyName);
  }
}

// export {
//   setLocalStorage,
//   getLocalStorage,
//   getLocalStorages,
//   removeLocalStorage
// }

export default {
  install(vm) {
    // vm.prototype.$utils.setLocalStorage = setLocalStorage;
    // vm.prototype.$utils.getLocalStorage = getLocalStorage;
    // vm.prototype.$utils.getLocalStorages = getLocalStorages;
    // vm.prototype.$utils.removeLocalStorage = removeLocalStorage;
    Object.defineProperties(vm.prototype, {
      $utils: {
        value: {
          setLocalStorage,
          getLocalStorage,
          getLocalStorages,
          removeLocalStorage
        }
      }
    })

  }
}
