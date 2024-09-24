type Levels = 'admin' | 'user'

declare module '#auth-utils' {
  interface User{
    username: string,
    level: Levels,
  }
}

export { Levels }
