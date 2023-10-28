// custom Logger
export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log(
    "%cLoggerMiddleware:",
    "font-weight:bold;color: green; font-size:14px",
    "\nAction Type:",
    action.type,
    "\npayload:",
    action.payload,
    "\nCurrent State",
    store.getState()
  );
  // run and then get the new state
  next(action);
  console.log("Next State", store.getState());
};
