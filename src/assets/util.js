const util = {
    get_url_strs (url) {
        let lets = {}, hash, str,hashes;
        if(url.indexOf('?') != -1){
            str = url.substr(url.indexOf('?') + 1);
            hashes = str.split('&');
        } else {
            hashes = [];
        };
        for(let i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');

            lets[hash[0]] = hash[1];
        }
        return lets;
    },
    to_two_digit (num) { return num < 10 ? "0" + num : num; },
    format_date (time, formation) {
        let date = new Date(time);
        let _temp_year = date.getFullYear();
        let _temp_month = date.getMonth() + 1;
        let _temp_date = date.getDate();
        let _temp_hour = date.getHours();
        let _temp_minute = date.getMinutes();
        let _temp_second = date.getSeconds();
        function _get_date_part(part) {
            switch (part) {
                case "yyyy": return _temp_year;
                case "yy": return _temp_year.toString().slice(-2);
                case "MM": return util.to_two_digit(_temp_month);
                case "M": return _temp_month;
                case "dd": return util.to_two_digit(_temp_date);
                case "d": return _temp_date;
                case "HH": return util.to_two_digit(_temp_hour);
                case "H": return _temp_hour;
                case "hh": return util.to_two_digit(_temp_hour > 12 ? _temp_hour - 12 : _temp_hour);
                case "h": return _temp_hour > 12 ? _temp_hour - 12 : _temp_hour;
                case "mm": return util.to_two_digit(_temp_minute);
                case "m": return _temp_minute;
                case "ss": return util.to_two_digit(_temp_second);
                case "s": return _temp_second;
                default: return part;
            }
        };
        return formation.replace(/y+|m+|d+|h+|s+|H+|M+/g, _get_date_part);
    },
}

export default util
