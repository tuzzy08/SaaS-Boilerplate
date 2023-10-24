import LemonSqueezy from '@lemonsqueezy/lemonsqueezy.js';
const ls = new LemonSqueezy(process.env.LEMONSQUEEZY_API_KEY ?? '');

class Billing {
	provider;
	constructor(gateway_provider: any) {
		this.provider = gateway_provider;
	}
	async checkout(opts: any) {
		return await this.provider?.checkout({ ...opts });
	}

	async cancel(opts: any) {
		return await this.provider?.cancelSubscription({ ...opts });
	}
}

export const billing = new Billing(ls);
