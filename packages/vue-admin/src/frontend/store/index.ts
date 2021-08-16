
export const configStore = (next: any, store: any, modules: any) => {
  let state = { 
    ...store.state,
    title: 'vue admin'
  };
  return next({ ...store, state }, modules );
}
