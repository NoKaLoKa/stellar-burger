import userReducer, {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
  logoutUserThunk,
  initialState
} from '../userSlice';

const userData = { email: 'asd', name: 'asd', password: 'asd' };
const userResult = {
  email: 'asd@asd.com',
  name: 'asd'
};
const registerResult = {
  email: 'asd@asd.com',
  name: 'asd',
  password: 'asd'
};

describe('checking userReducer processing of actions generated when executing registerUserThunk', () => {
  it('receiving a request rejected', () => {
    const newState = userReducer(
      initialState,
      registerUserThunk.rejected(new Error('error'), '', userData)
    );
    expect(newState.error).toEqual('error');
  });

  it('receiving a request fullfield', () => {
    const newState = userReducer(
      initialState,
      registerUserThunk.fulfilled(userResult, '', registerResult)
    );

    expect(newState.isAuth).toEqual(true);
    expect(newState.user).toEqual(userResult);
  });
});

describe('checking userReducer processing of actions generated when executing loginUserThunk', () => {
  it('receiving a request pending', () => {
    const newState = userReducer(
      initialState,
      loginUserThunk.pending('', userData)
    );
    expect(newState.isAuth).toEqual(true);
  });

  it('receiving a request fullfield', () => {
    const newState = userReducer(
      initialState,
      loginUserThunk.fulfilled(userResult, '', registerResult)
    );

    expect(newState.isAuth).toEqual(true);
    expect(newState.user).toEqual(userResult);
  });
});

describe('checking userReducer processing of actions generated when executing updateUserThunk', () => {
  it('receiving a request fullfield', () => {
    const newState = userReducer(
      initialState,
      updateUserThunk.fulfilled(userResult, '', registerResult)
    );

    expect(newState.isAuth).toEqual(true);
    expect(newState.user).toEqual(userResult);
  });
});

describe('checking userReducer processing of actions generated when executing logoutUserThunk', () => {
  it('receiving a request fullfield', () => {
    const newState = userReducer(
      initialState,
      logoutUserThunk.fulfilled(undefined, '', undefined)
    );

    expect(newState.user).toEqual(null);
  });
});
