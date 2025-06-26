---
title: "TypeScript 进阶技巧"
date: "2024-01-05"
description: "深入探讨 TypeScript 的高级特性和最佳实践"
tags: ["typescript", "javascript", "programming", "tips"]
---

# TypeScript 进阶技巧

TypeScript 不仅仅是 JavaScript 的类型标注，它还有很多强大的高级特性。

## 高级类型

### 条件类型

```typescript
// 基本条件类型
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false

// 复杂条件类型
type NonNullable<T> = T extends null | undefined ? never : T;

type Test3 = NonNullable<string | null>; // string
```

### 映射类型

```typescript
// 让所有属性变为可选
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 让所有属性变为必需
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// 创建只读类型
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// 实际应用
interface User {
  id: number;
  name: string;
  email?: string;
}

type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
```

### 模板字面量类型

```typescript
// 基础模板字面量类型
type Greeting = `Hello, ${string}!`;

const greeting1: Greeting = "Hello, World!"; // ✓
const greeting2: Greeting = "Hi there!"; // ✗

// 结合联合类型
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";

type ColoredSize = `${Color}-${Size}`;
// "red-small" | "red-medium" | "red-large" | "green-small" | ...

// 实用示例：CSS-in-JS
type CSSProperties = {
  [K in keyof CSSStyleDeclaration as `--${string}`]?: string;
} & {
  [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K];
};
```

## 实用工具类型

### 自定义工具类型

```typescript
// 提取函数参数类型
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

// 提取函数返回类型
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// 提取 Promise 内部类型
type Awaited<T> = T extends Promise<infer U> ? U : T;

// 示例使用
function fetchUser(id: number): Promise<{ name: string; email: string }> {
  // 实现略
  return Promise.resolve({ name: "John", email: "john@example.com" });
}

type FetchUserParams = Parameters<typeof fetchUser>; // [number]
type FetchUserReturn = ReturnType<typeof fetchUser>; // Promise<{name: string, email: string}>
type User = Awaited<FetchUserReturn>; // {name: string, email: string}
```

### 对象操作类型

```typescript
// 选择特定属性
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 排除特定属性
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 实际应用
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

type PublicUser = Omit<User, 'password'>; // 公开的用户信息
type UserCredentials = Pick<User, 'email' | 'password'>; // 登录凭证
```

## 高级装饰器

### 方法装饰器

```typescript
// 性能监控装饰器
function measureTime(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = method.apply(this, args);
    const end = performance.now();
    
    console.log(`${propertyName} 执行时间: ${end - start}ms`);
    return result;
  };
}

// 缓存装饰器
function cache(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  const cacheMap = new Map();
  
  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);
    
    if (cacheMap.has(key)) {
      return cacheMap.get(key);
    }
    
    const result = method.apply(this, args);
    cacheMap.set(key, result);
    return result;
  };
}

// 使用示例
class Calculator {
  @measureTime
  @cache
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}
```

## 类型断言技巧

### 类型守卫

```typescript
// 基础类型守卫
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// 对象类型守卫
interface User {
  id: number;
  name: string;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    typeof (obj as User).id === 'number' &&
    typeof (obj as User).name === 'string'
  );
}

// 使用示例
function processUserData(data: unknown) {
  if (isUser(data)) {
    // TypeScript 现在知道 data 是 User 类型
    console.log(`用户 ${data.name} 的 ID 是 ${data.id}`);
  }
}

// 判别联合类型
interface Circle {
  kind: 'circle';
  radius: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

type Shape = Circle | Rectangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2; // TypeScript 知道这是 Circle
    case 'rectangle':
      return shape.width * shape.height; // TypeScript 知道这是 Rectangle
  }
}
```

## 模块系统

### 声明合并

```typescript
// 扩展第三方库类型
declare global {
  interface Window {
    customProperty: string;
  }
}

// 扩展模块
declare module 'lodash' {
  interface LoDashStatic {
    customMethod(): string;
  }
}

// 命名空间合并
namespace Utils {
  export function formatDate(date: Date): string {
    return date.toISOString();
  }
}

namespace Utils {
  export function formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }
}

// 现在 Utils 包含两个函数
```

## 最佳实践

### 1. 严格的类型配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noImplicitThis": true
  }
}
```

### 2. 使用索引签名

```typescript
// 定义动态属性
interface StringDictionary {
  [key: string]: string;
}

// 更严格的索引签名
interface NumberDictionary {
  [key: string]: number;
  length: number; // 特定属性必须匹配索引签名类型
}
```

### 3. 泛型约束

```typescript
// 基础泛型约束
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // 现在可以访问 length 属性
  return arg;
}

// 键约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: 'John', age: 30 };
const name = getProperty(person, 'name'); // 类型为 string
const age = getProperty(person, 'age'); // 类型为 number
```

## 总结

TypeScript 的高级特性让我们能够：

1. **类型安全**: 在编译时捕获错误
2. **代码提示**: 更好的开发体验
3. **重构支持**: 安全地重构代码
4. **文档作用**: 类型即文档
5. **团队协作**: 明确的接口约定

掌握这些高级技巧，能让你写出更加健壮和可维护的 TypeScript 代码！

---

*TypeScript 的类型系统非常强大，值得深入学习和实践。*