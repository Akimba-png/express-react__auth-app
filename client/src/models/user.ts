export type Credentials = {
  email: string;
  password: string;
};

export type RegData = Credentials & { name: string };
