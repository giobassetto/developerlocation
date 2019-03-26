import { call, put, select } from 'redux-saga/effects';
import { addUserError, addUserSucess } from '../ducks/useractions';
import api from '../../services/api';

export function* addUser(action) {
  try {
    const { data } = yield call(api.get, `${action.payload.user}`);

    // eslint-disable-next-line max-len
    const isDuplicated = yield select(state => state.users.data.find(favorite => favorite.id === data.id));

    if (isDuplicated) {
      yield put(addUserError('Usuário já está adicionado'));
    } else {
      const userData = {
        login: data.login,
        id: data.id,
        avatar: data.avatar_url,
        name: data.name,
        cordinates: action.payload.cordinates,
      };

      yield put(
        addUserSucess(userData, {
          message: 'Operação realizada com sucesso.',
        }),
      );
    }
  } catch (err) {
    yield put(addUserError());
  }
}
