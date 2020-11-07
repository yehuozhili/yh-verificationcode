import React, { useState } from "react";
import { randomLetter, generateBlob } from "./components";

function App() {
	const [state, setState] = useState({
		url: "",
		code: "",
	});
	return (
		<div>
			<div>
				<button
					onClick={() => {
						const val = randomLetter(5);
						const p = generateBlob(val);
						p.then((res) => {
							if (res) {
								const str = window.URL.createObjectURL(res);
								setState((pre) => {
									window.URL.revokeObjectURL(pre.url);
									return {
										url: str,
										code: val,
									};
								});
							}
						});
					}}
				>
					generate code
				</button>
				{state.url !== "" && <img src={state.url} alt="valicode"></img>}
				{state.code}
			</div>
		</div>
	);
}

export default App;
