"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAge = exports.formatDate = void 0;
// Converts 'M/D/YYYY' to 'YYYY-MM-DD' format
function formatDate(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day);
}
exports.formatDate = formatDate;
// Calculates age by using the current date, or death date, whichever comes first
function calculateAge(birthday, deathday) {
    var birthDate = new Date(birthday);
    var deathDate = new Date(deathday);
    var today = new Date();
    var finalDate = deathDate instanceof Date && !isNaN(deathDate.getTime()) ? deathDate : today;
    var month = finalDate.getMonth() - birthDate.getMonth();
    var age = finalDate.getFullYear() - birthDate.getFullYear();
    if (month < 0 || (month === 0 && finalDate.getDate() < birthDate.getDate())) {
        age -= 1;
    }
    return age;
}
exports.calculateAge = calculateAge;
