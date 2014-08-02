var request = require("request");
var cheerio = require("cheerio");

module.exports =  {
	getDDJC: function(cb) {
		request("http://www.ddjc.de/", function (error, response, html) {
			if(error) throw error;

			var $ = cheerio.load(html);
			var body = $("body");

			var items = [];
			body.find("table:nth-child(2n) tr").slice(2, -1).each(function(i, elem) {
				elem = $(elem);

				var tds = elem.find("td");

				var item = {
					pos: Number($(tds[0]).text()),
					trend: $(tds[1]).children("img").attr("src").slice(7, -4),
					posLastWeek: Number($(tds[2]).text()) || null,
					posSecondLastWeek: Number($(tds[3]).text())  || null,
					interpreter: $(tds[4]).text(),
					title: $(tds[5]).text(),
					label: $(tds[6]).text(),
					points: Number($(tds[7]).text()),
					posTop: Number($(tds[8]).text())
				}
				items.push(item);
			});
			cb(items);
		});
	}
};

