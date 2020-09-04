import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { useAuth, AuthProvider } from '../../hooks/AuthContext';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: '1',
        name: 'Rick Sanchez',
        email: 'rick@sanchez.com',
        password: '123456',
      },
      token: 'WubbaLubbaDubDub',
    };
    apiMock.onPost('sessions').reply(200, apiResponse);

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    result.current.signIn({
      email: 'rick@sanchez.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );

    expect(api.defaults.headers.authorization).toBe(
      `Bearer ${apiResponse.token}`,
    );
    expect(result.current.user.email).toEqual('rick@sanchez.com');
  });

  it('should restore saved data from storage when auth inits', () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((keyStorage) => {
        switch (keyStorage) {
          case '@GoBarber:token':
            return 'WubbaLubbaDubDub';
          case '@GoBarber:user':
            return JSON.stringify({
              id: '1',
              name: 'Rick Sanchez',
              email: 'rick@sanchez.com',
              password: '123456',
            });
          default:
            return null;
        }
      });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('rick@sanchez.com');
  });

  it('should be able sign out', async () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((keyStorage) => {
        switch (keyStorage) {
          case '@GoBarber:token':
            return 'WubbaLubbaDubDub';
          case '@GoBarber:user':
            return JSON.stringify({
              id: '1',
              name: 'Rick Sanchez',
              email: 'rick@sanchez.com',
              password: '123456',
            });
          default:
            return null;
        }
      });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: '1',
      name: 'Rick Sanchez',
      email: 'rick@sanchez.com',
      password: '123456',
      avatar_url: 'img-test.jpg',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );

    expect(result.current.user).toEqual(user);
  });
});
