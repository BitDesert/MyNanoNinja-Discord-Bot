const Big = require('big.js');

const unitchoices = [
	{
		name: 'NANO',
		value: 'unit_mnano',
	},
	{
		name: 'nano',
		value: 'unit_nano',
	},
	{
		name: 'raw',
		value: 'unit_raw',
	},
]

module.exports = {
	name: 'convert',
	description: 'Converts any NANO amount to a different unit',
	options: [{
		name: 'amount',
		type: 'NUMBER',
		description: 'Any amount',
		required: true,
	},{
		name: 'from',
		type: 'STRING',
		description: 'Source unit',
		required: true,
		choices: unitchoices,
	},{
		name: 'to',
		type: 'STRING',
		description: 'Target unit',
		required: true,
		choices: unitchoices,
	}],
	async execute(interaction) {
		const amount = interaction.options.getNumber('amount')
		const from = interaction.options.getString('from')
		const to = interaction.options.getString('to')


		// based on https://nanoo.tools/unit-converter
	
		var inputBig = Big(amount);
	
		// define multipliers/dividers. dividers will be implemented as multipliers for precision reasons. 
		multMnano = Big('1000000000000000000000000000000'); // 10^30
		divMnano = Big('0.000000000000000000000000000001'); // 10^-30
		multknano = Big('1000000000000000000000000000'); // 10^27
		divknano = Big('0.000000000000000000000000001'); // 10^-27
		multnano = Big('1000000000000000000000000'); // 10^24
		divnano = Big('0.000000000000000000000001'); // 10^-24
	
		// Convert input to raw amount
		if (from == "unit_mnano") {
			var raw = Big(inputBig.times(multMnano));
		} else if (from == "unit_nano") {
			var raw = Big(inputBig.times(multnano));
		} else if (from == "unit_raw") {
			var raw = Big(inputBig);
		} else {
			console.log('unit is not known!');
			return;
		}

		if (to == "unit_mnano") {
			var target = Big(raw.times(divMnano)).toFixed().toString();
		} else if (to == "unit_nano") {
			var target = Big(raw.times(divnano)).toFixed().toString();
		} else if (to == "unit_raw") {
			var target = raw.toFixed().toString();
		} else {
			console.log('unit is not known!');
			return;
		}

		await interaction.reply(amount + ' ' + unitchoices.find(choice => choice.value == from ).name + ' = ' + target + ' ' + unitchoices.find(choice => choice.value == to ).name);
	},
};