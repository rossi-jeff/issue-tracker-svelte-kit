export type PaletteType = {
	[key: string]: {
		light: string;
		dark: string;
		altLight: string;
		altDark: string;
	};
};

// fom https://www.canva.com/colors/color-palettes/
export const palettes: PaletteType = {
	'Coffee-Run': {
		light: '#D0B49F',
		dark: '#2F435A',
		altLight: '#AB6B51',
		altDark: '#39918C'
	},
	'Healthy-Leaves': {
		light: '#ECF87F',
		dark: '#3D550C',
		altLight: '#81B622',
		altDark: '#59981A'
	},
	'Metal-and-Glass': {
		light: '#EBE8E0',
		dark: '#0A0A00',
		altLight: '#A8BBB0',
		altDark: '#D01110'
	},
	'Window-Tide': {
		light: '#C3E0E5',
		dark: '#274472',
		altLight: '#5885AF',
		altDark: '#41729F'
	},
	'San-Francisco-Clouded': {
		light: '#F4EAE6',
		dark: '#2F5061',
		altLight: '#E57F84',
		altDark: '#4297A0'
	},
	'Lake-View': {
		light: '#FFFFFF',
		dark: '#710117',
		altLight: '#ECD5BB',
		altDark: '#54627B'
	},
	'Middle-Eastern-Empire': {
		light: '#F3EAC0',
		dark: '#1E2640',
		altLight: '#DC9750',
		altDark: '#922C40'
	},
	'Freshly-Picked-Oranges': {
		light: '#D3D3CB',
		dark: '#9F2B00',
		altLight: '#ADA7A7',
		altDark: '#D37506'
	},
	'Ocean-Threads': {
		light: '#E1E7E0',
		dark: '#2B4560',
		altLight: '#6AA4B0',
		altDark: '#2F6D80'
	},
	'Sunset-Sightings': {
		light: '#F9E9D0',
		dark: '#26161F',
		altLight: '#DB8780',
		altDark: '#A30052'
	}
	/*
	'': {
		light: '',
		dark: '',
		altLight: '',
		altDark: ''
	}
	*/
};

export const PaletteNames = Object.keys(palettes);
