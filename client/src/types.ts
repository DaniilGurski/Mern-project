export type AuthErrorResponse = {
  username: string;
  password: string;
  root: string,
};

export type EditErrorResponse = {
  title: string, 
  body: string,
}

export type Post = {
  _id: string;
  title: string;
  body: string;
};

export type Posts = Post[];
