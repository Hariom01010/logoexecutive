// Footer related
export const footerColumns = [
	[
		{name: 'Welcome', link: '/welcome'},
		{
			name: 'Demo',
			link: '/welcome#demo',
		},
	],
	[
		{name: 'About', link: '/about'},
		{
			name: 'Contact',
			link: '/about#contactus',
		},
	],
];

// Header related
export const loggedInNavbarItems = [
	{
		name: 'Dashboard',
		link: '/dashboard',
	},
	{
		name: 'Docs',
		link: '/docs',
	},
	{
		name: 'Pricing',
		link: '/pricing',
	},
	{
		name: 'About',
		link: '/about',
	},
];

export const loggedOutNavbarItems = [
	{
		name: 'Home',
		link: '/welcome',
	},
	{
		name: 'Demo',
		link: '/welcome#demo',
	},
	{
		name: 'Pricing',
		link: '/pricing',
	},
	{
		name: 'About',
		link: '/about',
	},
];

// Profile related
export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

// Pricing related
export const pricingCardsContent = [
	{
		title: 'Hobby',
		tagline: 'Empower your projects with essential tools, at no cost.',
		price: 'Free',
		features: [
			'Fortune 500 company logo',
			'5000 API calls per month',
			'2 API keys',
			'Basic analytics',
			'48-72 hour of response time',
		],
	},
	{
		title: 'Pro',
		tagline: 'Elevate your business with our comprehensive service.',
		price: '₹1600',
		period: true,
		features: [
			'Fortune 500 company logo + private images',
			'15000 API calls per month',
			'5 API keys',
			'Advance analytics',
			'12-36 hours of response time',
		],
		label: 'Recommended',
	},
	{
		title: 'Teams',
		tagline: 'Experience limitless advantages and detailed reporting.',
		price: 'Custom Pricing',
		features: [
			'Fortune 500 company logo + unlimited private logos',
			'Unlimited API calls per month',
			'50 API keys',
			'Advance analytics',
			'Priority support',
		],
	},
];

export const faqsData = [
	{
		title: 'How to create API Keys ?',
		steps: [
			"Visit the dashboard page, go to the 'Your API Key' section, add a description, and click 'Generate Key.' Your newly generated key will be automatically included in the table displayed on the same page.",
		],
	},
	{
		title: 'How to upgrade plan ?',
		steps: ['Stay tuned coming soon'],
	},
	{
		title: 'How to see logs ?',
		steps: ['Stay tuned coming soon'],
	},
];