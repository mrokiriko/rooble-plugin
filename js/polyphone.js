var STEP_1 = [[]]; 



// class polyphone:
var STEP_1 = [["[aA]", "А"], ["[eE]", "Е"], ["[oO]", "О"], ["[cC]", "С"], ["[xX]", "Х"], ["[B]", "В"], ["[M]", "М"], ["[H]", "Н"]]
var STEP_2 = [["[^а-яА-ЯёЁ]", ""]]
var STEP_3 = [["[ЬЪ]", ""]]
var STEP_4 = [(r"([А-ЯЁ])\1", r"\1")]
var STEP_5 = [("[AЕЁИОЫЭЯ]", "А"), ("[Б]", "П"), ("[В]", "Ф"), ("[Г]", "К"), ("[Д]", "Т"), ("[З]", "С"), ("[Щ]", "Ш"), ("[Ж]", "Ш"), ("[М]", "Н"), ("[Ю]", "У")]
var STEP_6 = [("АКА", "АФА"), ("АН", "Н"), ("ЗЧ", "Ш"), ("ЛНЦ", "НЦ"), ("ЛФСТФ", "ЛСТФ"), ("НАТ", "Н"), ("НТЦ", "НЦ"), ("НТ", "Н"), ("НТА", "НА"), ("НТК", "НК"), ("НТС", "НС"), ("НТСК", "НСК"), ("НТШ", "НШ"), ("ОКО", "ОФО"), ("ПАЛ", "ПЛ"), ("РТЧ", "РЧ"), ("РТЦ", "РЦ"), ("СП", "СФ"), ("ТСЯ", "Ц"), ("СТЛ", "СЛ"), ("СТН", "СН"), ("СЧ", "Ш"), ("СШ", "Ш"), ("ТАТ", "Т"), ("ТСА", "Ц"), ("ТАФ", "ТФ"), ("ТС", "ТЦ"), ("ТЦ", "Ц"), ("ТЧ", "Ч"), ("ФАК", "ФК"), ("ФСТФ", "СТФ"), ("ШЧ", "Ш")]

// 	@staticmethod
// 	def replace_by_dictionary(string, dictionary):
// 	    for pattern, repl in dictionary:
// 	    	if re.search(pattern, string):
// 	    		string = re.sub(pattern, repl, string)
// 	    return string

// 	def convert(self, input, is_only_russian = False, is_only_uppercase = False):
// 		if not is_only_russian:
// 			input = self.replace_by_dictionary(input, self.STEP_1)
// 			input = self.replace_by_dictionary(input, self.STEP_2)
// 		if not is_only_uppercase:
// 			input = input.upper()
// 		for step in self.STEP_3, self.STEP_4, self.STEP_5, self.STEP_6:
// 			input = self.replace_by_dictionary(input, step)
// 		return input