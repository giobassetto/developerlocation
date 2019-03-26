import { toast } from 'react-toastify';
import { Types } from './users';

export const addUserRequest = (user, cordinates) => ({
  type: Types.ADD_REQUEST,
  payload: { user, cordinates },
});
export function addUserSucess(data) {
  toast.success('Usuário Adicionado');
  return {
    type: Types.ADD_SUCESS,
    payload: { data },
  };
}

export function addUserError() {
  toast.error('Usuário inválido ou não encontrado');
  return { type: Types.ADD_ERROR };
}
export const excludeUser = id => ({
  type: Types.EXCLUDE,
  payload: { id },
});
