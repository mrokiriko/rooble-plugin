var STEP_2 = [{ pattern: '[^а-яА-ЯёЁa-zA-Z]', repl: '' }];
var STEP_3 = [{ pattern: '[ЬЪ]', repl: '' }];
var STEP_4 = [{ pattern: '([А-ЯЁ])\\1', repl: '$1_' }];
var STEP_5 = [{ pattern: '[AЕЁИОЫЭЯ](?!_)', repl: 'А' },
{ pattern: '[Б](?!_)', repl: 'П' },
{ pattern: '[В](?!_)', repl: 'Ф' },
{ pattern: '[Г](?!_)', repl: 'К' },
{ pattern: '[Д](?!_)', repl: 'Т' },
{ pattern: '[З](?!_)', repl: 'С' },
{ pattern: '[Щ](?!_)', repl: 'Ш' },
{ pattern: '[Ж](?!_)', repl: 'Ш' },
{ pattern: '[М](?!_)', repl: 'Н' },
{ pattern: '[Ю](?!_)', repl: 'У' },
{ pattern: '[_]', repl: '' }];
var STEP_6 = [{ pattern: 'АКА', repl: 'АФА' },
{ pattern: 'АН', repl: 'Н' },
{ pattern: 'ЗЧ', repl: 'Ш' },
{ pattern: 'ЛНЦ', repl: 'НЦ' },
{ pattern: 'ЛФСТФ', repl: 'ЛСТФ' },
{ pattern: 'НАТ', repl: 'Н' },
{ pattern: 'НТЦ', repl: 'НЦ' },
{ pattern: 'НТ', repl: 'Н' },
{ pattern: 'НТА', repl: 'НА' },
{ pattern: 'НТК', repl: 'НК' },
{ pattern: 'НТС', repl: 'НС' },
{ pattern: 'НТСК', repl: 'НСК' },
{ pattern: 'НТШ', repl: 'НШ' },
{ pattern: 'ОКО', repl: 'ОФО' },
{ pattern: 'ПАЛ', repl: 'ПЛ' },
{ pattern: 'РТЧ', repl: 'РЧ' },
{ pattern: 'РТЦ', repl: 'РЦ' },
{ pattern: 'СП', repl: 'СФ' },
{ pattern: 'ТСЯ', repl: 'Ц' },
{ pattern: 'СТЛ', repl: 'СЛ' },
{ pattern: 'СТН', repl: 'СН' },
{ pattern: 'СЧ', repl: 'Ш' },
{ pattern: 'СШ', repl: 'Ш' },
{ pattern: 'ТАТ', repl: 'Т' },
{ pattern: 'ТСА', repl: 'Ц' },
{ pattern: 'ТАФ', repl: 'ТФ' },
{ pattern: 'ТС', repl: 'ТЦ' },
{ pattern: 'ТЦ', repl: 'Ц' },
{ pattern: 'ТЧ', repl: 'Ч' },
{ pattern: 'ФАК', repl: 'ФК' },
{ pattern: 'ФСТФ', repl: 'СТФ' },
{ pattern: 'ШЧ', repl: 'Ш' }];
var CONVERT = [{ pattern: 'А', repl: 2 },
{ pattern: 'П', repl: 3 },
{ pattern: 'К', repl: 5 },
{ pattern: 'Л', repl: 7 },
{ pattern: 'М', repl: 11 },
{ pattern: 'Н', repl: 13 },
{ pattern: 'Р', repl: 17 },
{ pattern: 'С', repl: 19 },
{ pattern: 'Т', repl: 23 },
{ pattern: 'У', repl: 29 },
{ pattern: 'Ф', repl: 31 },
{ pattern: 'Х', repl: 37 },
{ pattern: 'Ц', repl: 41 },
{ pattern: 'Ч', repl: 43 },
{ pattern: 'Щ', repl: 47 },
{ pattern: 'Э', repl: 53 },
{ pattern: 'Я', repl: 59 }];

function replace_by_dictionary(str, dictionary){
	dictionary.forEach(function(item){
		var pattern = item.pattern;
		var repl = item.repl;
		if (str.match(pattern)){
			str = str.replace(new RegExp(pattern, 'g'), repl);
			// str = str.replace(new RegExp(pattern, 'g'), new RegExp(repl, 'g'));
		}
	});
	return str;
}

function count_by_dictionary(str, dictionary, amount = 0){
	for (var i = 0; i < str.length; i++){
		var val = 0;
		dictionary.forEach(function(item){
			var pattern = item.pattern;
			var repl = item.repl;
			if (str[i] == pattern){
				val = repl;
			}
		});
		amount += val;
	}
	return amount;
}

function convert(input, convert_to_value = false, is_only_russian = false, is_only_uppercase = false){
	if (!is_only_russian){
		input = replace_by_dictionary(input, STEP_2);
	}
	if (!is_only_uppercase){
		input = input.toUpperCase();
	}
	[STEP_3, STEP_4, STEP_5, STEP_6].forEach(function(step){
		input = replace_by_dictionary(input, step);
	});

	return input;

	if (convert_to_value){
		input = count_by_dictionary(input, CONVERT);
	}
	return input;
}

// var input = 'ТЕЛЕГРАММА';
// console.log(convert(input));
