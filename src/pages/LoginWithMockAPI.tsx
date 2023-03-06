import React, { useState } from "react";

type LoginSuccessMessage = "SUCCESS";
type LoginFailMessage = "FAIL";

interface LoginResponse {
  message: LoginSuccessMessage | LoginFailMessage;
  token: string;
}

interface User {
  username: string;
  password: string;
  userInfo: UserInfo;
}

interface UserInfo {
  name: string;
}

const users: User[] = [
  {
    username: "blue",
    password: "1234",
    userInfo: { name: "blue11" },
  },
  {
    username: "red",
    password: "1111",
    userInfo: { name: "redGoods" },
  },
  {
    username: "yellow",
    password: "12345",
    userInfo: { name: "yellowSky" },
  },
];

const _secret: string = "1234!@#$";

const login = async (
  username: string,
  password: string
): Promise<LoginResponse | null> => {
  // TODO: 올바른 username, password를 입력하면 {message: 'SUCCESS', token: (원하는 문자열)} 를 반환하세요.

  // _어쩌구 : 이 스코프 안에서만 쓰임

  const user: User | undefined = users.find((user: User) => {
    return user.username === username && user.password === password;
  });
  return user
    ? {
        message: "SUCCESS",
        token: JSON.stringify({ user: user.userInfo, secret: _secret }),
      }
    : null;
  // 중첩은 안쓰고, 단건으로 빠르게 처리하려면 자주 쓴다.
};

const getUserInfo = async (token: string): Promise<UserInfo | null> => {
  // TODO: login 함수에서 받은 token을 이용해 사용자 정보를 받아오세요.
  const parsedToken = JSON.parse(token);
  if (!parsedToken?.secret || parsedToken.secret !== _secret) return null;

  const loggedUser: User | undefined = users.find((user: User) => {
    if (user.userInfo.name === parsedToken.user.name) {
      return user;
    }
  });
  return loggedUser ? loggedUser.userInfo : null;
};

const LoginWithMockAPI = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "" });
  // 초기값 설정 -> {name : ""}

  const loginSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // TODO: form 에서 username과 password를 받아 login 함수를 호출하세요.
    const formData = new FormData(event.currentTarget);
    // formData를 처리하는 방법 ..!

    const loginRes = await login(
      formData.get("username") as string,
      formData.get("password") as string
    );

    if (!loginRes) return;

    const userInfo = await getUserInfo(loginRes.token);

    if (!userInfo) return;

    setUserInfo(userInfo);
  };

  return (
    <div>
      <h1>Login with Mock API</h1>
      <form onSubmit={loginSubmitHandler}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit" value="Submit">
          submit
        </button>
        {/* TODO: 여기에 username과 password를 입력하는 input을 추가하세요. 제출을 위해 button도 추가하세요. */}
      </form>
      <div>
        <h2>User info</h2>
        {/* TODO: 유저 정보를 보여주도록 구현하세요. 필요에 따라 state나 다른 변수를 추가하세요. */}
        {JSON.stringify(userInfo)}
      </div>
    </div>
  );
};

export default LoginWithMockAPI;
