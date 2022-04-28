
//import { profileAction, profileGetUserName } from '../action';
import { updateName } from '../store/profile/actions';
import profileReducer from '../store/profile/reducer';

describe('profile reducer test', function () {
  it('should return state with opposite showName value after profileAction action', function () {
    const expected = {
      name: 'test user',
      email: undefined
    };
    const received = profileReducer(undefined, updateName('test user'));

    expect(expected).toEqual(received);
  });
});