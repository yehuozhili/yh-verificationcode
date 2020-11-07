# 前端生成图片验证码

![build](https://github.com/yehuozhili/yh-verificationcode/workflows/build/badge.svg?branch=main&event=push)

demo: https://yehuozhili.github.io/yh-verificationcode/

## 简介

-   有时候需要前端生成个图片验证码，于是就自己写了个。

-   支持纯前端校验或者从后端获取 code 生成后校验。

## 快速上手

```
npm i yh-verificationcode
```

-   这个库和框架无关。

```ts
import { randomLetter, generateBlob } from "yh-verificationcode";
```

```ts
const val = randomLetter(5);
generateBlob(val).then((res) => {
	if (res) {
		const blobUrl = window.URL.createObjectURL(res);
		//拿到blob url
	}
});
```

-   src 插入 blob url 即可显示

```tsx
<img src={blobUrl} />
```

-   如果可以的话，尽量在生成第二个验证码使用 revoke 销毁第一个 url：

```ts
window.URL.revokeObjectURL(pre.url);
```

## 参数

-   randomLetter 是用来从字典中生成随机字。
-   第一个参数是需要几个字
-   第二个参数可以把字典替换掉，默认是大小写字母+数字

```ts
export function randomLetter(num: number, dict?: string[]) {
```

-   生成验证码函数，注释已写上。
-   第一个参数是画的文字，必传，返回值是 promise blob 或者 null

```ts
export interface IGenerateOptionType {
	//图片宽
	width: number;
	//图片高
	height: number;
	//预留边
	padding: number;
	//干扰直线条数
	lineNumber: number;
	//干扰点数量
	dotNumber: number;
	//干扰曲线数量
	bezierLineNumber: number;
	//生成格式
	imgType: string;
	//图片品质
	encoderOptions: number;
}

export const defaultGenerateOption: IGenerateOptionType = {
	width: 120,
	height: 40,
	padding: 10,
	lineNumber: 2,
	dotNumber: 80,
	bezierLineNumber: 2,
	imgType: "image/png",
	encoderOptions: 1,
};

export function generateBlob(
	code: string,
	option?: Partial<IGenerateOptionType>
): Promise<Blob | null> {
```
