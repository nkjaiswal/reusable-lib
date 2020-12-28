const domainVerifier = require('./index.js');

const token = domainVerifier.generateVerificationCode('nishant.soft04@gmail.com', 'careerkiran.com');

if (token.key != 'domain_key_789874b56a'){
	throw new Error('Please Check your DomainOwnerVerifier module');
}

if (token.code != 'domain_code_127cc246cb158875c8676bc58f2073983a2aa434'){
	throw new Error('Please Check your DomainOwnerVerifier module');
}

console.log(token.message);

domainVerifier.verifyDomainOwner('nishant.soft04@gmail.com', 'careerkiran.com')
	.then(console.log)
	.catch(console.log);

console.log('DomainOwnerVerifier verified');

domainVerifier.verifyDomainOwner('admin@severityapp.com', 'severityapp.com')
	.then(console.log)
	.catch(console.log);