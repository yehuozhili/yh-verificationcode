import { allletters } from "./letter";
export function randomNum(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) + min);
}
export function randomLetter(num: number, dict?: string[]) {
	const xdict = dict ? dict : allletters;
	let f = "";
	for (let i = 0; i < num; i++) {
		let x = randomNum(0, xdict.length);
		f = f + xdict[x];
	}
	return f;
}

export function randomColor() {
	const r =
		Math.floor(Math.random() * 256).toString(16).length < 2
			? "0" + Math.floor(Math.random() * 256).toString(16)
			: Math.floor(Math.random() * 256).toString(16);
	const g =
		Math.floor(Math.random() * 256).toString(16).length < 2
			? "0" + Math.floor(Math.random() * 256).toString(16)
			: Math.floor(Math.random() * 256).toString(16);
	const b =
		Math.floor(Math.random() * 256).toString(16).length < 2
			? "0" + Math.floor(Math.random() * 256).toString(16)
			: Math.floor(Math.random() * 256).toString(16);
	return "#" + r + g + b;
}

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
	const mergeOption: IGenerateOptionType = {
		...defaultGenerateOption,
		...option,
	};
	const canvas = document.createElement("canvas");
	const fheight = mergeOption.height;
	const fwidth = mergeOption.width;
	const padding = mergeOption.padding;
	const mheight = fheight - padding;
	const mwidth = fwidth - padding;
	canvas.height = fheight;
	canvas.width = fwidth;
	const ctx = canvas.getContext("2d");
	if (!ctx) {
		console.error("can not get canvas context");
		return Promise.resolve(null);
	}
	const len = code.length;
	for (let i = 0; i < len; i++) {
		const text = code[i];
		const randomSize = randomNum(mheight / 2, mheight);
		ctx.font = randomSize + "px Georgia";
		ctx.fillStyle = randomColor();
		ctx.shadowBlur = randomNum(-3, 3);
		ctx.shadowColor = randomColor();
		const deg = randomNum(-30, 30);
		const centerX = padding + (i * mwidth) / len;
		const centerY = fheight / 2 + randomSize / 2;
		ctx.translate(centerX, centerY);
		ctx.rotate((deg * Math.PI) / 180);
		ctx.fillText(text, 0, 0, mwidth / len);
		ctx.rotate((-deg * Math.PI) / 180);
		ctx.translate(-centerX, -centerY);
	}
	const lineNumber = mergeOption.lineNumber;
	for (let i = 0; i < lineNumber; i++) {
		ctx.strokeStyle = randomColor();
		ctx.beginPath();
		ctx.moveTo(randomNum(0, fwidth), randomNum(0, fheight));
		ctx.lineTo(randomNum(0, fwidth), randomNum(0, fheight));
		ctx.stroke();
	}
	const dotNumber = mergeOption.dotNumber;
	for (let i = 0; i < dotNumber; i++) {
		ctx.fillStyle = randomColor();
		ctx.beginPath();
		//x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean | undefined
		ctx.arc(randomNum(0, fwidth), randomNum(0, fheight), 1, 0, 2 * Math.PI); //半径1的圆
		ctx.fill();
	}
	const berzierLine = mergeOption.bezierLineNumber;
	for (let i = 0; i < berzierLine; i++) {
		ctx.fillStyle = randomColor();
		ctx.beginPath();
		ctx.moveTo(randomNum(0, fwidth), randomNum(0, fheight));
		ctx.bezierCurveTo(
			randomNum(0, fwidth),
			randomNum(0, fheight),
			randomNum(0, fwidth),
			randomNum(0, fheight),
			randomNum(0, fwidth),
			randomNum(0, fheight)
		);
		ctx.stroke();
	}
	return new Promise((res) => {
		canvas.toBlob(res, mergeOption.imgType, mergeOption.encoderOptions);
	});
}
export default generateBlob;
