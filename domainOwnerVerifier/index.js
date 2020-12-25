const dns = require('dns');
const sha1 = require('sha1');

module.exports = {
	/*
	 *	will return {key, code}
	 *  domain should not contain string like http, https, www etc
	 */
	generateVerificationCode: function(user, domain) {
		const key = sha1(user + 'keySalt' + domain).substr(0,10);
		const code = sha1(user + 'codeSalt' + domain);
		return {
			key: 'domain_key_' + key,
			code: 'domain_code_' + code,
			message: `Please add "domain_key_${key}.${domain}" and value "domain_code_${code}" TXT record entry into your domain name provider` 
		};
	},

	/*
	 * this will return promise, with result as true or false
	 */
	verifyDomainOwner: function(user, domain) {
		const token = this.generateVerificationCode(user, domain);
		return new Promise(function(resolve, reject) {
			dns.resolveTxt(domain, function(err, result) {
				if(err) { reject(err); return; }
				if(!Array.isArray(result)) { reject("DNS Resulation Failed"); return; }

				for(let i=0; i<result.length; i++) {
					if (result[i][0] == token.code) {
						resolve(true);
						return;
					}
				}
				resolve(false);
			});
		});
	}
}