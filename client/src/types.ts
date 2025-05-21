export type AuthErrorResponse = {
  username: string;
  password: string;
  root: string,
};

export type EditErrorResponse = {
  title: string, 
  body: string,
  file: string,
}

export type Post = {
  _id: string;
  title: string;
  body: string;
  imagePath: string;
};

export type Posts = Post[];
