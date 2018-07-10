({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a); // 10
console.log(b); // 20
console.log(rest); //{c: 30, d: 40}

let bodyData = {
	encryptedData: "Ivbu-encryptedData-2IbE",
	iv: "Pr2N-iv-qHyp",
	sessionKey: "6frf-sessionKey-SMPE"
};
let paramsData = {
	openId:"ollw-openId-n48j"
};

({ sessionKey, openId, iv, encryptedData } = { ...bodyData, ...paramsData });
console.log(`
   sessionKey = ${sessionKey}
       openId = ${openId}
           iv = ${iv}
encryptedData = ${encryptedData}
`);

