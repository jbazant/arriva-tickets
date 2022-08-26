export type UserDataJson = { username: string; password: string; token: string };

export type UserDataControls = {
  isFetching: boolean;
  persist: (userData: UserDataJson) => Promise<void>;
  clear: () => Promise<void>;
};

export type NoUserData = {
  hasUser: false;
} & UserDataControls;

export type CurrentUserData = {
  hasUser: true;
} & UserDataControls &
  UserDataJson;
