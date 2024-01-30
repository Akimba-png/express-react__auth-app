export type Credentials = {
  email: string;
  password: string;
};

export type RegData = Credentials & { name: string };

export type User = {
  id: string;
  name: string;
  email: string;
  accessToken: string;
};
